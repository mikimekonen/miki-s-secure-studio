import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    title: "EthioTemhert LMS",
    desc: "A full-featured Learning Management System enabling students and teachers to interact, manage courses, and track progress efficiently.",
    tech: ["React", "PHP", "MySQL"],
    color: "from-primary/40 to-cyan-400/40",
    github: "https://github.com/lakibir/student-management"
  },
  {
    title: "SafeHer Platform",
    desc: "A platform protecting females in Ethiopia with secure transportation, real-time emergency assistance, and incident reporting to ensure safer mobility and peace of mind.",
    tech: ["React", "Mapbox", "Node.js"],
    color: "from-pink-500/40 to-rose-500/40",
    image: "/safeher.jpg",
    github: "https://github.com/mikimekonen/safeher-ethiopia.git"
  },
  {
    title: "Phishguard Ethiopia",
    desc: "Phishguard Ethiopia is a cybersecurity project focused on detecting and preventing phishing attacks targeting Ethiopian users. It provides tools and resources to identify suspicious links, websites, and phishing attempts. The main goal is to enhance digital security awareness and protection within the Ethiopian online community.",
    tech: ["Cybersecurity", "React", "Node.js"],
    color: "from-violet-500/40 to-primary/40",
    image: "/cyber.svg",
    github: "https://github.com/mikimekonen/phishguard-ethiopia"
  },
  {
    title: "Samelos Media",
    desc: "A streamlined platform for media sharing and communication. It enables efficient message and media exchange in one unified, secure platform focused on user engagement.",
    tech: ["React", "Node.js", "WebSockets"],
    color: "from-emerald-400/40 to-primary/40",
    image: "/samelos.jpg",
    github: "https://github.com/mikimekonen/Samelos-Media-Communication"
  },
];

const ProjectCard = ({ p, index }: { p: any; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Custom 3D tilt effect variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { damping: 30, stiffness: 300 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { damping: 30, stiffness: 300 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // For spotlight
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    
    // For tilt
    const xPos = (clientX - left) / width - 0.5;
    const yPos = (clientY - top) / height - 0.5;
    x.set(xPos);
    y.set(yPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col glass rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500"
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 40%
            )
          `,
        }}
      />

      {/* Abstract Gradient Header or Real Image */}
      <div className={`h-48 md:h-56 w-full relative overflow-hidden bg-gradient-to-br ${p.color} flex items-center justify-center`}>
        {p.image ? (
          <>
            <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-all duration-700" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[20px] group-hover:backdrop-blur-sm transition-all duration-700" />
            
            {/* Abstract shapes floating inside */}
            <motion.div 
              className="absolute w-24 h-24 rounded-full bg-white/10 blur-xl"
              animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            
            <motion.span 
              className="relative z-10 font-heading text-3xl font-bold text-white drop-shadow-xl select-none"
              whileHover={{ scale: 1.1, letterSpacing: "2px" }}
              transition={{ duration: 0.3 }}
            >
              {p.title.split(" ")[0]}
            </motion.span>
          </>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-card/40 to-background/90">
        <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{p.desc}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {p.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 rounded-full border border-border/50 bg-surface text-primary text-[11px] font-medium tracking-wider uppercase">
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-auto">
          <a href={p.demo || "#"} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <ExternalLink size={16} /> Live Demo
          </a>
          <a href={p.github || "#"} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground text-sm font-semibold hover:bg-surface-hover hover:border-primary/50 transition-all duration-300">
            <Github size={16} /> Source
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <section id="projects" className="section-padding relative">
    <div className="container mx-auto">
      <AnimatedSection className="text-center mb-20">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          Selected <span className="text-gradient">Works</span>
        </h2>
        <div className="w-20 h-1 bg-primary rounded mx-auto mb-6 opacity-80" />
        <p className="text-muted-foreground/80 max-w-lg mx-auto text-lg font-light">
          A showcase of digital products engineered with precision and security.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
