import { motion } from "framer-motion";
import { Shield, Lock, AlertTriangle, FileCheck } from "lucide-react";

const practices = [
  { icon: Lock, title: "Secure Authentication", desc: "Implementing JWT, session management, and multi-factor auth to protect user accounts." },
  { icon: FileCheck, title: "Input Validation", desc: "Rigorous server-side and client-side validation to prevent malicious data injection." },
  { icon: AlertTriangle, title: "Vulnerability Awareness", desc: "Deep understanding of XSS, SQL Injection, CSRF, and how to defend against them." },
  { icon: Shield, title: "Security-First Design", desc: "Every application I build follows security best practices from the ground up." },
];

const CyberSection = () => (
  <section id="security" className="section-padding relative overflow-hidden">
    {/* Background accent */}
    <div className="absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
    </div>

    <div className="container mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          Building <span className="text-gradient">Secure</span> Systems
        </h2>
        <div className="w-16 h-1 bg-primary rounded mx-auto mb-4" />
        <p className="text-muted-foreground max-w-lg mx-auto">
          Security isn't an afterthought — it's built into every line of code I write.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {practices.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-xl p-6 text-center hover:glow-border transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <p.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-sm mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CyberSection;
