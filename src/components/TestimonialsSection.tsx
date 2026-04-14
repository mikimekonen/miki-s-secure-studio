import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Kasahun Asbo Yalew (MSc)",
    role: "Lecturer, Computer Science Department, Kombolcha Institute of Technology",
    text: "I am pleased to recommend Micheal Mekonen, a dedicated Computer Science graduate with strong academic background and practical experience in software development. He has demonstrated excellent skills in problem-solving, web development, and quickly adapting to new technologies.",
    rating: 5,
  },
  {
    name: "Mohammed Oumer",
    role: "Lecturer, Wollo University (Kombolcha Institute of Technology)",
    text: "I am writing to strongly recommend Micheal Mekonen Birke, a graduate student whom I have had the privilege of teaching and mentoring. I have closely worked with him during courses in Advanced Programming (Java) and Mobile Application Development, as well as supervising his course-based projects.",
    rating: 5,
  },
  {
    name: "Hussien Mekonnen Yimer (MSc)",
    role: "Department of Computer Science, Kombolcha Institute of Technology, Wollo University",
    text: "Across these subjects, Micheal Mekonen consistently demonstrated exceptional intellectual ability, a strong work ethic, and a genuine passion for understanding complex computing concepts. His performance was not only reflected in his outstanding grades but also in the quality of his projects. He showed active engagement during lectures and lab sessions.",
    rating: 5,
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
