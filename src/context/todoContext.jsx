// context/todoContext.js
"use client";
import { createContext, useState, useCallback } from "react";
import {
  GetAllTasks,
  DeleteTask,
  CompleteTask,
  CreateTask,
} from "../utils/authixInit";
import toast from "react-hot-toast";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  // Add a task
  const addTodo = async (task) => {
    try {
      const created = await CreateTask(task);
      setTodoList((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a task
  const deleteTodo = async (taskId) => {
    try {
      await DeleteTask(taskId);
      setTodoList((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  // Complete a task
  const completeTodo = async (taskId) => {
    try {
      const updated = await CompleteTask(taskId);
      setTodoList((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...updated } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        addTodo,
        deleteTodo,
        completeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
