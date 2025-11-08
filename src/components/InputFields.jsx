"use client";
import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import TodoContext from "../context/todoContext";
import toast from "react-hot-toast";
import { CreateTask } from "../utils/authixInit";

const InputFields = ({ Show, setShow }) => {
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

  // handle input changes
  const onChangeHandler = (e) => {
    setTodoInput({ ...todoInput, [e.target.name]: e.target.value });
  };

  // handle submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, desc, completeBy } = todoInput;
    if (!title.trim() || !desc.trim() || !completeBy) {
      toast.error("Please fill all fields including deadline");
      return;
    }

    // check expiration
    const now = new Date();
    const dueTime = new Date(completeBy);
    const expired = now > dueTime;

    try {
      // add task to context for real-time update
      addTodo(todoInput);

      toast.success(expired ? "Task added (already expired)" : "Task added!");

      // reset inputs
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
      console.error("Error adding task:", err);
      toast.error(err.message || "Failed to add task");
    }
  };

  return (
    <AnimatePresence>
      {Show && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShow(false)}
            className="fixed inset-0 z-999 bg-black/60 transition-opacity duration-200"
          />

          {/* Form Drawer */}
          <motion.form
            onSubmit={onSubmitHandler}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-1000 w-full lg:max-w-full max-w-md mx-auto 
                       bg-zinc-900 rounded-t-3xl border-t border-[#00ba0f]/40
                       shadow-[0_-2px_20px_rgba(0,186,15,0.2)] p-6 text-white"
          >
            {/* Header */}
            <div className="flex justify-center relative mb-3">
              <div className="w-12 h-1 rounded-full bg-[#00ba0f]/40" />
              <button
                type="button"
                onClick={() => setShow(false)}
                className="absolute right-0 -top-1 text-zinc-400 hover:text-[#00ba0f] transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Title */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold bg-linear-to-r from-[#00ba0f] to-lime-400 bg-clip-text text-transparent">
                Add New Task
              </h2>
              <p className="text-xs text-zinc-400">
                Set task details and deadlines below
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              {/* Title */}
              <input
                type="text"
                name="title"
                value={todoInput.title}
                onChange={onChangeHandler}
                placeholder="Enter title"
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 text-sm placeholder:text-zinc-500 
                           focus:outline-none focus:ring-1 focus:ring-[#00ba0f]/70 transition"
                required
              />

              {/* Description */}
              <textarea
                name="desc"
                value={todoInput.desc}
                onChange={onChangeHandler}
                placeholder="Enter description"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 text-sm placeholder:text-zinc-500 
                           resize-none focus:outline-none focus:ring-1 focus:ring-[#00ba0f]/70 transition"
                required
              />

              {/* Deadline */}
              <div className="flex flex-col text-sm text-zinc-400">
                <label className="mb-1">Complete By:</label>
                <input
                  type="datetime-local"
                  name="completeBy"
                  value={todoInput.completeBy}
                  onChange={onChangeHandler}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-[#00ba0f]/70 transition"
                  required
                />
              </div>

              {/* Priority + Category */}
              <div className="flex flex-col sm:flex-row gap-3 text-sm text-zinc-400">
                <div className="flex flex-col w-full">
                  <label className="mb-1">Priority:</label>
                  <select
                    name="priority"
                    value={todoInput.priority}
                    onChange={onChangeHandler}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-[#00ba0f]/70 transition"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label className="mb-1">Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={todoInput.category}
                    onChange={onChangeHandler}
                    placeholder="e.g., Work, Study"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-[#00ba0f]/70 transition"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-5 py-3 rounded-xl bg-linear-to-r from-[#00ba0f] to-lime-400 
                         text-black font-semibold text-sm hover:shadow-[0_0_15px_#00ba0f] transition-all"
            >
              Add Task
            </button>
          </motion.form>
        </>
      )}
    </AnimatePresence>
  );
};

export default InputFields;
