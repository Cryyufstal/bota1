"use client";

import { useState } from "react";
import Home from ".//components/Home";
import Tasks from ".//components/Tasks";
import Referrals from ".//components/Referrals";

const userData = {
  username: "JohnDoe",
  points: 100,
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"home" | "tasks" | "referrals">("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home userData={userData} />;
      case "tasks":
        return <Tasks userData={userData} />;
      case "referrals":
        return <Referrals userData={userData} />;
      default:
        return <Home userData={userData} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{renderPage()}</div>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-3">
        <button
          className={`text-center ${currentPage === "home" ? "font-bold text-blue-400" : ""}`}
          onClick={() => setCurrentPage("home")}
        >
          <span>🏠</span>
          <div>Home</div>
        </button>
        <button
          className={`text-center ${currentPage === "tasks" ? "font-bold text-blue-400" : ""}`}
          onClick={() => setCurrentPage("tasks")}
        >
          <span>📋</span>
          <div>Tasks</div>
        </button>
        <button
          className={`text-center ${currentPage === "referrals" ? "font-bold text-blue-400" : ""}`}
          onClick={() => setCurrentPage("referrals")}
        >
          <span>🔗</span>
          <div>Referrals</div>
        </button>
      </nav>
    </div>
  );
}
