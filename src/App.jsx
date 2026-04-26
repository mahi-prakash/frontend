// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Sirf Landing aur Auth eager load hogi (pehli screen)
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";

// Baaki sab lazy load hongi
const Quiz = lazy(() => import("./pages/Quiz"));
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Chat = lazy(() => import("./pages/Chat"));
const Planner = lazy(() => import("./pages/Planner"));
const Profile = lazy(() => import("./pages/Profile"));
const Bookings = lazy(() => import("./pages/Bookings"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));

const App = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route element={<MainLayout />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/planner/:tripId?" element={<Planner />} />

        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;