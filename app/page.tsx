"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import paws from "../images/paws.webp";

interface UserData {
  username: string;
  points: number;
}

interface Task {
  label: string;
  started: boolean;
  completed: boolean;
  points: number;
}

type TaskKey = "task1" | "task2" | "task3" | "task4";

export default function DogshousePage() {
  const [userData, setUserData] = useState<UserData>({
    username: "JohnDoe",
    points: 100,
  });

  const [tasks, setTasks] = useState<Record<TaskKey, Task>>({
    task1: { label: "Feed the Dog (+50 Points)", started: false, completed: false, points: 50 },
    task2: { label: "Walk the Dog (+100 Points)", started: false, completed: false, points: 100 },
    task3: { label: "Play with the Dog (+200 Points)", started: false, completed: false, points: 200 },
    task4: { label: "Adopt a Dog (+500 Points)", started: false, completed: false, points: 500 },
  });

  const handleTaskStart = (taskKey: TaskKey) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskKey]: { ...prevTasks[taskKey], started: true },
    }));
  };

  const handleTaskComplete = (taskKey: TaskKey) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskKey]: { ...prevTasks[taskKey], completed: true },
    }));
    setUserData((prevData) => ({
      ...prevData,
      points: prevData.points + tasks[taskKey].points,
    }));
  };

  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#333",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ fontSize: "1.5rem" }}>Dogshouse Bot</h1>
        <div>
          <span style={{ fontSize: "1rem", marginRight: "10px" }}>
            Points: <strong>{userData.points}</strong>
          </span>
          <Image src={paws} alt="Paws" width={40} height={40} />
        </div>
      </header>

      <section style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>Tasks</h2>
        {Object.entries(tasks).map(([key, task]) => (
          <div
            key={key}
            style={{
              backgroundColor: "#444",
              padding: "16px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{task.label}</span>
            {task.completed ? (
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Completed
              </button>
            ) : task.started ? (
              <button
                onClick={() => handleTaskComplete(key as TaskKey)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Complete
              </button>
            ) : (
              <button
                onClick={() => handleTaskStart(key as TaskKey)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#FFA500",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Start
              </button>
            )}
          </div>
        ))}
      </section>

      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#333",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0 }}>© 2025 Dogshouse Bot. All rights reserved.</p>
      </footer>
    </div>
  );
}
