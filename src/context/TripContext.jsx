import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchPhoto } from "../utils/unsplash";

const TripContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const TripProvider = ({ children }) => {
  // 🏛️ STATE
  const [trips, setTrips] = useState(() => {
    const saved = sessionStorage.getItem("trips");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeTripId, setActiveTripId] = useState(() => {
    return sessionStorage.getItem("activeTripId") || null;
  });

  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 🗺️ PERSISTENT ITINERARY CACHE
  const [itineraryCache, setItineraryCache] = useState(() => {
    const saved = sessionStorage.getItem("itineraryCache");
    return saved ? JSON.parse(saved) : {};
  });

  // Sync state to storage
  useEffect(() => {
    sessionStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    sessionStorage.setItem("itineraryCache", JSON.stringify(itineraryCache));
  }, [itineraryCache]);

  useEffect(() => {
    if (activeTripId) {
      sessionStorage.setItem("activeTripId", activeTripId);
    } else {
      sessionStorage.removeItem("activeTripId");
    }
  }, [activeTripId]);

  const enhanceItineraryWithImages = async (itineraryData) => {
    if (!itineraryData?.days) return itineraryData;
    
    const dayEntries = Array.isArray(itineraryData.days)
      ? itineraryData.days.map((d, i) => [`day-${i+1}`, d])
      : Object.entries(itineraryData.days);

    const enhancedDaysArray = await Promise.all(
      dayEntries.map(async ([dayId, day]) => {
        const activities = day.activities || day.items || [];
        const enhancedActivities = await Promise.all(
          activities.map(async (activity) => {
            if (activity.img) return activity;
            const query = `${activity.title || activity.name} ${activity.location || ""}`.trim();
            const imageUrl = await fetchPhoto(query);
            return {
              ...activity,
              img: imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
            };
          }),
        );
        return [dayId, { ...day, activities: enhancedActivities }];
      }),
    );

    if (!Array.isArray(itineraryData.days)) {
      return { ...itineraryData, days: Object.fromEntries(enhancedDaysArray) };
    }
    
    return { ...itineraryData, days: enhancedDaysArray.map(pair => pair[1]) };
  };

  const createTrip = async (payload) => {
    const newTrip = {
      ...payload,
      id: `trip-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    return newTrip;
  };

  const addItemToTrip = (tripId, dayId, item) => {
    setItineraryCache(prev => {
      const itinerary = prev[tripId] || { days: {} };
      const newItinerary = JSON.parse(JSON.stringify(itinerary));
      
      if (!newItinerary.days) newItinerary.days = {};
      if (!newItinerary.days[dayId]) {
        newItinerary.days[dayId] = {
          id: dayId,
          title: dayId.replace("day-", "Day "),
          activities: []
        };
      }

      const activities = newItinerary.days[dayId].activities || newItinerary.days[dayId].items || [];
      const newItem = {
        ...item,
        id: `item-${Date.now()}`,
        time: item.time || "TBD"
      };

      newItinerary.days[dayId].activities = [...activities, newItem];
      return { ...prev, [tripId]: newItinerary };
    });
  };

  const saveItineraryToCache = (id, itinerary) => {
    if (!id) return;
    setItineraryCache(prev => ({ ...prev, [id]: itinerary }));
  };

  const setActiveTrip = (tripId) => {
    setActiveTripId(tripId || null);
  };

  const deleteTrip = (tripId) => {
    setTrips(prev => prev.filter(t => t.id !== tripId));
    setItineraryCache(prev => {
      const newCache = { ...prev };
      delete newCache[tripId];
      return newCache;
    });
    if (activeTripId === tripId) {
      setActiveTripId(null);
    }
  };

  const updateTrip = (id, payload) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...payload } : t));
    if (payload.itinerary || payload.ai_itinerary) {
      const itin = payload.itinerary || payload.ai_itinerary;
      setItineraryCache(prev => ({ ...prev, [id]: itin }));
    }
  };

  const activeTrip = trips.find((t) => t.id === activeTripId) || null;

  return (
    <TripContext.Provider
      value={{
        trips,
        activeTripId,
        activeTrip,
        loading,
        createTrip,
        setActiveTrip,
        fetchTrips: () => {}, // No-op in MVP
        itineraryCache,
        saveItineraryToCache,
        addItemToTrip,
        deleteTrip,
        updateTrip,
        updateTripItinerary: (id, itin) => updateTrip(id, { itinerary: itin }),
        updateAiItinerary: (id, itin) => updateTrip(id, { ai_itinerary: itin }),
        isGenerating,
        setIsGenerating,
        enhanceItineraryWithImages
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);