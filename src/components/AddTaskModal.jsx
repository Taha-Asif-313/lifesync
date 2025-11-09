"use client";

import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import TodoContext from "../context/todoContext";
import toast from "react-hot-toast";

const AddTaskModal = ({ Show, setShow }) => {
  const { addTodo } = useContext(TodoContext);

  const [todoInput, setTodoInput] = useState({
    title: "",
    desc: "",
    completed: false,
    expired: false,
    priority: "normal",
    category: "",
    createdAt: new Date().toISOString(),
    completeBy: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const onChangeHandler = (e) => {
    setTodoInput({ ...todoInput, [e.target.name]: e.target.value });
  };

  const handleDateSelect = (dateStr) => {
    const currentTime = todoInput.completeBy.split("T")[1] || "00:00";
    setTodoInput({ ...todoInput, completeBy: `${dateStr}T${currentTime}` });
    setShowDatePicker(false);
  };

  const handleTimeSelect = (timeStr) => {
    const currentDate =
      todoInput.completeBy.split("T")[0] || new Date().toISOString().split("T")[0];
    setTodoInput({ ...todoInput, completeBy: `${currentDate}T${timeStr}` });
    setShowTimePicker(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { title, desc, completeBy } = todoInput;
    if (!title.trim() || !desc.trim() || !completeBy) {
      toast.error("Please fill all fields including deadline");
      return;
    }
    const now = new Date();
    const due = new Date(completeBy);
    const expired = now > due;

    try {
      addTodo(todoInput);
      toast.success(expired ? "Task added (already expired)" : "Task added!");
      setTodoInput({
        title: "",
        desc: "",
        completed: false,
        expired: false,
        priority: "normal",
        category: "",
        createdAt: new Date().toISOString(),
        completeBy: "",
      });
      setShow(false);
    } catch (err) {
      toast.error(err.message || "Failed to add task");
    }
  };

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + weekOffset * 7);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.toISOString().split("T")[0],
      label: `${date.getDate()} ${date.toLocaleDateString("en-US", {
        month: "short",
      })}`,
    };
  });

  const times = Array.from({ length: 24 * 2 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    return {
      value: `${String(hours).padStart(2, "0")}:${minutes}`,
      label: `${displayHour}:${minutes} ${ampm}`,
    };
  });

  return (
    <AnimatePresence>
      {Show && (
        <>
          {/* Overlay */}
          <motion.div
            onClick={() => setShow(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Drawer */}
          <motion.form
            onSubmit={onSubmitHandler}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-1000 w-full max-w-md mx-auto
                       bg-zinc-950/95 rounded-t-3xl border-t-2 border-primary p-6 text-white shadow-lg"
          >
            {/* Header */}
            <div className="flex justify-center relative mb-6">
              <div className="w-14 h-1 rounded-full bg-primary/50" />
              <button
                type="button"
                onClick={() => setShow(false)}
                className="absolute right-0 -top-1 text-zinc-400 hover:text-primary transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Title */}
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bold text-primary">Add New Task</h2>
              <p className="text-sm text-zinc-400">Keep track of your tasks easily</p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={todoInput.title}
                onChange={onChangeHandler}
                placeholder="Task Title"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800
                           focus:border-primary text-sm placeholder:text-zinc-500 outline-none"
              />
              <textarea
                name="desc"
                value={todoInput.desc}
                onChange={onChangeHandler}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800
                           focus:border-primary text-sm placeholder:text-zinc-500 resize-none outline-none"
              />

              {/* Date & Time Pickers */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {/* Date Picker */}
                <div className="relative">
                  <div
                    onClick={() => setShowDatePicker((p) => !p)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-primary transition"
                  >
                    <Calendar size={18} className="text-primary" />
                    <span>{todoInput.completeBy ? new Date(todoInput.completeBy).toLocaleDateString() : "Pick Date"}</span>
                  </div>
                  <AnimatePresence>
                    {showDatePicker && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-1 w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 shadow-lg z-10"
                      >
                        <div className="grid lg:grid-cols-2 max-h-24 overflow-auto grid-cols-4 gap-2 text-center text-sm mb-2">
                          {next7Days.map((d) => (
                            <button
                              key={d.date}
                              onClick={() => handleDateSelect(d.date)}
                              type="button"
                              className="p-2 rounded-lg bg-zinc-800 hover:bg-primary/20 transition-colors"
                            >
                              <div className="text-xs text-zinc-400">{d.day}</div>
                              <div className="font-medium text-white">{d.label}</div>
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-primary">
                          <button
                            type="button"
                            onClick={() => setWeekOffset((p) => p - 1)}
                            className="flex items-center gap-1 hover:text-lime-400 transition"
                          >
                            <ChevronLeft size={14} /> Prev
                          </button>
                          <button
                            type="button"
                            onClick={() => setWeekOffset((p) => p + 1)}
                            className="flex items-center gap-1 hover:text-lime-400 transition"
                          >
                            Next <ChevronRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time Picker */}
                <div className="relative">
                  <div
                    onClick={() => setShowTimePicker((p) => !p)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-primary transition"
                  >
                    <Clock size={18} className="text-primary" />
                    <span>{todoInput.completeBy ? new Date(todoInput.completeBy).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) : "Pick Time"}</span>
                  </div>
                  <AnimatePresence>
                    {showTimePicker && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-1 w-full max-h-24 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg z-10"
                      >
                        {times.map((t) => (
                          <button
                            key={t.value}
                            onClick={() => handleTimeSelect(t.value)}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-primary/20 text-sm text-zinc-300"
                          >
                            {t.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Priority & Category */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {/* Priority */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Priority</label>
                  <div className="flex justify-between">
                    {["low", "normal", "high"].map((level) => {
                      const colors = {
                        low: "text-green-400 bg-green-500/10 border-green-500/30",
                        normal: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
                        high: "text-red-400 bg-red-500/10 border-red-500/30",
                      };
                      const isActive = todoInput.priority === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setTodoInput({ ...todoInput, priority: level })}
                          className={`flex-1 text-xs font-medium capitalize py-2 rounded-md mx-0.5 transition-all border ${
                            isActive ? colors[level] : "text-zinc-400 border-transparent hover:border-primary/40 hover:text-primary"
                          }`}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={todoInput.category}
                    onChange={onChangeHandler}
                    placeholder="e.g. Work"
                    className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm focus:border-primary/60 placeholder:text-zinc-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 rounded-xl bg-linear-to-r from-primary to-lime-400
                         font-semibold text-sm hover:shadow-[0_0_15px_#00ba0f] transition-all"
            >
              Add Task
            </button>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
