import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Github, Send, User, MessageSquare, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { sendForm } from "@emailjs/browser";

// ─── EMAILJS CONFIG ─────────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free — 200 emails/month)
// 2. Email Services → Add New Service → Gmail → connect mikimekonen9@gmail.com
// 3. Email Templates → Create Template with variables:
//      {{from_name}}, {{from_email}}, {{message}}
//    Set "To Email" to: mikimekonen9@gmail.com
//    Set "Reply To" to: {{from_email}}
// 4. Account → API Keys → copy your Public Key
const EMAILJS_SERVICE_ID  = "service_ffg1y8h";
const EMAILJS_TEMPLATE_ID = "template_0wr9lqj";
const EMAILJS_PUBLIC_KEY  = "PgiaxKMhybPJi-wvD";
// ────────────────────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(f: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!f.name.trim()) errors.name = "Name is required.";
  if (!f.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(f.email)) errors.email = "Enter a valid email address.";
  if (!f.message.trim()) errors.message = "Message cannot be empty.";
  else if (f.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

const inputBase =
  "w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none transition-all duration-300 focus:border-primary/60 focus:bg-primary/5 focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)]";

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormFields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorDetail, setErrorDetail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear inline error as user types
    setErrors((prev) => { const next = { ...prev }; delete next[name as keyof FormErrors]; return next; });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || status === "loading") return;

    // ── Client-side validation ──
    const fieldErrors = validateForm(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setErrorDetail("");
    setStatus("loading");

    console.log("[EmailJS] Sending form...", {
      service: EMAILJS_SERVICE_ID,
      template: EMAILJS_TEMPLATE_ID,
      fields: { name: form.name, email: form.email, message: `${form.message.slice(0, 30)}...` },
    });

    sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
      publicKey: EMAILJS_PUBLIC_KEY,
    }).then((response) => {
      console.log("[EmailJS] ✅ Success!", response.status, response.text);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    }).catch((err: unknown) => {
      console.error("[EmailJS] ❌ Failed:", err);
      const error = err as { text?: string; status?: number };
      setErrorDetail(`Send failed (${error.status ?? "unknown"}): ${error.text ?? "Please try again or email directly."}`);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 7000);
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mikimekonen9@gmail.com",
      href: "mailto:mikimekonen9@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+251 907 253 401",
      href: "tel:+251907253401",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/mikimekonen",
      href: "https://github.com/mikimekonen",
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
            <Mail size={12} /> Let's Connect
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded mx-auto mb-5 opacity-80" />
          <p className="text-muted-foreground/80 max-w-lg mx-auto text-lg font-light">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* ─── Contact Info ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="glass rounded-2xl p-6 border border-white/10 mb-6">
              <h3 className="font-heading font-semibold text-foreground mb-1">Micheal Mekonen</h3>
              <p className="text-sm text-muted-foreground/70 font-light">
                Full Stack Developer & Cybersecurity Specialist based in Ethiopia.
                Open to freelance work and exciting collaborations.
              </p>
            </div>

            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.label === "GitHub" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 glass rounded-xl p-4 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground/60 uppercase tracking-wider">{info.label}</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Availability badge */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <p className="text-sm text-emerald-400 font-medium">Available for new projects</p>
            </div>
          </motion.div>

          {/* ─── Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <div className="glass rounded-2xl border border-white/10 p-7 md:p-9 relative overflow-hidden shadow-2xl shadow-black/20">
              {/* Decorative inner glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">

                {/* Name */}
                <div className="space-y-1.5">
                  <div className="relative">
                    <User
                      size={15}
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? "text-red-400" : focused === "name" ? "text-primary" : "text-muted-foreground/40"}`}
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      maxLength={100}
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} ${errors.name ? "border-red-500/50 focus:border-red-500/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : ""}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-400 pl-1 flex items-center gap-1">
                      <XCircle size={11} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <div className="relative">
                    <Mail
                      size={15}
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? "text-red-400" : focused === "email" ? "text-primary" : "text-muted-foreground/40"}`}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      maxLength={255}
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} ${errors.email ? "border-red-500/50 focus:border-red-500/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : ""}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 pl-1 flex items-center gap-1">
                      <XCircle size={11} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <div className="relative">
                    <MessageSquare
                      size={15}
                      className={`absolute left-3.5 top-4 transition-colors ${errors.message ? "text-red-400" : focused === "message" ? "text-primary" : "text-muted-foreground/40"}`}
                    />
                    <textarea
                      name="message"
                      placeholder="Your Message (min. 10 characters)"
                      maxLength={1000}
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} resize-none pl-11 ${errors.message ? "border-red-500/50 focus:border-red-500/60 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : ""}`}
                    />
                    <div className="flex justify-between items-center mt-1 px-1">
                      {errors.message ? (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                          <XCircle size={11} /> {errors.message}
                        </p>
                      ) : <span />}
                      <p className={`text-[11px] text-right ${form.message.length > 900 ? "text-yellow-400" : "text-muted-foreground/40"}`}>
                        {form.message.length}/1000
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:brightness-110 transition-all duration-300 glow-box disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Feedback Toast */}
                <AnimatePresence>
                  {(status === "success" || status === "error") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.35 }}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
                        status === "success"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-red-500/10 border-red-500/30 text-red-400"
                      }`}
                    >
                      {status === "success" ? (
                        <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle size={18} className="flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold mb-0.5">
                          {status === "success" ? "Message sent!" : "Failed to send"}
                        </p>
                        <p className="text-xs opacity-80 font-normal">
                          {status === "success"
                            ? "I'll get back to you at the provided email shortly."
                            : errorDetail || "Please try again or reach me directly at mikimekonen9@gmail.com"}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
