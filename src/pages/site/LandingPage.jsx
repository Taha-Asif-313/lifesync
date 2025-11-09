"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ListTodo,
  CheckCircle2,
  ClipboardList,
  NotebookPen,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  Clock,
  ShieldCheck,
  Heart,
} from "lucide-react";
import HeroSection from "../../components/site/HeroSection";

const LandingPage = () => {
  return (
    <main className="bg-[#0a0a0a] w-full text-white overflow-hidden">
      <HeroSection />

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-24 px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 bg-linear-to-r from-[#00ba0f] to-lime-400 bg-clip-text text-transparent"
        >
          Why LifeSync?
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Your mind deserves clarity. LifeSync brings productivity and peace
          together — manage, reflect, and grow every day.
        </p>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 lg:px-8 pb-24">
        {[
          {
            icon: ClipboardList,
            title: "Smart Task Planning",
            desc: "AI helps you break big goals into clear, actionable steps.",
          },
          {
            icon: Clock,
            title: "Time Intelligence",
            desc: "See where your hours go and optimize your routines effortlessly.",
          },
          {
            icon: Heart,
            title: "Mindful Productivity",
            desc: "Stay calm, balanced, and motivated while achieving more.",
          },
          {
            icon: ShieldCheck,
            title: "Privacy First",
            desc: "Your data stays secure — productivity should never cost peace.",
          },
          {
            icon: CheckCircle2,
            title: "Progress Insights",
            desc: "Track completion rates and daily habits with stunning visuals.",
          },
          {
            icon: NotebookPen,
            title: "Life Notes",
            desc: "Journal and capture reflections right alongside your tasks.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="p-8 bg-linear-to-br from-zinc-900/60 to-zinc-950 border border-zinc-800 rounded-2xl shadow-xl hover:shadow-[0_0_20px_rgba(0,255,160,0.08)]"
          >
            <item.icon className="w-10 h-10 text-[#00ba0f] mb-4" />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-24 bg-linear-to-br from-[#00ba0f]/10 via-black to-[#00ba0f]/10 text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Start Planning Smarter with{" "}
            <span className="text-[#00ba0f]">LifeSync</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Take charge of your time — one mindful task at a time.
          </p>
          <button className="px-8 py-4 rounded-2xl bg-linear-to-r from-[#00ba0f] to-lime-500 font-semibold shadow-xl hover:shadow-[#00ba0f]/30 transition-all duration-300">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 text-center text-gray-500 border-t border-zinc-800">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#00ba0f]">LifeSync</span>. All rights reserved.
      </footer>
    </main>
  );
};

export default LandingPage;
