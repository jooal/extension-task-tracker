import React, { createContext, useState, useEffect, useContext } from "react";

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Check if window object is available
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, []);

  useEffect(() => {
    // Check if window object is available
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = task => {
    const newTask = {
      ...task,
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, // Assign a unique index
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
