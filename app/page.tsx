"use client";

import { useState, useEffect } from "react";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Referrals from "./components/Referrals";

interface UserData {
  id: number;
  username: string;
  points: number;
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"home" | "tasks" | "referrals">("home");
  const [userData, setUserData] = useState<UserData>({
    id: 1,
    username: "JohnDoe",
    points: 100,
  });

  // Load user data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, []);

  // Save user data to localStorage on update
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home userData={userData} />;
      case "tasks":
        return <Tasks userData={userData} setUserData={setUserData} />;
      case "referrals":
        return <Referrals userData={userData} />;
      default:
        return <Home userData={userData} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex-grow">{renderPage()}</div>
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
