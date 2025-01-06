import { useState } from "react";

export default function Tasks({ userData }: { userData: { username: string; points: number } }) {
  const [tasks, setTasks] = useState({ task1: false, task2: false });

  const toggleTask = (taskKey: "task1" | "task2") => {
    setTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <div className="task mb-4">
        <span>Complete Task 1 (+10 points)</span>
        <button
          onClick={() => toggleTask("task1")}
          className={`ml-4 px-4 py-2 rounded ${
            tasks.task1 ? "bg-green-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {tasks.task1 ? "Checked" : "Start"}
        </button>
      </div>
      <div className="task mb-4">
        <span>Complete Task 2 (+10 points)</span>
        <button
          onClick={() => toggleTask("task2")}
          className={`ml-4 px-4 py-2 rounded ${
            tasks.task2 ? "bg-green-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {tasks.task2 ? "Checked" : "Start"}
        </button>
      </div>
    </div>
  );
}
