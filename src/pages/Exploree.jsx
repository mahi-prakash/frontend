import { useState, useEffect } from "react";
import {
  Check, Heart, Bookmark, Grid, MessageCircle,
  MapPin, Navigation, Sparkles, SlidersHorizontal, ChevronDown, Search,
  Coffee, Landmark, Wallet, Sunset, Sunrise, Calendar, Clock, Gem, Palmtree,
  Star, Share2, X, Plus, ArrowRight, Info, Music
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/* DATA */
/* ------------------------------------------------------------------ */

const thumbnails = [
  "/place2.jpg",
  "/place3.webp",
  "/place4.webp",
  "/place5.jpg",
];

const defaultPosts = [
  {
    image: "/place1.jpg",
    location: "Kyoto, Japan",
    author: "@nomad_jess",
    caption:
      "Found the hidden shrine behind the bamboo forest. Literally zen. #hiddenjapan #kyoto",
  },
  {
    image: "/place2.jpg",
    location: "Osaka, Japan",
    author: "@foodie_sam",
    caption: "Street food heaven 🍜🔥 #osaka #foodtrip",
  },
  {
    image: "/place3.webp",
    location: "Tokyo, Japan",
    author: "@citywalks",
    caption: "Neon nights never disappoint 🌃 #tokyo",
  },
];

/* ------------------------------------------------------------------ */
/* FILTERS */
/* ------------------------------------------------------------------ */

const mainFilters = [
  { id: "all", label: "All places", icon: <Grid size={16} /> },
  { id: "gems", label: "Hidden gems", icon: <Gem size={16} /> },
  { id: "food", label: "Food Only", icon: <Coffee size={16} /> },
];

const categoryFilters = [
  { id: "cafe", label: "Cafes & Social", icon: <Coffee size={14} /> },
  { id: "museum", label: "Culture & Art", icon: <Landmark size={14} /> },
  { id: "nature", label: "Nature & Parks", icon: <Palmtree size={14} /> },
];

const moodFilters = [
  { id: "romantic", label: "Romantic Spot", icon: <Heart size={14} /> },
  { id: "scenic", label: "Scenic Views", icon: <Sparkles size={14} /> },
  { id: "budget", label: "Budget Friendly", icon: <Wallet size={14} /> },
];

const timeFilters = [
  { id: "breakfast", label: "Breakfast Place", icon: <Sunrise size={14} /> },
  { id: "sunset", label: "Sunset Spot", icon: <Sunset size={14} /> },
];


import { useTrip } from "../context/TripContext";

/* ------------------------------------------------------------------ */
/* LEFT WALL FILTER RAIL */
/* ------------------------------------------------------------------ */

function ExploreFilters({ viewMode, setViewMode, routeMode, setRouteMode, selectedDayId, setSelectedDayId, activeTab, setActiveTab }) {
  const { trips, activeTripId, setActiveTrip } = useTrip();
  const [showTripSelector, setShowTripSelector] = useState(false);

  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];

  const handleRouteToggle = (mode, dayId = null) => {
    if (routeMode === mode && selectedDayId === dayId) {
      setRouteMode(null);
      setSelectedDayId(null);
    } else {
      setRouteMode(mode);
      setSelectedDayId(dayId);
      setActiveTab(null);
    }
  };

  return (
    <div className="fixed left-40 top-1/2 -translate-y-1/2 z-30 mt-12 w-[280px]">
      {/* SOPHISTICATED GLASS CONTAINER */}
      <div className="relative rounded-[32px] bg-white/90 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/50 overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-100/50 flex items-center justify-between bg-white/50">
          <h3 className="text-[22px] font-black text-[#0B1527] uppercase tracking-widest">Explore</h3>
          <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-[#0081C9] hover:border-sky-200 hover:shadow-sm transition-all cursor-pointer">
            <SlidersHorizontal size={14} />
          </div>
        </div>

        <div className="px-4 py-6 flex flex-col gap-1 overflow-y-auto max-h-[60vh] no-scrollbar">
          {viewMode === "reels" ? (
            /* REELS SPECIFIC FILTERS */
            <div className="space-y-1 mb-4">
              <span className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 opacity-80">Discovery</span>
              {mainFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveTab(filter.id);
                    setRouteMode(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${activeTab === filter.id
                    ? "bg-sky-50 border border-sky-500 text-sky-600 shadow-lg shadow-sky-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === filter.id ? "bg-white/10 text-sky-400" : "bg-white border border-slate-200 shadow-sm text-slate-500 group-hover:border-slate-300"
                    }`}>
                    {filter.icon}
                  </div>
                  <span className="text-[13px] font-bold">{filter.label}</span>

                </button>
              ))}
            </div>
          ) : (
            /* PLACES SMART FILTERS (AI POWERED) */
            <div className="space-y-7">
              {/* Category */}
              <div>
                <span className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 opacity-80">Category</span>
                <div className="space-y-1.5">
                  {categoryFilters.map(f => (
                    <button
                      key={f.id}
                      onClick={() => { setActiveTab(f.id); setRouteMode(null); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 group ${activeTab === f.id ? "bg-sky-50 border border-sky-500 text-sky-600 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === f.id ? "bg-white/10 text-sky-400" : "bg-white border border-slate-200 shadow-sm text-slate-500 group-hover:border-slate-300"}`}>{f.icon}</div>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div>
                <span className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 opacity-80">Mood</span>
                <div className="space-y-1.5">
                  {moodFilters.map(f => (
                    <button
                      key={f.id}
                      onClick={() => { setActiveTab(f.id); setRouteMode(null); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 group ${activeTab === f.id ? "bg-rose-50 text-rose-600 shadow-sm border border-rose-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === f.id ? "bg-white shadow-sm" : "bg-white border border-slate-200 shadow-sm text-slate-500 group-hover:border-slate-300"}`}>{f.icon}</div>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Based */}
              <div>
                <span className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 opacity-80">Timing</span>
                <div className="space-y-1.5">
                  {timeFilters.map(f => (
                    <button
                      key={f.id}
                      onClick={() => { setActiveTab(f.id); setRouteMode(null); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all duration-300 group ${activeTab === f.id ? "bg-amber-50 text-amber-600 shadow-sm border border-amber-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 ${activeTab === f.id ? "bg-white shadow-sm" : "bg-white border border-slate-200 shadow-sm text-slate-500 group-hover:border-slate-300"}`}>{f.icon}</div>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="h-px bg-slate-100 mx-3 my-4" />

          {/* TRIP CONTEXTUAL FILTERS */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 opacity-80">{viewMode === 'places' ? 'Plan Context' : 'Contextual search'}</span>

            {/* TRIP SELECTOR DISPLAY */}
            <div className="px-1 mb-4">
              <button
                onClick={() => setShowTripSelector(!showTripSelector)}
                className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 flex items-center justify-between group hover:border-[#0081C9] hover:bg-sky-50/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <MapPin size={14} className="text-[#0081C9]" />
                  <span className="text-[13px] font-bold text-[#0B1527] truncate">{activeTrip.name}</span>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${showTripSelector ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showTripSelector && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 border border-slate-100 rounded-2xl bg-white shadow-lg overflow-hidden"
                  >
                    {trips.map(trip => (
                      <button
                        key={trip.id}
                        onClick={() => {
                          setActiveTrip(trip.id);
                          setShowTripSelector(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-[12px] font-bold transition-all flex items-center gap-2 ${activeTripId === trip.id ? 'text-[#0081C9] bg-sky-50' : 'text-slate-500 hover:text-[#0B1527] hover:bg-slate-50'
                          }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${activeTripId === trip.id ? 'bg-[#0081C9]' : 'bg-slate-300'}`} />
                        {trip.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {viewMode === 'places' ? (
              <div className="space-y-1.5 px-1">
                {/* NEAR DAY PLAN (DYNAMIC) */}
                {[1, 2, 3].map(day => (
                  <button
                    key={day}
                    onClick={() => handleRouteToggle('near-day', day)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group ${routeMode === 'near-day' && selectedDayId === day
                      ? "bg-[#0081C9] text-white shadow-lg shadow-blue-100"
                      : "text-slate-500 hover:bg-slate-50 hover:text-[#0B1527]"
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${routeMode === 'near-day' && selectedDayId === day ? "bg-white/20" : "bg-white border border-slate-200 shadow-sm text-slate-500 group-hover:border-slate-300"
                      }`}>
                      <Calendar size={14} />
                    </div>
                    <span className="text-[13px] font-black italic">Near Day {day} Plan</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5 px-1">
                {/* ON MY ROUTE */}
                <button
                  onClick={() => handleRouteToggle('on-route')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group ${routeMode === 'on-route'
                    ? "bg-[#0081C9] text-white shadow-lg shadow-blue-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-[#0B1527]"
                    }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${routeMode === 'on-route' ? "bg-white/20" : "bg-white border border-slate-200 shadow-sm text-slate-500 group-hover:border-slate-300"
                    }`}>
                    <Navigation size={14} />
                  </div>
                  <span className="text-[13px] font-bold">On My Route</span>
                </button>

                {/* AROUND MY TRIP (RELATED PLACES) */}
                <button
                  onClick={() => handleRouteToggle('around')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group ${routeMode === 'around'
                    ? "bg-[#0081C9] text-white shadow-lg shadow-blue-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-[#0B1527]"
                    }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${routeMode === 'around' ? "bg-white/20" : "bg-white border border-slate-200 shadow-sm text-slate-500 group-hover:border-slate-300"
                    }`}>
                    <Sparkles size={14} />
                  </div>
                  <span className="text-[13px] font-bold">Around My Trip</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VIEW MODE TABS - SEPARATE CELL BELOW */}
      <div className="mt-4 relative rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/50 p-2 flex gap-2 overflow-hidden">
        <button
          onClick={() => setViewMode("reels")}
          className={`flex-1 py-3.5 rounded-2xl text-[12px] font-black transition-all duration-300 relative overflow-hidden group tracking-wider ${viewMode === "reels"
            ? "bg-sky-50 border border-sky-500 text-sky-600 shadow-lg shadow-sky-100"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Grid size={14} className={viewMode === "reels" ? "text-sky-400" : ""} />
            <span>REELS</span>
          </div>
          {viewMode === "reels" && (
            <motion.div layoutId="tabInd" className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setViewMode("places")}
          className={`flex-1 py-3.5 rounded-2xl text-[12px] font-black transition-all duration-300 relative overflow-hidden group tracking-wider ${viewMode === "places"
            ? "bg-sky-50 border border-sky-500 text-sky-600 shadow-lg shadow-sky-100"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
        >
          <div className="flex items-center justify-center gap-2">
            <MapPin size={14} className={viewMode === "places" ? "text-sky-400" : ""} />
            <span>PLACES</span>
          </div>
          {viewMode === "places" && (
            <motion.div layoutId="tabInd" className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setViewMode("map")}
          className={`flex-1 py-3.5 rounded-2xl text-[12px] font-black transition-all duration-300 relative overflow-hidden group tracking-wider ${viewMode === "map"
            ? "bg-sky-50 border border-sky-500 text-sky-600 shadow-lg shadow-sky-100"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
            }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Navigation size={14} className={viewMode === "map" ? "text-sky-400" : ""} />
            <span>MAP</span>
          </div>
          {viewMode === "map" && (
            <motion.div layoutId="tabInd" className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full" />
          )}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN PAGE */
/* ------------------------------------------------------------------ */

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState("reels"); // 'reels' or 'places'
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [routeMode, setRouteMode] = useState(null);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const [posts, setPosts] = useState(defaultPosts);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItemToTrip, activeTripId } = useTrip();

  // Filter Logic
  const filteredPlaces = posts.filter(place => {
    // Tab Filter
    if (activeTab && activeTab !== 'all') {
      const match = place.category === activeTab || (place.caption && place.caption.toLowerCase().includes(activeTab.toLowerCase()));
      if (!match) return false;
    }

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = (place.location && place.location.toLowerCase().includes(q)) || 
                    (place.caption && place.caption.toLowerCase().includes(q)) ||
                    (place.author && place.author.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/posts`);
        if (!res.ok) return; // Keep defaults
        const result = await res.json();
        if (result.success && result.data.length > 0) {
          setPosts(result.data.map(p => ({
            id: p.id,
            image: p.image_url,
            location: p.location,
            author: p.author || "@unknown",
            caption: p.caption,
            category: p.category
          })));
        }
      } catch (err) {
        console.log("ℹ️ Using default explore posts (backend offline)");
      }
    };
    fetchPosts();
  }, []);


  return (
    <div className="min-h-screen w-full relative pb-10">
      <div className="relative w-full min-h-screen px-24 pt-2 pb-24">
        {/* LEFT FILTERS & TABS SIDEBAR */}
        <ExploreFilters 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          routeMode={routeMode}
          setRouteMode={setRouteMode}
          selectedDayId={selectedDayId}
          setSelectedDayId={setSelectedDayId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* CONTENT SWITCHER */}
        <AnimatePresence mode="wait">
          {viewMode === "reels" ? (
            <motion.div
              key="reels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="
                relative
                mx-auto
                max-w-[1200px]
                translate-x-[160px]
                translate-y-[-5px]
                bg-white/70
                backdrop-blur-xl
                rounded-[44px]
                shadow-[0_40px_120px_rgba(0,0,0,0.18)]
                px-20
                py-8
              "
            >
              <div className="flex items-start justify-center gap-16">
                {/* LEFT MINI THUMBNAILS */}
                <div className="flex flex-col items-center pt-18 text-gray-400">
                  <span className="text-xs mb-4">Swipe / scroll</span>

                  {thumbnails.map((src, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-[14px] bg-white/60 shadow" />

                        <div className="relative w-12 h-14 rounded-xl overflow-hidden">
                          <img
                            src={src}
                            alt="thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {i !== thumbnails.length - 1 && (
                        <div className="flex flex-col gap-1 py-2">
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CENTER REEL */}
                <div className="relative -mt-2">
                  <div className="absolute -inset-3 rounded-[40px] bg-white/60 shadow" />

                  {/* SCROLL CONTAINER */}
                  <div
                    className="
                    relative
                    w-[360px]
                    h-[560px]
                    overflow-y-scroll
                    overflow-x-hidden
                    snap-y
                    snap-mandatory
                    no-scrollbar
                    scroll-smooth
                    overscroll-contain
                  "
                  >
                    {posts.map((reel, index) => (
                      <motion.div
                        key={index}
                        className="
                        snap-start
                        snap-always
                        relative
                        w-full
                        h-[560px]
                        rounded-[32px]
                        overflow-hidden
                        shadow-[0_30px_80px_rgba(0,0,0,0.25)]
                      "
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {/* IMAGE */}
                        <img
                          src={reel.image}
                          alt={reel.location}
                          className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* LOCATION */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded-full text-xs">
                          {reel.location}
                        </div>

                        {/* INDEX */}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white rounded-full text-xs">
                          {index + 1} / {posts.length}
                        </div>

                        {/* CAPTION */}
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <p className="text-xs opacity-80">{reel.author}</p>
                          <p className="text-sm">{reel.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex flex-col gap-6 mt-40">
                  <Action icon={<Heart />} label="12.4k" />
                  <Action icon={<Bookmark />} label="84" />
                  <Action icon={<MessageCircle />} label="Save to trip" />
                  <Action icon={<Grid />} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="places"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="
                relative
                mx-auto
                max-w-[1200px]
                translate-x-[160px]
                bg-white/70
                backdrop-blur-xl
                rounded-[44px]
                shadow-[0_40px_120px_rgba(0,0,0,0.18)]
                px-12
                py-10
                min-h-[700px]
                mb-32
              "
            >
              <div className="flex flex-col gap-8">
                <div className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Structured <span className="text-sky-600">Explore</span></h2>
                      <p className="text-slate-500 font-medium mt-1">Browse top rated locations and hidden gems</p>
                    </div>
                  </div>

                  {/* SEARCH BAR & FILTERS - JUST ABOVE CARDS */}
                  <div className="flex items-center gap-4 w-full">
                    <div className="relative flex-1 group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search size={16} className="text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search romantic sunset spots, museum near Day 2..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-[13px] font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm"
                      />
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 rounded-2xl text-[12px] font-black text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
                      <SlidersHorizontal size={14} />
                      Refine
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {filteredPlaces.length > 0 ? filteredPlaces.map((place, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8 }}
                      onClick={() => setSelectedPlace(place)}
                      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 transition-all hover:shadow-xl cursor-pointer"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img src={place.image} alt={place.location} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">
                          {place.location}
                        </div>
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-colors">
                          <Heart size={14} />
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Sparkles key={star} size={10} className="text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">4.9 (128 reviews)</span>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 mb-1">Authentic Experience</h4>
                        <p className="text-[12px] text-slate-500 line-clamp-2 font-medium leading-relaxed">
                          {place.caption}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map(u => (
                              <div key={u} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                <img src={`/profile${u}.jpg`} alt="user" className="w-full h-full object-cover" onError={(e) => e.target.src = '/place1.jpg'} />
                              </div>
                            ))}
                          </div>
                          <button className="text-[11px] font-black text-sky-600 group-hover:underline">VIEW DETAILS</button>
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="col-span-full py-20 text-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Search size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">No results found</h3>
                      <p className="text-slate-500 mt-2">Try adjusting your filters or search query</p>
                      <button onClick={() => {setActiveTab('all'); setSearchQuery('');}} className="mt-6 text-sky-600 font-bold hover:underline">Clear all filters</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : viewMode === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative mx-auto max-w-[1200px] translate-x-[160px] bg-white/70 backdrop-blur-xl rounded-[44px] shadow-[0_40px_120px_rgba(0,0,0,0.18)] p-4 min-h-[700px] mb-32 overflow-hidden"
            >
              <div className="w-full h-[660px] bg-slate-100 rounded-[32px] flex items-center justify-center text-slate-400 flex-col gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <MapPin size={32} className="text-sky-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900">Interactive Explorer Map</h3>
                  <p className="text-sm">Map view functionality is being synchronized with your trip context...</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* FULL SCREEN PLACE DETAIL VIEW */}
      <AnimatePresence>
        {selectedPlace && (
          <PlaceDetailView
            place={selectedPlace}
            posts={posts}
            selectedDayId={selectedDayId}
            onAdd={(day) => {
              if (!activeTripId) return;
              addItemToTrip(activeTripId, `day-${day}`, {
                name: selectedPlace.name || selectedPlace.location || "New Place",
                location: selectedPlace.location,
                img: selectedPlace.image,
                type: selectedPlace.type || "activity",
                coords: selectedPlace.coords || [48.8566, 2.3522]
              });
              setSelectedPlace(null); // Close after adding
            }}
            onClose={() => setSelectedPlace(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PLACE DETAIL VIEW COMPONENT */
/* ------------------------------------------------------------------ */

function PlaceDetailView({ place, onClose, onAdd, selectedDayId, posts }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-lg flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[48px] shadow-[0_50px_150px_rgba(0,0,0,0.3)] overflow-hidden flex"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all border border-white/20"
        >
          <X size={24} />
        </button>

        {/* LEFT COLUMN: VISUALS & MEDIA */}
        <div className="w-[45%] h-full relative group">
          <img src={place.image} alt={place.location} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-sky-500 rounded-full text-[10px] font-black uppercase tracking-widest">Selected Place</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase">{place.location}</span>
            </div>
            <h2 className="text-5xl font-black mb-4 leading-tight tracking-tight">The {place.location} Experience</h2>
            <p className="text-lg opacity-80 font-medium leading-relaxed italic line-clamp-3">
              "{place.caption}"
            </p>
          </div>

          {/* MINI GALLERY OVERLAY */}
          <div className="absolute bottom-10 right-10 flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-16 h-16 rounded-2xl border-2 border-white/30 overflow-hidden shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                <img src={`/place${i + 1}.jpg`} className="w-full h-full object-cover" onError={(e) => e.target.src = '/place2.jpg'} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: INFORMATION & ACTIONS */}
        <div className="flex-1 h-full overflow-y-auto bg-slate-50 no-scrollbar p-12">
          {/* HEADER INFO */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <span className="text-sm font-black text-slate-900 ml-1">4.9</span>
                <span className="text-sm font-bold text-slate-400">(1,280 reviews)</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Authentic Cultural Immersion</h1>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-200 transition-all shadow-sm">
                <Share2 size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm">
                <Heart size={18} />
              </button>
            </div>
          </div>

          {/* AI SUMMARY BOX */}
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Sparkles size={120} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                <Sparkles size={16} />
              </div>
              <span className="text-xs font-black uppercase text-sky-600 tracking-widest">AI Expert Summary</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              This location is a masterclass in local ambiance. Our AI suggests visiting during the "Golden Hour" (around 5:45 PM) to witness the light play against the architecture. It's perfectly suited for your **"Kyoto Zen"** trip context, offering a quiet escape just 12 minutes away from your Day 2 afternoon slot.
            </p>
          </div>

          {/* TWO COLUMN INFO: MAP & NEARBY */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            {/* MAP SECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                  <MapPin size={12} /> Location Map
                </span>
                <button className="text-[10px] font-black text-sky-600 hover:underline">VIEW FULL MAP</button>
              </div>
              <div className="h-48 rounded-[24px] bg-slate-200 overflow-hidden relative border border-slate-200 shadow-inner group">
                <img src="/map_placeholder.png" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" onError={(e) => e.target.src = '/place1.jpg'} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-sky-500 animate-pulse">
                    <Navigation size={20} className="text-sky-600 fill-sky-100" />
                  </div>
                </div>
              </div>
            </div>

            {/* NEARBY PLACES SLIDER */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                <Compass size={12} /> Nearby discovery
              </span>
              <div className="flex gap-4">
                {[2, 3].map(i => (
                  <div key={i} className="flex-1 bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="h-20 rounded-xl overflow-hidden mb-3">
                      <img src={`/place${i}.jpg`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <p className="text-[10px] font-black text-slate-900 truncate">Hidden Garden</p>
                    <p className="text-[9px] font-bold text-slate-400">4 min walk</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* REELS FROM THIS PLACE TITLE */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music size={18} className="text-rose-500" />
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Reels from here</h3>
            </div>
            <button className="text-[11px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Browse All 42</button>
          </div>

          {/* MINI REELS HORIZONTAL */}
          <div className="flex gap-4 mb-20 overflow-x-auto pb-4 no-scrollbar">
            {posts.map((reel, i) => (
              <div key={i} className="flex-shrink-0 w-40 h-64 rounded-2xl overflow-hidden relative shadow-lg group">
                <img src={reel.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[8px] font-black text-white/70 uppercase">@{reel.author.split('@')[1]}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FLOATING ACTION DOCK */}
          <div className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] rounded-[32px] p-6 flex items-center gap-4">
            <div className="flex-1 flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Dynamic Selection</span>
              <span className="text-xs font-bold text-slate-900">Add to your active Kyoto Trip</span>
            </div>

            <button
              onClick={() => onAdd(selectedDayId || 1)}
              className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[12px] font-black hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              ADD TO DAY {selectedDayId || 1}
            </button>

            <button className="flex items-center gap-2 px-6 py-4 bg-sky-100 text-sky-700 rounded-2xl text-[12px] font-black hover:bg-sky-200 transition-all active:scale-95">
              <RotateCcw size={18} />
              REPLACE PARKS
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const Compass = ({ size }) => <Navigation size={size} className="rotate-45" />;
const RotateCcw = ({ size }) => <AnimatePresence><motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}><Navigation size={size} /></motion.div></AnimatePresence>;

/* ------------------------------------------------------------------ */
/* ACTION BUTTON */
/* ------------------------------------------------------------------ */

function Action({ icon, label }) {
  return (
    <div className="flex items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer transition">
      <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
        {icon}
      </div>

      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
