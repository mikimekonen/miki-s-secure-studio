import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "HTML/CSS", level: 95 },
      { name: "TypeScript", level: 75 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "PHP", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "REST APIs", level: 82 },
      { name: "C++", level: 70 },
    ],
  },
  {
    title: "Cybersecurity",
    skills: [
      { name: "Secure Coding", level: 80 },
      { name: "Input Validation", level: 85 },
      { name: "Auth Systems", level: 78 },
      { name: "Vulnerability Awareness", level: 75 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Linux", level: 70 },
      { name: "Figma", level: 65 },
    ],
  },
];

const SkillsSection = () => (
  <section id="skills" className="section-padding bg-card/30">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          My <span className="text-gradient">Skills</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded mx-auto mb-4" />
        <p className="text-muted-foreground max-w-lg mx-auto">
          Technologies and tools I use to bring ideas to life.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
            className="glass rounded-xl p-6 hover:glow-border transition-all duration-300"
          >
            <h3 className="font-heading text-lg font-semibold text-primary mb-5">{cat.title}</h3>
            <div className="space-y-4">
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
