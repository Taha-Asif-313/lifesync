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
} from "lucide-react";

const HeroSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* linear Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-[#00ba0f]/20 via-emerald-700/10 to-black" />

      {/* Floating Glow Effects */}
      {!reduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00ba0f]/10 rounded-full blur-3xl will-change-transform"
            animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-lime-500/10 rounded-full blur-2xl will-change-transform"
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Floating Icons */}
      {!reduceMotion && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{ y: [0, -25, 0] }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              style={{
                left: `${25 + i * 15}%`,
                top: `${15 + i * 20}%`,
              }}
            >
              {i % 4 === 0 && (
                <ListTodo className="text-[#00ba0f]/15 w-7 h-7" />
              )}
              {i % 4 === 1 && (
                <CheckCircle2 className="text-lime-400/15 w-7 h-7" />
              )}
              {i % 4 === 2 && (
                <ClipboardList className="text-emerald-400/15 w-7 h-7" />
              )}
              {i % 4 === 3 && (
                <NotebookPen className="text-green-400/15 w-7 h-7" />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left space-y-2"
        >
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#00ba0f]/10 to-emerald-600/10 border border-[#00ba0f]/30 rounded-full px-4 py-2 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#00ba0f]" />
            <span className="text-sm font-medium text-[#00ba0f]">
              Smart Task Evolution
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
            <span className="bg-linear-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
              Design Your Day,
            </span>
            <br />
            <span className="bg-linear-to-r from-[#00ba0f] via-lime-400 to-[#00ba0f] bg-clip-text text-transparent">
              Design Your Life
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
            LifeSync helps you bring structure, focus, and calm to your daily
            flow — powered by AI, inspired by mindfulness.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {[
              { icon: Zap, text: "Fast & Fluid", color: "text-yellow-400" },
              { icon: Target, text: "Goal Tracking", color: "text-[#00ba0f]" },
              { icon: Sparkles, text: "AI Enhanced", color: "text-lime-400" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-medium text-gray-200">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <button className="group relative px-8 py-4 rounded-2xl bg-linear-to-r from-[#00ba0f] to-lime-500 font-semibold shadow-xl hover:shadow-[#00ba0f]/25 transition-all duration-300">
              <span className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>

            <button className="group px-8 py-4 rounded-2xl border border-[#00ba0f]/40 bg-[#00ba0f]/10 text-[#00ba0f] font-semibold hover:bg-[#00ba0f]/20 transition-all duration-300 backdrop-blur-sm">
              <span className="flex items-center gap-2">
                Watch Demo
                <div className="w-2 h-2 bg-[#00ba0f] rounded-full animate-pulse" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Hero Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center lg:justify-center mt-12 lg:mt-0"
        >
     
            <img
              src="/logo.png"
              height={400}
              width={400}
            />
          
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!reduceMotion && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-[#00ba0f]/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#00ba0f] rounded-full mt-2"
          />
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
