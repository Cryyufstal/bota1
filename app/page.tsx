"use client";

import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Referrals from "./components/Referrals";


export default function Page() {
  const [activeTab, setActiveTab] = useState("home");
  const [userData, setUserData] = useState({ username: "User", points: 0 });
  const [tasks, setTasks] = useState({
    task1: false,
    task2: false,
  });

  useEffect(() => {
    // Example user data initialization
    const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
    if (storedUserData.username) setUserData(storedUserData);
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [userData, tasks]);

  const toggleTask = (taskKey: string) => {
    setTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
    if (!tasks[taskKey]) {
      setUserData((prev) => ({ ...prev, points: prev.points + 10 }));
    }
  };

  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "space-around", padding: "8px", background: "#eee" }}>
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("tasks")}>Tasks</button>
        <button onClick={() => setActiveTab("referrals")}>Referrals</button>
      </nav>
      <div style={{ padding: "16px" }}>
        {activeTab === "home" && <Home userData={userData} />}
        {activeTab === "tasks" && <Tasks tasks={tasks} toggleTask={toggleTask} />}
        {activeTab === "referrals" && <Referrals userId={12345} />}
      </div>
    </div>
  );
}
