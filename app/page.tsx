'use client';

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import ProfilePage from "./ProfilePage";
import TasksPage from "./TasksPage";
import ReferralPage from "./ReferralPage";
import BottomNavigation from "./BottomNavigation";
import { UserData, Task, TaskKey } from "./types";

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
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) setUserData(JSON.parse(storedUserData));

      const storedUserTasks = userData
        ? localStorage.getItem(`${userData.username}_tasks`)
        : null;
      if (storedUserTasks) setTasks(JSON.parse(storedUserTasks));

      const storedUserPoints = userData
        ? localStorage.getItem(`${userData.username}_points`)
        : null;
      if (storedUserPoints) setPoints(Number(storedUserPoints));

      if (WebApp.initDataUnsafe?.user) {
        const user = WebApp.initDataUnsafe.user as UserData;
        setUserData(user);
        localStorage.setItem("userData", JSON.stringify(user));
      }

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

  return (
    <main style={{ padding: "16px", backgroundColor: "black", color: "blue" }}>
      <ProfilePage userData={userData} points={points} />
      <TasksPage tasks={tasks} />
      <ReferralPage userData={userData} copied={copied} copyReferralLink={copyReferralLink} />
      <BottomNavigation />
    </main>
  );
}
