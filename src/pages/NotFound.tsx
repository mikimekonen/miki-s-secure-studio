import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Terminal, ArrowLeft, Loader2, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    console.error("404 Error: Access violation at", location.pathname);
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const terminalLines = [
    "> INITIATING SCAN...",
    `> REQUESTED_URL: ${location.pathname}`,
    "> ERROR: PATH_NOT_FOUND",
    "> STATUS: 404 RESOURCE_MISSING",
    "> ACTION: REDIRECT_REQUIRED",
  ];

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden p-6">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full relative z-10"
      >
        <div className="glass-premium border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
          {/* Glitch Overlay */}
          <AnimatePresence>
            {glitch && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-primary/20 mix-blend-overlay pointer-events-none"
              />
            )}
          </AnimatePresence>

          <motion.div 
            animate={glitch ? { x: [-2, 2, -1, 0] } : {}}
            className="mb-8 flex justify-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center relative">
              <ShieldAlert size={40} className="text-red-500" />
              <div className="absolute inset-0 animate-ping bg-red-500/20 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>

          <h1 className="font-heading text-6xl md:text-8xl font-black mb-2 tracking-tighter text-gradient opacity-90">
            404
          </h1>
          <h2 className="font-heading text-xl md:text-2xl font-bold mb-6 uppercase tracking-widest text-foreground/80">
            Security <span className="text-red-500">Breach</span>
          </h2>

          <div className="bg-black/40 rounded-xl p-6 mb-10 border border-white/5 text-left font-mono">
            <div className="flex gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </div>
            <div className="space-y-2">
              {terminalLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-xs md:text-sm text-primary/80"
                >
                  {line}
                </motion.p>
              ))}
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-primary/80 align-middle ml-1"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link 
              to="/" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all glow-box group"
            >
              <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Return to Base
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 glass hover:bg-white/5 transition-all text-sm font-medium"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-muted-foreground/40 text-[10px] uppercase font-mono tracking-[4px]">
          MM_Secure_Protocol_v4.0.4
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
