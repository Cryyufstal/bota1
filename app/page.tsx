"use client";

import { useState } from "react";
import Home from ".//components/Home";
import Tasks from ".//components/Tasks";
import Referrals from ".//components/Referrals";

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"home" | "tasks" | "referrals">("home");

  // لتغيير الصفحة
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "tasks":
        return <Tasks />;
      case "referrals":
        return <Referrals />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {/* الصفحة الرئيسية */}
      <div>{renderPage()}</div>

      {/* شريط التنقل */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#f8f9fa",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px 0",
          borderTop: "1px solid #ddd",
        }}
      >
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("tasks")}>Tasks</button>
        <button onClick={() => setCurrentPage("referrals")}>Referrals</button>
      </nav>
    </div>
  );
}
