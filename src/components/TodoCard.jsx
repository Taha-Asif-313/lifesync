"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  CheckCircle2,
  Trash2,
  Timer,
  Flag,
  Tag,
  MoreVertical,
} from "lucide-react";
import TodoContext from "../context/todoContext";

const TodoCard = ({ Task }) => {
  const { title, desc, completed, completeBy, createdAt, priority, category } =
    Task;

  const { deleteTodo, completeTodo } = useContext(TodoContext);

  const [remaining, setRemaining] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const deleteScheduled = useRef(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const start = new Date(createdAt);
      const end = new Date(completeBy);
      const total = end - start;
      const elapsed = now - start;
      const diff = end - now;

      if (diff <= 0) {
        setRemaining("Expired");
        setIsExpired(true);
        setProgress(100);

        // ✅ Schedule delete only once
        if (!deleteScheduled.current) {
          deleteScheduled.current = true;
          setTimeout(() => deleteTodo(Task.id), 5000); // use context method
        }
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setRemaining(`${hours}h ${minutes}m ${seconds}s`);
        setProgress(Math.min((elapsed / total) * 100, 100));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [createdAt, completeBy, Task, deleteTodo]);

  // Priority Colors
  const priorityColors = {
    high: "text-red-600 border-red-600 bg-red-600/5",
    normal: "text-yellow-400 border-yellow-400/30 bg-yellow-500/10",
    low: "text-blue-600 border-blue-600/30 bg-blue-600/5",
  };

  // ✅ Handlers
  const handleComplete = async () => {
    try {
      await completeTodo(Task.id);
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(Task.id);
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li
      className={`group relative w-full border border-zinc-800 bg-linear-to-br from-zinc-950 via-black to-zinc-950
                  rounded-2xl px-5 py-5 flex flex-col gap-3 transition-all duration-500
                  hover:shadow-[0_0_25px_rgba(0,255,160,0.2)] hover:scale-[1.015]
                  ${
                    isExpired && !completed
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                  ${completed ? "border-primary/50" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3
          className={`text-base font-semibold leading-tight ${
            completed ? "text-primary/60 line-through" : "text-primary"
          }`}
        >
          {title}
        </h3>

        {/* Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-zinc-400 hover:text-primary transition p-1 rounded-md hover:bg-zinc-800/40"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-6 w-40 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg
                         flex flex-col text-sm overflow-hidden z-50 animate-in fade-in-50 slide-in-from-top-2"
            >
              {!completed && !isExpired && (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 transition-all"
                >
                  <CheckCircle2 size={16} /> Mark as Done
                </button>
              )}

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-snug ${
          completed ? "text-gray-500 line-through" : "text-gray-300"
        }`}
      >
        {desc}
      </p>

      {/* Category + Priority */}
      <div className="flex items-center gap-2 text-xs mt-1">
        {category && (
          <div className="flex items-center gap-1.5 border border-primary/30 text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md">
            <Tag size={11} />
            {category}
          </div>
        )}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-medium ${priorityColors[priority]}`}
        >
          <Flag size={11} /> {priority}
        </div>
      </div>

      {/* Remaining Time */}
      {!completed && (
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
          <Timer size={12} className="text-primary" />
          <span>
            {isExpired ? "⏰ Auto deleting soon..." : `Time Left: ${remaining}`}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      {!completed && !isExpired && (
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-linear-to-r from-primary via-lime-400 to-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Floating Status Badge */}
      <div
        className={`absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-medium border backdrop-blur-sm
          ${
            completed
              ? "bg-green-500/10 text-green-400 border-green-400/30"
              : isExpired
              ? "bg-red-500/10 text-red-400 border-red-400/30"
              : "bg-yellow-500/10 text-yellow-400 border-yellow-400/30"
          }`}
      >
        {completed ? "Completed" : isExpired ? "Expired" : "Pending"}
      </div>
    </li>
  );
};

export default TodoCard;
