'use client';

import { useState, useEffect } from "react";
import Home from "./components/Home";
import Tasks from "./components/Tasks";
import Referrals from "./components/Referrals";

type UserData = {
  username: string;
  points: number;
};

export default function Page() {
  const [userData, setUserData] = useState<UserData>(() => {
    // استرجاع بيانات المستخدم من Local Storage
    const storedUserData = localStorage.getItem("userData");
    return storedUserData
      ? JSON.parse(storedUserData)
      : { username: "User", points: 0 };
  });

  const [currentPage, setCurrentPage] = useState<string>("home");

  // تحديث Local Storage عند تغيير بيانات المستخدم
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <div className="container">
      <nav className="navigation">
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("tasks")}>Tasks</button>
        <button onClick={() => setCurrentPage("referrals")}>Referrals</button>
      </nav>

      <div className="content">
        {currentPage === "home" && <Home userData={userData} />}
        {currentPage === "tasks" && (
          <Tasks userData={userData} setUserData={setUserData} />
        )}
        {currentPage === "referrals" && <Referrals userData={userData} />}
      </div>

      <footer className="footer">
        <p>&copy; 2025 Your App. All rights reserved.</p>
      </footer>
    </div>
  );
}

