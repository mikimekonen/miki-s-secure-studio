import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Lock } from "lucide-react";

const roles = ["Full Stack Developer", "Cybersecurity Specialist", "Interactive Designer"];

// Split text for stagger effect
const titleWords = ["Micheal", "Mekonen"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Magnetic button logic
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    setBtnPos({ x, y });
  };

  const handleMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 px-4 md:px-8">
      {/* Background Parallax Elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-[60%] right-[5%] w-[600px] h-[600px] rounded-full bg-cyan-700/10 blur-[150px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </motion.div>

      {/* Motion Frame Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto rounded-2xl glass-premium overflow-hidden relative shadow-2xl shadow-black/50 border border-white/10 bg-background/40 backdrop-blur-3xl z-10"
      >
        {/* Browser Window Header */}
        <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
          <div className="mx-auto text-[10px] font-mono text-muted-foreground/60 tracking-widest uppercase flex items-center gap-2">
            <Lock size={10} /> secure_environment.exe
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="relative py-24 px-6 md:px-12 lg:px-20 text-center flex flex-col items-center justify-center min-h-[70vh]">
          
          {/* Floating abstract geometrical shapes inside the frame */}
          <motion.div 
            animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div 
            animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"
          />

          <motion.p
            variants={childVariants}
            className="text-primary font-medium text-xs sm:text-sm tracking-[0.2em] uppercase mb-8"
          >
            Welcome to my portfolio
          </motion.p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8 w-full max-w-4xl">
            {titleWords.map((word, idx) => (
              <motion.h1
                key={idx}
                variants={childVariants}
                className={`font-heading text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-none ${idx === 1 ? 'text-gradient glow-text' : 'text-foreground'}`}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          <motion.div
            variants={childVariants}
            className="h-12 mb-10 flex items-center justify-center font-heading text-xl md:text-2xl text-muted-foreground/80 tracking-wide"
          >
            <span>{text}</span>
            <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
          </motion.div>

          <motion.p
            variants={childVariants}
            className="text-muted-foreground/60 text-base md:text-lg mb-14 max-w-xl mx-auto font-light leading-relaxed"
          >
            I architect secure, scalable, and beautifully interactive digital experiences. Product quality driven by intelligent design.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              ref={buttonRef}
              href="#contact"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: btnPos.x, y: btnPos.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              className="group relative px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-box overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm">
                Let's Talk
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0" />
            </motion.a>
            
            <a
              href="#projects"
              className="group px-8 py-3.5 rounded-full border border-border/50 text-foreground font-medium text-sm hover:bg-surface-hover hover:border-primary/50 transition-all backdrop-blur-md relative overflow-hidden"
            >
              <span className="relative z-10">Explore Work</span>
              {/* Subtle hover underline sweep */}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - kept subtle outside the frame */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown className="text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer" size={20} />
        </motion.div>
      </motion.div>

      {/* Soft noise texture for premium depth */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgibm9pc2VGaWx0ZXIpIi8+PC9zdmc+')]"/>
    </section>
  );
};

export default HeroSection;
