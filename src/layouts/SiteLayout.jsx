import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ListTodo, User, LogIn, Sparkles } from "lucide-react";
import SiteNavbar from "../components/site/SiteNavbar";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Tasks", path: "/tasks" },
  { name: "Profile", path: "/profile" },
];

const SiteLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center text-white overflow-hidden">
      <SiteNavbar />

      {/* 📄 Page Content */}
      <main className="relative z-10 w-full">
        <Outlet />
      </main>

      {/* ⚡ Floating To-Do Icon */}
      <motion.div
        className="fixed bottom-6 right-6 bg-green-500 text-black p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
        whileHover={{ rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <ListTodo size={22} />
      </motion.div>
    </div>
  );
};

export default SiteLayout;
