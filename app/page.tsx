"use client";

import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

// Define the interface for a single task
interface Task {
  label: string;
  url: string;
  completed: boolean;
}

// Define the type for all tasks
type Tasks = {
  [key in TaskKey]: Task;
};

// Define task keys
type TaskKey = "task1" | "task2" | "task3" | "task4" | "task5" | "task6" | "task7";

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tasks, setTasks] = useState<Tasks>({
    task1: { label: "Be a good dog 🐶 (+50 DOGS)", url: "https://example.com/task1", completed: false },
    task2: { label: "Subscribe to DOGS channel (+100 DOGS)", url: "https://t.me/dogs_channel", completed: false },
    task3: { label: "Subscribe to Dogs X.com (+1000 DOGS)", url: "https://www.dogsx.com", completed: false },
    task4: { label: "Invite 5 friends to DOGS (+20000 DOGS)", url: "https://example.com/task4", completed: false },
    task5: { label: "Send 🦴 to Binance X.com (+100 DOGS)", url: "https://www.binance.com", completed: false },
    task6: { label: "Send 🦴 to OKX X.com (+100 DOGS)", url: "https://www.okx.com", completed: false },
    task7: { label: "Send 🦴 to Bybit X.com (+100 DOGS)", url: "https://www.bybit.com", completed: false },
  });
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedUserData = localStorage.getItem("userData");
    const storedPoints = localStorage.getItem("points");
    const storedTasks = localStorage.getItem("tasks");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    if (storedPoints) {
      setPoints(Number(storedPoints));
    }

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Set tasks from localStorage
    }

    if (WebApp.initDataUnsafe?.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);
      localStorage.setItem("userData", JSON.stringify(user)); // Store user data in localStorage
    }
  }, []);

  // Mark task as completed and add points
  const completeTask = (taskKey: TaskKey) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskKey] = { ...updatedTasks[taskKey], completed: true }; // Mark task as completed
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Store tasks in localStorage
      return updatedTasks;
    });

    setPoints((prevPoints) => {
      const newPoints = prevPoints + 10; // Add 10 points
      localStorage.setItem("points", newPoints.toString()); // Store points in localStorage
      return newPoints;
    });
  };

  // Handle task start action, open link and change button text
  const startTask = (taskKey: TaskKey) => {
    const task = tasks[taskKey];
    if (task.url) {
      window.open(task.url, "_blank"); // Open the link
      setTasks((prevTasks) => ({
        ...prevTasks,
        [taskKey]: { ...prevTasks[taskKey], completed: true }, // Mark task as completed
      }));
    }
  };

  return (
    <main style={{ padding: "16px", backgroundColor: "black", color: "blue" }}>
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Free Style Bot</h1>
          <ul>
            <li>Hello: {userData.username}</li>
          </ul>
          <div style={{ margin: "20px 0" }}>
            <Image
              src="/images/paws.png"
              alt="Paws"
              width={171}
              height={132}
              className="mb-4"
            />
          </div>

          {/* Display points */}
          <div style={{ margin: "10px 0", fontSize: "18px", fontWeight: "bold" }}>
            Points: {points}
          </div>

          {/* Render tasks */}
          {Object.entries(tasks).map(([key, task]) => (
            <div className="task" key={key} style={{ marginBottom: "10px" }}>
              <span>{task.label}</span>
              {task.completed ? (
                <button onClick={() => completeTask(key as TaskKey)}>Check</button>
              ) : (
                <button onClick={() => startTask(key as TaskKey)}>Start</button>
              )}
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
