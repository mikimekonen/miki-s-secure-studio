import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, CheckCircle2, X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const certificates: Array<{ title: string; org: string; desc: string; date: string; highlight?: boolean }> = [
  {
    title: "Summer Camp Training Program Certificate",
    org: "Sopher Code Academy",
    desc: "Successfully completed an intensive summer training program focused on practical software development skills, problem-solving, and teamwork. Recognized for active participation and unique contribution during the program.",
    date: "2024",
  },
  {
    title: "Food Systems Innovation Challenge",
    org: "WUR & Netherlands Food Partnership",
    desc: "Participated in an international innovation challenge focused on developing sustainable and nature-based solutions for global food systems, working as part of “Team Fresh Life Solutions”.",
    date: "2024",
  },
  {
    title: "Hult Prize Organizing Committee",
    org: "Hult Prize Foundation",
    desc: "Served as an Organizing Committee Member for the Hult Prize OnCampus Program at Wollo University. Managed one of the world’s largest student entrepreneurship competitions focused on solving global challenges.",
    date: "2024-2025",
    highlight: true,
  },
  {
    title: "Programming Fundamentals Certificate",
    org: "5 Million Ethiopian Coders Program",
    desc: "Completed foundational training in programming through the 5 Million Ethiopian Coders initiative, gaining strong skills in problem-solving, algorithms, control structures, and structured software development practices.",
    date: "2024",
  },
  {
    title: "Data Analysis Fundamentals Certificate",
    org: "5 Million Ethiopian Coders Program",
    desc: "Acquired core data analysis skills including data interpretation, basic statistical concepts, and data-driven problem solving through the 5 Million Ethiopian Coders program.",
    date: "2024",
  },
  {
    title: "Android Developer Fundamentals Certificate",
    org: "5 Million Ethiopian Coders Program",
    desc: "Completed Android development fundamentals training, covering mobile UI design, application structure, and core app functionality as part of the 5 Million Ethiopian Coders initiative.",
    date: "2024",
  },
];

const CertificatesSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="certificates" className="section-padding relative bg-surface/30 overflow-hidden">
      {/* Soft background decor */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Credentials</span> & Awards
            </h2>
            <div className="w-20 h-1 bg-primary rounded mb-6 opacity-80" />
            <p className="text-muted-foreground/80 max-w-lg text-lg font-light">
              Verified achievements representing a commitment to continuous growth and technical mastery.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border/50 glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border/50 glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group"
            >
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 py-8 outline-none">
              <AnimatePresence>
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    onClick={() => setSelectedCert(cert)}
                    className={`flex-[0_0_100%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 glass p-8 rounded-2xl relative transition-all duration-500 ease-out border cursor-pointer group ${
                      index === selectedIndex 
                        ? 'border-primary/70 shadow-[0_0_40px_-5px_rgba(var(--glow),0.3)] z-10' 
                        : cert.highlight 
                          ? 'border-primary/30 shadow-[0_0_15px_-5px_rgba(var(--glow),0.1)] scale-95 opacity-70 hover:opacity-100 hover:scale-100 z-0'
                          : 'border-border/50 scale-95 opacity-40 hover:opacity-100 hover:scale-100 z-0'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-0 right-8 w-12 h-16 bg-primary/10 flex flex-col items-center justify-end pb-2 border-b-2 border-primary group-hover:h-20 transition-all duration-300">
                      <Award size={20} className="text-primary mb-1 group-hover:scale-110 transition-transform" />
                    </div>
                    
                    <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center border ${cert.highlight ? 'bg-primary/20 border-primary/50 shadow-[0_0_15px_rgba(var(--glow),0.2)]' : 'bg-surface border-border'}`}>
                      <CheckCircle2 size={24} className={cert.highlight ? 'text-primary' : 'text-gradient'} />
                    </div>
                    
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">{cert.title}</h3>
                    <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-4">{cert.org}</p>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-light">
                      {cert.desc}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-border/50 flex justify-between items-center">
                      <span className="font-mono text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border border-border/30">
                        Class of {cert.date}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 uppercase tracking-widest shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Premium Framer Motion Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setSelectedCert(null)} />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="relative w-full max-w-2xl glass-premium border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden bg-surface"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-surface-hover hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary/30"
              >
                <X size={20} />
              </button>

              <div className="mb-8 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Award size={32} className="text-primary" />
              </div>
              
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-heading text-3xl md:text-4xl font-bold">{selectedCert.title}</h3>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-primary font-medium tracking-wide uppercase">{selectedCert.org} • {selectedCert.date}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-border/50" />
                <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded border border-emerald-500/20 uppercase tracking-widest">
                  <CheckCircle2 size={14} /> Verified Credential
                </span>
              </div>
              
              <div className="w-full h-[1px] bg-border/50 mb-6" />
              
              <p className="text-muted-foreground/90 text-lg leading-relaxed font-light mb-8">
                {selectedCert.desc}
              </p>

              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-box">
                  Verify Credentials
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
