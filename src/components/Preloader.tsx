import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    const duration = 2000; // 2 seconds
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const mainTimer = setTimeout(() => {
      setLoading(false);
      // Unlock scroll after animation
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 800);
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(mainTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
          }}
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center p-6"
        >
          {/* Background Decor */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
          
          <div className="relative z-10 w-full max-w-xs text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12 flex justify-center"
            >
              <div className="w-24 h-24 rounded-2xl bg-surface border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-4xl font-black text-gradient">MM</span>
                
                {/* Scanning line */}
                <motion.div 
                  className="absolute left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-20"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Counter */}
            <div className="mb-4">
              <motion.span 
                className="text-5xl font-heading font-black text-foreground tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Math.round(counter)}%
              </motion.span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                style={{ width: `${counter}%` }}
              />
            </div>

            {/* Status Text */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-[10px] uppercase tracking-[4px] text-muted-foreground/60 font-medium"
            >
              {counter < 40 ? "Initializing Protocol..." : counter < 80 ? "Scanning Security Layers..." : "System Ready"}
            </motion.p>
          </div>

          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="absolute bottom-12 font-mono text-[10px] tracking-[6px] uppercase"
          >
            Mekonen_Secure_Workspace
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
