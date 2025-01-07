"use client";

import { useState } from "react";

interface TasksProps {
  userData: {
    username: string;
    points: number;
  };
}

type TaskKey = "task1" | "task2";

export default function Tasks({ userData }: TasksProps) {
  const [tasks, setTasks] = useState<Record<TaskKey, boolean>>({
    task1: false,
    task2: false,
  });

  const toggleTask = (taskKey: TaskKey) => {
    setTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Tasks</h1>
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
  );
}
