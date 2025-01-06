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
  started: boolean;
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
    task1: { label: "Be a good dog 🐶 (+50 DOGS)", url: "https://example.com/task1", started: false, completed: false },
    task2: { label: "Subscribe to DOGS channel (+100 DOGS)", url: "https://t.me/dogs_channel", started: false, completed: false },
    task3: { label: "Subscribe to Dogs X.com (+1000 DOGS)", url: "https://www.dogsx.com", started: false, completed: false },
    task4: { label: "Invite 5 friends to DOGS (+20000 DOGS)", url: "https://example.com/task4", started: false, completed: false },
    task5: { label: "Send 🦴 to Binance X.com (+100 DOGS)", url: "https://www.binance.com", started: false, completed: false },
    task6: { label: "Send 🦴 to OKX X.com (+100 DOGS)", url: "https://www.okx.com", started: false, completed: false },
    task7: { label: "Send 🦴 to Bybit X.com (+100 DOGS)", url: "https://www.bybit.com", started: false, completed: false },
  });
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedUserTasks = userData
      ? localStorage.getItem(`${userData.username}_tasks`)
      : null;
    const storedUserPoints = userData
      ? localStorage.getItem(`${userData.username}_points`)
      : null;

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    if (storedUserTasks) {
      setTasks(JSON.parse(storedUserTasks));
    }

    if (storedUserPoints) {
      setPoints(Number(storedUserPoints));
    }

    if (WebApp.initDataUnsafe?.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [userData]);

  const saveUserTasks = (updatedTasks: Tasks) => {
    if (userData) {
      localStorage.setItem(`${userData.username}_tasks`, JSON.stringify(updatedTasks));
    }
  };

  const saveUserPoints = (newPoints: number) => {
    if (userData) {
      localStorage.setItem(`${userData.username}_points`, newPoints.toString());
    }
  };

  const startTask = (taskKey: TaskKey) => {
    const task = tasks[taskKey];
    if (task.url) {
      window.open(task.url, "_blank");
    }
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskKey] = { ...updatedTasks[taskKey], started: true };
      saveUserTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const completeTask = (taskKey: TaskKey) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskKey] = { ...updatedTasks[taskKey], completed: true };
      saveUserTasks(updatedTasks);
      return updatedTasks;
    });

    setPoints((prevPoints) => {
      const newPoints = prevPoints + 10;
      saveUserPoints(newPoints);
      return newPoints;
    });
  };

  const activeTasks = Object.entries(tasks).filter(([_, task]) => !task.completed);

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

          {/* Render active tasks */}
          {activeTasks.length > 0 ? (
            activeTasks.map(([key, task]) => (
              <div className="task" key={key} style={{ marginBottom: "10px" }}>
                <span>{task.label}</span>
                {task.started ? (
                  <button onClick={() => completeTask(key as TaskKey)}>Check</button>
                ) : (
                  <button onClick={() => startTask(key as TaskKey)}>Start</button>
                )}
              </div>
            ))
          ) : (
            <p>All tasks completed!</p>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}

