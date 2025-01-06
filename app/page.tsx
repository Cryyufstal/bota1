import { useState } from "react";
import Home from ".//components/Home";
import Tasks from ".//components/Tasks";
import Referrals from ".//components/Referrals";

type UserData = {
  username: string;
  points: number;
};

export default function Page() {
  const [userData, setUserData] = useState<UserData>({
    username: "User", // هنا يمكنك إضافة قيمة اسم المستخدم
    points: 0,
  });

  const [currentPage, setCurrentPage] = useState<string>("home");

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("tasks")}>Tasks</button>
        <button onClick={() => setCurrentPage("referrals")}>Referrals</button>
      </nav>

      {currentPage === "home" && <Home userData={userData} />}
      {currentPage === "tasks" && <Tasks userData={userData} setUserData={setUserData} />}
      {currentPage === "referrals" && <Referrals userData={userData} />}
    </div>
  );
}
