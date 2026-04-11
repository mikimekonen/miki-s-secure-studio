import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "Web Development Fundamentals",
    org: "Coursera",
    desc: "Comprehensive understanding of HTML, CSS, JavaScript, and responsive web design.",
    date: "2024",
  },
  {
    title: "React.js Advanced Concepts",
    org: "Udemy",
    desc: "Deep dive into hooks, context API, performance optimization, and state management.",
    date: "2024",
  },
  {
    title: "Cybersecurity Essentials",
    org: "Cisco Networking Academy",
    desc: "Foundational knowledge of cybersecurity principles, threats, and secure practices.",
    date: "2023",
  },
  {
    title: "Introduction to Machine Learning",
    org: "Coursera",
    desc: "Supervised and unsupervised learning, model evaluation, and real-world ML applications.",
    date: "2023",
  },
];

const CertificatesSection = () => (
  <section id="certificates" className="section-padding bg-card/30">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          <span className="text-gradient">Certificates</span> & Awards
        </h2>
        <div className="w-16 h-1 bg-primary rounded mx-auto mb-4" />
        <p className="text-muted-foreground max-w-lg mx-auto">
          Verified credentials that prove my commitment to continuous learning.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group glass rounded-xl p-6 hover:glow-border transition-all duration-300 relative overflow-hidden"
          >
            {/* Ribbon */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className="absolute top-3 -right-6 w-28 text-center rotate-45 bg-primary text-primary-foreground text-[10px] font-bold py-0.5">
                VERIFIED
              </div>
            </div>

            <Award className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-heading font-semibold text-sm mb-1">{cert.title}</h3>
            <p className="text-primary text-xs font-medium mb-2">{cert.org}</p>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3">{cert.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">{cert.date}</span>
              <button className="flex items-center gap-1 text-primary text-xs font-medium hover:underline">
                View <ExternalLink size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CertificatesSection;
