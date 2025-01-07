'use client';

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

// Define the interface for tasks
interface Task {
  label: string;
  url: string;
  started: boolean;
  completed: boolean;
}

// Type for task keys
type TaskKey = "task1" | "task2" | "task3" | "task4" | "task5" | "task6" | "task7";

// Define the main component
export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tasks, setTasks] = useState<Record<TaskKey, Task>>({
    task1: { label: "Be a good dog ?? (+50 DOGS)", url: "https://example.com/task1", started: false, completed: false },
    task2: { label: "Subscribe to DOGS channel (+100 DOGS)", url: "https://t.me/dogs_channel", started: false, completed: false },
    task3: { label: "Subscribe to Dogs X.com (+1000 DOGS)", url: "https://www.dogsx.com", started: false, completed: false },
    task4: { label: "Invite 5 friends to DOGS (+20000 DOGS)", url: "https://example.com/task4", started: false, completed: false },
    task5: { label: "Send ?? to Binance X.com (+100 DOGS)", url: "https://www.binance.com", started: false, completed: false },
    task6: { label: "Send ?? to OKX X.com (+100 DOGS)", url: "https://www.okx.com", started: false, completed: false },
    task7: { label: "Send ?? to Bybit X.com (+100 DOGS)", url: "https://www.bybit.com", started: false, completed: false },
  });
  const [points, setPoints] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load user data from localStorage
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) setUserData(JSON.parse(storedUserData));

      // Load tasks from localStorage
      const storedUserTasks = userData
        ? localStorage.getItem(`${userData.username}_tasks`)
        : null;
      if (storedUserTasks) setTasks(JSON.parse(storedUserTasks));

      // Load points from localStorage
      const storedUserPoints = userData
        ? localStorage.getItem(`${userData.username}_points`)
        : null;
      if (storedUserPoints) setPoints(Number(storedUserPoints));

      // Get user from WebApp
      if (WebApp.initDataUnsafe?.user) {
        const user = WebApp.initDataUnsafe.user as UserData;
        setUserData(user);
        localStorage.setItem("userData", JSON.stringify(user));
      }

      // Check for referral ID in URL
      const urlParams = new URLSearchParams(window.location.search);
      const referrerId = urlParams.get("ref");
      if (referrerId && userData?.id) handleReferral(referrerId);
    }
  }, [userData]);

  const saveUserTasks = (updatedTasks: Record<TaskKey, Task>) => {
    if (typeof window !== "undefined" && userData) {
      localStorage.setItem(`${userData.username}_tasks`, JSON.stringify(updatedTasks));
    }
  };

  const saveUserPoints = (newPoints: number) => {
    if (typeof window !== "undefined" && userData) {
      localStorage.setItem(`${userData.username}_points`, newPoints.toString());
    }
  };

  const handleReferral = (referrerId: string) => {
    if (typeof window !== "undefined") {
      const referredUsers = JSON.parse(localStorage.getItem("referredUsers") || "{}");

      if (!referredUsers[referrerId]?.includes(userData!.id)) {
        if (!referredUsers[referrerId]) referredUsers[referrerId] = [];
        referredUsers[referrerId].push(userData!.id);
        localStorage.setItem("referredUsers", JSON.stringify(referredUsers));

        const referrerPoints = parseInt(localStorage.getItem(`${referrerId}_points`) || "0", 10);
        localStorage.setItem(`${referrerId}_points`, (referrerPoints + 10).toString());
      }
    }
  };

  const copyReferralLink = () => {
    if (userData) {
      const referralLink = `https://t.me/notmoonbot?start=notmoon${userData.id}`;
      navigator.clipboard.writeText(referralLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
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

          <div style={{ margin: "10px 0", fontSize: "18px", fontWeight: "bold" }}>
            Points: {points}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}




