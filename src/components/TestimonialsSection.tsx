import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Abebe Tadesse",
    role: "CEO, TechEthiopia",
    text: "Miki delivered an outstanding Learning Management System that exceeded our expectations. His attention to detail and security-first approach made the project a huge success.",
    rating: 5,
  },
  {
    name: "Sara Mohammed",
    role: "Project Manager, EduSoft",
    text: "Working with Miki was a fantastic experience. He built our school management platform with clean code, intuitive UI, and delivered ahead of schedule.",
    rating: 5,
  },
  {
    name: "Daniel Bekele",
    role: "Founder, DataHealth AI",
    text: "Miki's work on our Breast Cancer Detection ML project was impressive. He combined strong technical skills with a deep understanding of the problem domain.",
    rating: 5,
  },
  {
    name: "Hana Girma",
    role: "Freelance Designer",
    text: "I've collaborated with Miki on multiple web projects. His React expertise and eye for modern design always result in pixel-perfect, performant applications.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % testimonials.length), []);
  const prev = () => setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            What people say about working with me.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="glass rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center text-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote className="w-10 h-10 text-primary/30 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}
                    />
                  ))}
                </div>

                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-border transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} className="text-foreground" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:glow-border transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
