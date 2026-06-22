"use client";



export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/5 py-12 md:py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center relative z-10 select-none">
      <div className="w-full max-w-[1400px] flex flex-col gap-10 md:gap-16">
        
        {/* Top footer area */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo & Subtext */}
          <div className="flex flex-col gap-2">
            <span 
              className="text-3xl font-extrabold tracking-tighter text-white font-montserrat lowercase"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              clixs
            </span>
            <p className="text-white/40 text-xs md:text-sm max-w-xs leading-relaxed font-sans">
              Attract, convert, and scale your digital presence with high-converting marketing & branding systems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-8 text-xs font-semibold uppercase tracking-wider text-white/50 font-montserrat">
            <a href="#about" className="hover:text-white transition-colors duration-300">about</a>
            <a href="#services" className="hover:text-white transition-colors duration-300">services</a>
            <a href="#reviews" className="hover:text-white transition-colors duration-300">reviews</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">contact</a>
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer font-montserrat"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            back to top ↑
          </button>
        </div>

        {/* Bottom copyright area */}
        <div className="w-full border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30 font-sans">
          <span>
            © {new Date().getFullYear()} CLIXS. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
