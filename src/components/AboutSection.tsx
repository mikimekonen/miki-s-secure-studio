import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Shield, Cpu } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import AnimatedSection from "./AnimatedSection";

const highlights = [
  { icon: Code, label: "Full Stack Dev", desc: "React, Node, PHP" },
  { icon: Shield, label: "Cyber Security", desc: "Hardened by Design" },
  { icon: Cpu, label: "AI Integration", desc: "ML Models & Data" },
];

const AboutSection = () => {
  // 3D Parallax logic for image
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Values from -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Parallax Image Side */}
          <AnimatedSection className="relative flex justify-center perspective-[1000px]">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative cursor-none w-72 h-72 md:w-[400px] md:h-[400px] rounded-2xl"
            >
              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-cyan-500/30 blur-[40px] -z-10"
                style={{ transform: "translateZ(-50px)" }}
              />
              
              <div className="w-full h-full rounded-2xl border border-border/50 overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-background/20 mix-blend-overlay z-10" />
                <img
                  src={profileImg}
                  alt="Micheal Mekonen"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ transform: "translateZ(30px)" }}
                />
              </div>

              {/* Floating tech badges */}
              <motion.div 
                className="absolute -right-8 top-10 flex items-center justify-center w-14 h-14 rounded-full glass border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                style={{ transform: "translateZ(80px)" }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Code className="text-primary w-6 h-6" />
              </motion.div>
              
              <motion.div 
                className="absolute -left-6 bottom-16 flex items-center justify-center w-16 h-16 rounded-full glass border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                style={{ transform: "translateZ(100px)" }}
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              >
                <Shield className="text-cyan-400 w-7 h-7" />
              </motion.div>
            </motion.div>
          </AnimatedSection>
  
          {/* Text Side */}
          <AnimatedSection delay={0.2}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              Who I Am
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Engineering <span className="text-gradient">Excellence.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground/80 font-light leading-relaxed mb-10">
              <p>
                I am a professional Full Stack Developer with a deep-rooted passion for creating resilient, top-tier digital ecosystems. Specializing in advanced React architectures and server-side logic in PHP and C++, I view every project through the lens of a cybersecurity mindset.
              </p>
              <p>
                From constructing robust Learning Management Systems to innovating with AI-driven Breast Cancer Detection models, I thrive at the intersection of complex problem-solving and sleek, intuitive user experiences.
              </p>
            </div>
  
            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <motion.div 
                  key={h.label} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="glass rounded-xl p-5 border border-border/40 hover:border-primary/40 hover:bg-surface-hover transition-all duration-300"
                >
                  <h.icon className="w-8 h-8 text-primary mb-4" />
                  <p className="font-heading font-semibold text-foreground mb-1">{h.label}</p>
                  <p className="text-[13px] text-muted-foreground">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
