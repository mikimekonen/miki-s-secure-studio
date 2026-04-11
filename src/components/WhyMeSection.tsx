import { motion } from "framer-motion";
import { Sparkles, Zap, MessageCircle, Palette } from "lucide-react";

const points = [
  { icon: Palette, title: "Clean & Modern UI", desc: "I design interfaces that are beautiful, intuitive, and user-friendly." },
  { icon: Sparkles, title: "Secure Development", desc: "Security best practices are embedded in every project from day one." },
  { icon: Zap, title: "Fast Delivery", desc: "Efficient workflows ensure your project is delivered on time, every time." },
  { icon: MessageCircle, title: "Strong Communication", desc: "Clear, proactive communication throughout the entire project lifecycle." },
];

const WhyMeSection = () => (
  <section className="section-padding bg-card/30">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          Why <span className="text-gradient">Choose Me</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded mx-auto mb-4" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-xl p-6 text-center hover:glow-border transition-all duration-300 group"
          >
            <p.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-heading font-semibold mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyMeSection;
