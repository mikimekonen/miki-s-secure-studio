import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "EthioTemhert LMS",
    desc: "A full-featured Learning Management System enabling students and teachers to interact, manage courses, and track progress efficiently.",
    tech: ["React", "PHP", "MySQL"],
    color: "from-primary to-cyan-400",
  },
  {
    title: "School Management System",
    desc: "Comprehensive school management platform handling student records, attendance, grading, and administrative workflows.",
    tech: ["PHP", "MySQL", "Bootstrap"],
    color: "from-cyan-400 to-emerald-400",
  },
  {
    title: "Breast Cancer Detection (ML)",
    desc: "AI-powered application that uses machine learning algorithms to detect breast cancer from medical datasets with high accuracy.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    color: "from-violet-500 to-primary",
  },
  {
    title: "Blog Website",
    desc: "A modern, responsive blog platform with article management, user authentication, and a clean reading experience.",
    tech: ["React", "Node.js", "CSS"],
    color: "from-emerald-400 to-primary",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded mx-auto mb-4" />
        <p className="text-muted-foreground max-w-lg mx-auto">
          Real-world projects showcasing my skills and problem-solving abilities.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group glass rounded-xl overflow-hidden hover:glow-border transition-all duration-300"
          >
            {/* Gradient header */}
            <div className={`h-48 bg-gradient-to-br ${p.color} opacity-80 flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-all" />
              <span className="relative font-heading text-2xl font-bold text-foreground drop-shadow-lg">{p.title}</span>
            </div>

            <div className="p-6">
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition">
                  <ExternalLink size={14} /> Live Demo
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg glow-border text-foreground text-sm font-medium hover:bg-primary/10 transition">
                  <Github size={14} /> GitHub
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
