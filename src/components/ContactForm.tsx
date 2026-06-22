"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactFormProps {
  delay?: number;
}

export default function ContactForm({ delay = 1.2 }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }}
      className="pointer-events-auto select-text w-full max-w-lg bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_12px_48px_0_rgba(0,0,0,0.4)] hover:border-white/20 transition-colors duration-300"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-white/50 uppercase tracking-wider mb-2 font-montserrat">
            Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#8849a6] focus:ring-1 focus:ring-[#8849a6] transition-all font-sans text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white/50 uppercase tracking-wider mb-2 font-montserrat">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#8849a6] focus:ring-1 focus:ring-[#8849a6] transition-all font-sans text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white/50 uppercase tracking-wider mb-2 font-montserrat">
            Message
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your project"
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#8849a6] focus:ring-1 focus:ring-[#8849a6] transition-all font-sans text-base resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex-1 py-4 px-5 rounded-2xl border border-white/20 text-white font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-[0.98] disabled:opacity-50 cursor-pointer font-montserrat"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {status === "sending" ? "sending..." : status === "success" ? "sent!" : "send message"}
          </button>

          <button
            type="button"
            className="flex-1 py-4 px-5 rounded-2xl border border-white/20 text-white font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-[0.98] cursor-pointer font-montserrat"
            style={{ fontFamily: "var(--font-montserrat)" }}
            onClick={() => window.open("https://calendly.com/clixs-works/free-consultation-call?month=2026-06", "_blank")}
          >
            book free call
          </button>
        </div>

        {status === "success" && (
          <p className="text-emerald-400 text-sm text-center mt-2 font-medium">
            Thank you! Your message has been sent successfully.
          </p>
        )}
      </form>
    </motion.div>
  );
}
