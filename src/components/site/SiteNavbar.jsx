"use client";

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogIn, User, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../../context/authContext";

const SiteNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { isLogin } = useContext(AuthContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-black/90 border-zinc-800 shadow-lg backdrop-blur-md"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center font-black gap-2 text-xl tracking-tight transition-transform duration-200"
          >
            <img src="/logo.png" alt="Logo" height={34} width={34} />
            <span className="text-white">
              Lyfe<span className="text-primary">Sync</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* Desktop Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isLogin ? (
              <Link
                to={"/tasks"}
                className="text-sm hover:text-primary flex items-center gap-2"
              >
                Go to tasks <ArrowRight size={18} />
              </Link>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center p-2 text-white"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-zinc-950 text-white z-50 p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b-2 pb-4 mb-4 border-primary">
                {/* Logo */}
                <Link
                  to="/"
                  className="flex items-center font-black gap-2 text-xl tracking-tight transition-transform duration-200"
                >
                  <img src="/logo.png" alt="Logo" height={34} width={34} />
                  <span className="text-white">
                    Lyfe<span className="text-primary">Sync</span>
                  </span>
                </Link>
                <button onClick={() => setDrawerOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6 mb-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`text-lg font-medium transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <Link
                  to="/login"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-transparent text-white transition-all duration-200 hover:scale-105"
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-linear-to-r from-primary to-lime-500 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  <User size={16} />
                  Sign Up
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteNavbar;
