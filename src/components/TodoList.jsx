"use client";
import React, { useContext, useState, useMemo, useEffect } from "react";
import { Search, ListTodo, Sparkles } from "lucide-react";
import TodoCard from "./TodoCard";
import TodoContext from "../context/todoContext";
import { GetAllTasks } from "../utils/authixInit";

const TodoList = () => {
  const { todoList, setTodoList, deleteTodo, completeTodo } =
    useContext(TodoContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await GetAllTasks();
      console.log(tasks);

      setTodoList(tasks);
    };
    fetchTasks();
  }, []);

  // Filtered Tasks
  const filteredTodos = useMemo(() => {
    return todoList?.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.category &&
          todo.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [todoList, searchQuery]);

  return (
    <div className="min-h-screen w-full px-5 py-20 bg-linear-to-b from-black to-zinc-950 text-white overflow-hidden">
      {/* Task List Section */}
      <div className="max-w-7xl mx-auto mt-16 relative">
        {filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <Sparkles size={42} className="text-primary mb-3" />
            {todoList.length === 0 ? (
              <>
                <h2 className="text-lg font-medium text-white">No tasks yet</h2>
                <p className="text-sm text-zinc-400">
                  Start by adding your first task to stay productive
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-medium text-zinc-400">
                  No matches found
                </h2>
                <p className="text-sm text-zinc-500">
                  Try refining your search or add a new task.
                </p>
              </>
            )}
          </div>
        ) : (
          <div
            className="relative flex flex-wrap justify-center items-center gap-10 mt-10
                       before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 
                       before:h-[3px] before:bg-linear-to-r from-primary/50 via-primary/10 to-transparent 
                       before:rounded-full before:-z-10 before:blur-[2px]"
          >
            {filteredTodos.map((task, index) => (
              <div
                key={index}
                className="relative shrink-0 w-80 group transition-all"
              >
                {/* ✨ Shining Connector Line to Next Card */}
                {index !== filteredTodos.length - 1 && (
                  <span
                    className="absolute right-[-45px] top-1/2 w-[50px] h-[3px] rounded-full 
               bg-linear-to-r from-primary via-lime-500 to-primary
               animate-shine"
                  ></span>
                )}

                <TodoCard
                  Task={task}
                  CompleteTodo={completeTodo}
                  DeleteTodo={deleteTodo}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
