import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer aria-label="Site footer">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="flex flex-col items-start leading-none group"
            id="footer-logo"
          >
            <span className="text-[9px] font-bold tracking-[0.3em] text-sky-500 mb-1 group-hover:text-sky-300 transition-colors">THE</span>
            <span className="text-2xl font-black text-white tracking-tight group-hover:text-sky-400 transition-colors">TRAVSTORY</span>
          </Link>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Elevating travel through cinematic narrative and architectural
            design.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Links</p>
            <div className="flex gap-4 text-sm text-slate-300">
              <Link to="#" className="hover:text-white transition-colors">About</Link>
              <Link to="#" className="hover:text-white transition-colors">Press</Link>
              <Link to="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Legal</p>
            <div className="flex gap-4 text-sm text-slate-300">
              <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} TravStory. All rights reserved.</p>
        <p>Built from Bengaluru · Lisbon · Seoul · wherever Wi-Fi holds.</p>
      </div>
    </footer>
  );
}
