"use client";

import { useState } from "react";

interface UserData {
  id: number;
  username: string;
  points: number;
}

type TaskKey = "task1" | "task2"; // حدد مفاتيح المهام الممكنة

export default function Page() {
  const [userData, setUserData] = useState<UserData>({
    id: 1,
    username: "User",
    points: 0,
  });

  const [tasks, setTasks] = useState<Record<TaskKey, boolean>>({
    task1: false,
    task2: false,
  });

  const toggleTask = (taskKey: TaskKey) => {
    setTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
    if (!tasks[taskKey]) {
      // Add points only if the task was not previously completed
      setUserData((prev) => ({ ...prev, points: prev.points + 10 }));
    }
  };

  return (
    <main style={{ padding: "16px" }}>
      <h1>Welcome, {userData.username}</h1>
      <p>Points: {userData.points}</p>
      <div>
        <h2>Tasks</h2>
        <div>
          <span>Task 1</span>
          <button onClick={() => toggleTask("task1")}>
            {tasks.task1 ? "Completed" : "Start"}
          </button>
        </div>
        <div>
          <span>Task 2</span>
          <button onClick={() => toggleTask("task2")}>
            {tasks.task2 ? "Completed" : "Start"}
          </button>
        </div>
      </div>
    </main>
  );
}
