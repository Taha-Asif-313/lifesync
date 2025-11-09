"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogIn, User } from "lucide-react";
import { motion } from "framer-motion";

const SiteNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 🔹 Only site/public pages
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // 🔸 Detect Scroll Position
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-black/90 border-zinc-800 shadow-lg backdrop-blur-md"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-2 lg:grid-cols-3 items-center justify-between">
        {/* 🔹 Logo */}
        <Link
          to="/"
          className="flex items-center font-black gap-2 text-xl tracking-tight transition-transform duration-200"
        >
          <img src="/logo.png" alt="Logo" height={34} width={34} />
          <span className="text-white">
            Life<span className="text-primary">Sync</span>
          </span>
        </Link>

        {/* 🔸 Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? "text-primary font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* 🔘 Right Side Controls */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-transparent text-white transition-all duration-200 hover:scale-105"
          >
            <LogIn size={16} />
            Login
          </Link>
          <Link
            to="/signup"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-linear-to-r from-primary to-lime-500 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-green-500/25"
          >
            <User size={16} />
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SiteNavbar;
