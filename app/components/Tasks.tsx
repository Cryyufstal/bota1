"use client";

import { useState } from "react";

interface TasksProps {
  userData: {
    username: string;
    points: number;
  };
  setUserData: (newData: { username: string; points: number }) => void;
}

type TaskKey = "task1" | "task2";

export default function Tasks({ userData, setUserData }: TasksProps) {
  const [tasks, setTasks] = useState<Record<TaskKey, boolean>>({
    task1: false,
    task2: false,
  });

  const toggleTask = (taskKey: TaskKey) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev, [taskKey]: true };
      setUserData({ ...userData, points: userData.points + 10 }); // أضف 10 نقاط
      return updatedTasks;
    });
  };

  // عرض المهام غير المكتملة فقط
  const activeTasks = Object.entries(tasks).filter(([_, completed]) => !completed);

  return (
    <div style={{ padding: "16px" }}>
      <h1>Tasks</h1>
      <div style={{ marginBottom: "16px" }}>
        <strong>Username:</strong> {userData.username}
      </div>
      <div style={{ marginBottom: "16px" }}>
        <strong>Points:</strong> {userData.points}
      </div>
      {activeTasks.length > 0 ? (
        activeTasks.map(([key]) => (
          <div key={key} style={{ marginBottom: "8px" }}>
            <span>{key === "task1" ? "Task 1" : "Task 2"}</span>
            <button
              onClick={() => toggleTask(key as TaskKey)}
              style={{
                marginLeft: "8px",
                padding: "4px 8px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Complete
            </button>
          </div>
        ))
      ) : (
        <p>All tasks completed!</p>
      )}
    </div>
  );
}
