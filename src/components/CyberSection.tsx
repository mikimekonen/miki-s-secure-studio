import { motion } from "framer-motion";
import { Shield, Lock, AlertTriangle, FileCheck, TerminalSquare } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const practices = [
  { icon: Lock, title: "Zero Trust Auth", desc: "Implementing robust JWT schemas, rigid session management, and adaptive multi-factor auth to aggressively protect user environments." },
  { icon: FileCheck, title: "Input Sanitization", desc: "Rigorous server-side and client-side validation to preemptively intercept XSS, SQLi, and malicious payload injections." },
  { icon: AlertTriangle, title: "Threat Modeling", desc: "Deep architectural understanding of CVEs, defense-in-depth strategies, and preemptive vulnerability neutralization." },
  { icon: Shield, title: "Secure Architecture", desc: "Engineering applications from the ground up with a 'Security-First' mindset. No patches, just impenetrable design." },
];

const CyberSection = () => (
  <section id="security" className="section-padding relative overflow-hidden bg-[#050B14]">
    {/* Cyberpunk Grid Background */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />

    {/* Scanning radar line effect */}
    <motion.div 
      className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)] pointer-events-none z-0 mix-blend-screen"
      animate={{ top: ["-10%", "110%"] }}
      transition={{ duration: 4, ease: "linear", repeat: Infinity }}
    />

    <AnimatedSection className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
      
      {/* Left side text */}
      <div className="lg:w-1/3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
          <TerminalSquare size={14} className="text-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">System Security</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
          Fortified by <br/><span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">Design.</span>
        </h2>
        <div className="w-12 h-1 bg-cyan-500 rounded mb-6 opacity-80" />
        <p className="text-muted-foreground/80 text-lg font-light leading-relaxed mb-8">
          In a landscape of constant vulnerabilities, security isn't a feature—it's the foundation. Every system I build is architected to be resilient against modern cyber threats, ensuring data immutability and user safety.
        </p>
      </div>

      {/* Right side cards */}
      <div className="lg:w-2/3 grid sm:grid-cols-2 gap-4 md:gap-6">
        {practices.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative glass border border-cyan-900/40 rounded-xl p-8 hover:bg-cyan-950/20 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden"
          >
            {/* Hover flare */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
            
            <div className="w-12 h-12 rounded-lg bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-center mb-6 group-hover:bg-cyan-900/60 group-hover:border-cyan-500/40 transition-colors">
              <p.icon className="w-6 h-6 text-cyan-400" />
            </div>
            
            <h3 className="font-heading font-semibold text-lg mb-3 text-cyan-50 group-hover:text-cyan-300 transition-colors">{p.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-light">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  </section>
);

export default CyberSection;
