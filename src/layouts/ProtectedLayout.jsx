import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navabar";

const ProtectedLayout = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Optional Background Glow or Design */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.15),transparent_60%)] pointer-events-none" />
      <Navbar />
      {/* Auth Container */}
      <div className="relative z-10 w-full pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
