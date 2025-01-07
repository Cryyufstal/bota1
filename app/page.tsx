"use client";

import WebApp from "@twa-dev/sdk";
import Image from "next/image";
import { useEffect, useState } from "react";
import paws from '..//images/paws.webp';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

interface Task {
  label: string;
  url: string;
  started: boolean;
  completed: boolean;
}

type TaskKey = "task1" | "task2" | "task3" | "task4" | "task5" | "task6" | "task7" | "task8" | "task9";

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tasks, setTasks] = useState<Record<TaskKey, Task>>({
    task1: { label: "Be a good mi ma moncky (+50 DOGS)", url: "https://example1.com/task1", started: false, completed: false },
    task2: { label: "Subscribe to DOGS channel (+100 DOGS)", url: "https://t.me/dogs_channel", started: false, completed: false },
    task3: { label: "Subscribe to Dogs X.com (+1000 DOGS)", url: "https://www.dogsx.com", started: false, completed: false },
    task4: { label: "Invite 5 friends to DOGS (+20000 DOGS)", url: "https://example.com/task4", started: false, completed: false },
    task5: { label: "Send 🦴 to Binance X.com (+100 DOGS)", url: "https://www.binance.com", started: false, completed: false },
    task6: { label: "Send 🦴 to OKX X.com (+100 DOGS)", url: "https://www.okx.com", started: false, completed: false },
    task7: { label: "Send 🦴 to Bybit X.com (+100 DOGS)", url: "https://www.bybit.com", started: false, completed: false },
    task8: { label: "moy", url: "https://www.okx.com", started: false, completed: false },
    task9: { label: "ggood", url: "https://www.bybit.com", started: false, completed: false },
  });
  const [points, setPoints] = useState(0);
  const [copied, setCopied] = useState(false);

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

    const urlParams = new URLSearchParams(window.location.search);
    const referrerId = urlParams.get("ref");

    if (referrerId && userData?.id) {
      handleReferral(referrerId);
    }
  }, [userData]);

  const saveUserTasks = (updatedTasks: Record<TaskKey, Task>) => {
    if (userData) {
      localStorage.setItem(`${userData.username}_tasks`, JSON.stringify(updatedTasks));
    }
  };

  const saveUserPoints = (newPoints: number) => {
    if (userData) {
      localStorage.setItem(`${userData.username}_points`, newPoints.toString());
    }
  };

  const handleReferral = (referrerId: string) => {
    const referredUsers = JSON.parse(localStorage.getItem("referredUsers") || "{}");

    if (!referredUsers[referrerId]?.includes(userData!.id)) {
      if (!referredUsers[referrerId]) {
        referredUsers[referrerId] = [];
      }
      referredUsers[referrerId].push(userData!.id);
      localStorage.setItem("referredUsers", JSON.stringify(referredUsers));

      const referrerPoints = parseInt(localStorage.getItem(`${referrerId}_points`) || "0", 10);
      localStorage.setItem(`${referrerId}_points`, (referrerPoints + 10).toString());
    }
  };

  const copyReferralLink = () => {
    if (userData) {
      const referralLink = `https://t.me/monton_bot/ref${userData.id}`;
      navigator.clipboard.writeText(referralLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const activeTasks = Object.entries(tasks).filter(([_, task]) => !task.completed);

  return (
    <main style={{ padding: "20px", backgroundColor: "#1f1f1f", color: "#fff", fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
      {userData ? (
        <>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Welcome, {userData.username}</h1>
          <div style={{ padding: "20px", backgroundColor: "#333", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
       <Image
       src={paws}
       alt="Paws"
       width={171}
       height={132}
/>
          </div>

          <div style={{ padding: "20px", backgroundColor: "#444", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Points: {points}</span>
          </div>


          {copied && <div style={{ color: "lime", marginTop: "5px" }}>Copied</div>}

          {activeTasks.map(([key, task]) => (
            <div key={key} style={{ marginBottom: "15px", padding: "12px", backgroundColor: "#555", borderRadius: "6px" }}>
              <span>{task.label}</span>
              <button
                onClick={() => task.started ? alert('Task Completed') : alert('Start Task')}
                style={{
                  marginLeft: "10px",
                  padding: "8px 16px",
                  backgroundColor: task.started ? "#007BFF" : "#FFA500",
                  color: "white",
                  borderRadius: "4px",
                  border: "none"
                }}
              >
                {task.started ? "Check" : "Start"}
              </button>
                          
          </div>
                                  <div style={{ margin: "10px 0" }}>
            <button
              onClick={copyReferralLink}
              style={{ backgroundColor: "#4CAF50", color: "white", padding: "12px 24px", borderRadius: "4px", border: "none", fontSize: "1rem" }}
            >
              Invite Friends
            </button>
            </div>
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
