import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Auth = () => {
  const navigate = useNavigate();
  const { login, token, user } = useUser();

  // If already logged in, redirect to app automatically
  React.useEffect(() => {
    if (token && user) {
      if (user.quiz_completed) {
        navigate("/chat");
      } else {
        navigate("/quiz");
      }
    }
  }, [token, user, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const [showPop, setShowPop] = useState(false);

  React.useEffect(() => {
    const hasSeenPop = localStorage.getItem("hasSeenStayLoggedInPop");
    if (!hasSeenPop) {
      const timer = setTimeout(() => {
        setShowPop(true);
        localStorage.setItem("hasSeenStayLoggedInPop", "true");
        setTimeout(() => setShowPop(false), 5000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password, stayLoggedIn);

      if (data.user.quiz_completed) {
        navigate("/chat");
      } else {
        navigate("/quiz");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/chat`,
          queryParams: {
            prompt: 'select_account'
          }
        }
      });
      if (error) throw error;
    } catch (err) {
      setError("Google Login Failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-50 via-sky-50 to-sky-100 flex items-center justify-center px-6">
      <div className="pointer-events-none absolute -top-40 -right-20 w-[520px] h-[520px] bg-gradient-to-tr from-sky-300/55 to-sky-500/40 blur-[110px] opacity-80" />
      <div className="pointer-events-none absolute bottom-[-220px] left-[-80px] w-[520px] h-[520px] bg-gradient-to-tr from-slate-200/70 to-sky-200/50 blur-[130px]" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-16">
        <Motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            It's time to fly again.
          </h1>
          <p className="text-base md:text-lg text-slate-700 max-w-md leading-relaxed">
            Keep every chaotic‑good itinerary, hidden gem, and last‑minute
            flight in one calm place. Pick up any trip on any device.
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="lg:w-1/2 w-full relative"
        >
          <AnimatePresence>
            {showPop && (
              <Motion.div
                initial={{ opacity: 0, y: 10, x: 20 }}
                animate={{ opacity: 1, y: -50, x: 20 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-0 top-0 z-50 bg-sky-600 text-white px-4 py-2 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 pointer-events-none"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Stay logged in feature added! ✨
              </Motion.div>
            )}
          </AnimatePresence>
          <Card className="px-8 pt-8 pb-6 rounded-[2.5rem] bg-white/95 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.9)]">
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-sky-600">
                The Trav Story
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">
                Welcome back, nomad.
              </h2>
              <p className="text-sm md:text-base text-slate-500 mt-1">
                Log in to open your next chaotic‑good escape.
              </p>
            </div>

            <form onSubmit={handleContinue} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jane.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-sm md:text-base rounded-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-sm md:text-base rounded-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-300"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <div className="flex items-center gap-2 px-2">
                <input
                  type="checkbox"
                  id="stayLoggedIn"
                  checked={stayLoggedIn}
                  onChange={(e) => setStayLoggedIn(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 accent-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label
                  htmlFor="stayLoggedIn"
                  className="text-xs font-medium text-slate-500 cursor-pointer select-none"
                >
                  Stay logged in for 7 days
                </label>
              </div>

              <div className="space-y-3 pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-base md:text-lg py-3.5"
                >
                  {loading ? "Logging in..." : "Continue with Email"}
                </Button>

                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <div className="relative bg-white px-4 text-xs text-slate-400 font-semibold uppercase tracking-wider">Or</div>
                </div>

                <button
                  type="button"
                  onClick={() => handleGoogleLogin()}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-200 rounded-[2rem] text-slate-700 hover:bg-slate-50 transition-colors font-semibold"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>
              </div>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-xs md:text-sm text-slate-500">
                New here?{" "}
                <span
                  className="text-sky-600 font-semibold cursor-pointer"
                  onClick={() => navigate("/quiz")}
                >
                  Get your vibe first
                </span>
              </p>
              <p className="text-[11px] text-slate-400">No spam. Just trips.</p>
            </div>
          </Card>

          <p className="mt-5 text-[11px] md:text-xs text-center text-slate-400 max-w-sm mx-auto">
            By continuing, you agree to travel way more than your group chat.
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default Auth;