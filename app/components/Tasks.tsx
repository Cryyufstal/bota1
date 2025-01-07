'use client';

import { useState, useEffect } from "react";

type Task = {
  completed: boolean;
  points: number;
};

type TasksProps = {
  userData: {
    username: string;
    points: number;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      username: string;
      points: number;
    }>
  >;
};

export default function Tasks({ userData, setUserData }: TasksProps) {
  const [tasks, setTasks] = useState<{ [key: string]: Task }>({
    task1: { completed: false, points: 10 },
    task2: { completed: false, points: 20 },
  });

  useEffect(() => {
    // التحقق من وجود localStorage
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const toggleTask = (taskKey: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskKey].completed = true;

      setUserData((prevData) => ({
        ...prevData,
        points: prevData.points + updatedTasks[taskKey].points,
      }));

      return updatedTasks;
    });
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {Object.entries(tasks).map(([key, task]) => (
          !task.completed && (
            <li key={key}>
              Task: {key}, Points: {task.points}
              <button
                onClick={() => toggleTask(key)}
                style={{ marginLeft: "10px" }}
              >
                Complete Task
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}
