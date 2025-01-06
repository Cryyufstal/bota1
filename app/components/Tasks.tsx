"use client";

import React, { useState } from "react";

interface TasksProps {
  tasks: { [key: string]: boolean };
  toggleTask: (taskKey: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, toggleTask }) => {
  const taskList = [
    { id: "task1", label: "Task 1 (+10 points)", link: "https://example.com" },
    { id: "task2", label: "Task 2 (+20 points)", link: "https://example.com" },
  ];

  return (
    <div style={{ padding: "16px" }}>
      {taskList.map((task) => (
        <div key={task.id} style={{ marginBottom: "8px" }}>
          <span>{task.label}</span>
          {tasks[task.id] ? (
            <button onClick={() => toggleTask(task.id)}>Check</button>
          ) : (
            <button
              onClick={() => {
                window.open(task.link, "_blank");
                toggleTask(task.id);
              }}
            >
              Start
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tasks;
