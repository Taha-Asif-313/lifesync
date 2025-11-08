import React, { useState } from "react";
import InputFields from "./InputFields";
import { Plus } from "lucide-react";
import { ReactUserButton } from "@neuctra/authix";

const Navbar = () => {
  const [showInputBox, setShowInputBox] = useState(false);

  return (
    <>
      {/* Input Dialog Box */}
      <InputFields Show={showInputBox} setShow={setShowInputBox} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 backdrop-blur-md bg-black/60 border-b border-primary/25 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3">
          
          {/* Logo Section */}
          <div className="flex items-center gap-1">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src="/logo.png"
              alt="LifeSync Logo"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              Life
              <span className="text-primary">Sync</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Create Task Button */}
            <button
              onClick={() => setShowInputBox(true)}
              className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-primary text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <Plus size={20} />
              {/* Show text only on large screens */}
              <span className="hidden lg:inline">Create Task</span>
            </button>

            {/* User Profile */}
            <ReactUserButton primaryColor="var(--primary)" profileUrl="/profile" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
