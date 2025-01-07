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
  // تحميل بيانات المستخدم من Local Storage أو توفير البيانات الافتراضية
  const [userData, setUserData] = useState<UserData>(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData
      ? JSON.parse(storedUserData)
      : { username: "User", points: 0 };
  });

  // حفظ بيانات المستخدم عند تغييرها
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const [currentPage, setCurrentPage] = useState<string>("home");

  return (
    <div>
      {/* شريط التنقل */}
      <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px", borderTop: "1px solid #ccc" }}>
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("tasks")}>Tasks</button>
        <button onClick={() => setCurrentPage("referrals")}>Referrals</button>
      </nav>

      {/* عرض الصفحة الحالية بناءً على currentPage */}
      <div style={{ padding: "20px" }}>
        {currentPage === "home" && <Home userData={userData} />}
        {currentPage === "tasks" && (
          <Tasks userData={userData} setUserData={setUserData} />
        )}
        {currentPage === "referrals" && (
          <Referrals userData={userData} />
        )}
      </div>
    </div>
  );
}
