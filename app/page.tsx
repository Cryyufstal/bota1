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

// Define type for task keys
type TaskKey = "task1" | "task2" | "task3" | "task4" | "task5" | "task6" | "task7";

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tasks, setTasks] = useState({
    task1: { completed: false, label: "Be a good dog 🐶 (+10 points)" },
    task2: { completed: false, label: "Subscribe to DOGS channel (+10 points)" },
    task3: { completed: false, label: "Subscribe to Dogs X.com (+10 points)" },
    task4: { completed: false, label: "Invite 5 friends to DOGS (+10 points)" },
    task5: { completed: false, label: "Send 🦴 to Binance X.com (+10 points)" },
    task6: { completed: false, label: "Send 🦴 to OKX X.com (+10 points)" },
    task7: { completed: false, label: "Send 🦴 to Bybit X.com (+10 points)" },
  });
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  // Mark task as completed and add points
  const completeTask = (taskKey: TaskKey) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      delete updatedTasks[taskKey]; // Remove the completed task
      return updatedTasks;
    });
    setPoints((prevPoints) => prevPoints + 10); // Add 10 points
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
              <button onClick={() => completeTask(key as TaskKey)}>Check</button>
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
