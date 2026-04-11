import { motion } from "framer-motion";
import { Code, Shield, Cpu } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const highlights = [
  { icon: Code, label: "Full Stack Dev", desc: "React, PHP, C++" },
  { icon: Shield, label: "Security Focus", desc: "Secure by design" },
  { icon: Cpu, label: "AI Experience", desc: "ML projects" },
];

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/20 blur-2xl" />
            <img
              src={profileImg}
              alt="Miki Mekonen"
              className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl object-cover glow-border"
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded mb-6" />

          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm a Computer Science student and professional Full Stack Web Developer with a deep passion for building modern, secure, and scalable web applications. I specialize in React, PHP, and C++, and I bring a strong cybersecurity mindset to every project I work on.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            From Learning Management Systems to AI-powered Breast Cancer Detection — I enjoy tackling complex challenges and delivering solutions that make a real impact.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div key={h.label} className="glass rounded-xl p-4 text-center hover:glow-border transition-all duration-300">
                <h.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-heading font-semibold text-sm">{h.label}</p>
                <p className="text-xs text-muted-foreground">{h.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
