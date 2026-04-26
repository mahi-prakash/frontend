import React, { useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import plane from "../layouts/plane.png";
import vcurve from "../layouts/VCurve.png";
import Dropdown from "../components/common/Dropdown";

const MainLayout = () => {
  const location = useLocation();
  const isFullWidthPage = location.pathname === "/chat" || location.pathname.startsWith("/planner") || location.pathname === "/profile" || location.pathname === "/bookings" || location.pathname === "/explore";
  const { user, logout } = useUser();

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* HEADER (SINGLE SOURCE OF TRUTH) */}
      <header className="border-b border-slate-100 bg-white">
        <div className="w-full px-8 py-3 flex items-center">

          {/* LEFT — BRAND */}
          <div className="flex items-center shrink-0 cursor-pointer group">
            <div className="flex flex-col leading-none">
              {/* THE */}
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] mb-[-2px] ml-0.5 transition-colors group-hover:text-sky-600">
                THE
              </span>

              {/* MAIN BRAND: TRAV STORY */}
              <div className="flex items-center">
                <span className="text-3xl font-black tracking-tighter text-sky-600">
                  TRA
                </span>

                {/* CONSTRUCTED V (LEFT CURVE + PLANE RIGHT) */}
                <div className="relative flex items-center justify-center w-14 h-10.5 -mx-4 translate-y-0.5 group-hover:scale-105 transition-transform duration-300">
                  {/* LEFT CURVE (VCurve.png) - MATCHING SKY BLUE */}
                  <img
                    src={vcurve}
                    alt="V-left"
                    className="absolute inset-0 w-full h-full object-contain -translate-x-1"
                  />
                  {/* PLANE (RIGHT CURVE) (plane.png) */}
                  <img
                    src={plane}
                    alt="V-right"
                    className="absolute inset-0 w-full h-full object-contain translate-x-1.5 scale-110"
                  />
                </div>

                <span className="text-3xl font-black tracking-tighter text-slate-900 ml-0">
                  STORY
                </span>
              </div>
            </div>
          </div>

          {/* CENTER — NAVIGATION */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center gap-10 text-m font-semibold">
              {[
                { to: "/chat", label: "Chat" },
                { to: "/planner", label: "Planner" },
                { to: "/bookings", label: "Bookings" },
                { to: "/explore", label: "Explore" },
                { to: "/profile", label: "Profile" },
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `pb-1 transition ${isActive
                        ? "text-sky-600 border-b-2 border-sky-600"
                        : "text-slate-600 hover:text-sky-700"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT — PROFILE (Simplified for MVP) */}
          <NavLink to="/profile" className="flex items-center gap-4 shrink-0 hover:opacity-80 transition-opacity">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                Guest Traveler
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">View Profile</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-slate-100 overflow-hidden ring-2 ring-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </NavLink>



        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        className={
          isFullWidthPage
            ? "flex-1 w-full px-0 pb-0 pt-0 overflow-y-auto no-scrollbar"
            : "flex-1 container mx-auto max-w-5xl px-6 pt-6"
        }
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
