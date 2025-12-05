import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ReactUserButton } from "@neuctra/authix";
import { Link } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";

const Navbar = () => {
  const [showInputBox, setShowInputBox] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 🧩 Input Dialog Box */}
      <AddTaskModal Show={showInputBox} setShow={setShowInputBox} />

      {/* 🌐 Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-30 backdrop-blur-md ${
          scrolled ? "bg-black/70" : "bg-transparent"
        } shadow-md transition-all duration-300`}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
          {/* 🔹 Logo */}
          <Link
            to="/"
            className="flex items-center font-black gap-2 text-xl tracking-tight transition-transform duration-200"
          >
            <img src="/logo.png" alt="Logo" height={34} width={34} />
            <span className="text-white">
              Lyfe<span className="text-primary">Sync</span>
            </span>
          </Link>

          {/* 🔸 Actions Section */}
          <div className="flex items-center gap-4">
            {/* ➕ Create Task Button */}
            <button
              onClick={() => setShowInputBox(true)}
              className="group flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary/90 hover:bg-primary p-2 lg:px-4 lg:py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/30 active:scale-95"
            >
              {/* Icon - visible always */}
              <Plus className="transition-transform h-5 w-5 duration-300 group-hover:rotate-90" />

              {/* Text - only visible on large screens */}
              <span className="hidden lg:inline">Create Task</span>
            </button>

            {/* 👤 User Profile Button */}
            <ReactUserButton
              primaryColor="var(--primary)"
              profileUrl="/profile"
              onLogout={() => {
                localStorage.removeItem("userInfo");
                window.location.reload();
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
