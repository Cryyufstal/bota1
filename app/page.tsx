
"use client";

import WebApp from "@twa-dev/sdk";
import Image from "next/image"; // استيراد مكون الصورة
import { useEffect, useState } from "react";
import { paws } from '@/images'
// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe?.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);
export default function Main({ userData, paws }) {
  // حالة لتعقب كل زر
  const [tasks, setTasks] = useState({
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
    task6: false,
    task7: false,
  });

  // تغيير حالة الزر
  const toggleTask = (taskKey) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskKey]: !prevTasks[taskKey],
    }));
  };

  return (
    <main style={{ padding: "16px", backgroundColor: "black", color: "blue" }}>
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">free style bot</h1>
          <ul>
            <li>hello: {userData.username}</li>
          </ul>
          <ul>
            <li>
              <a
                href="default.asp"
                target="_blank"
                style={{ backgroundColor: "black", color: "green" }}
              >
                This is a link
              </a>
            </li>
          </ul>

          <div style={{ margin: "20px 0" }}>
            <Image
              src={paws}
              alt="Paws"
              width={171}
              height={132}
              className="mb-4"
            />
          </div>

          <div className="task">
            <span>Be a good dog 🐶 (+50 DOGS)</span>
            {tasks.task1 ? (
              <button onClick={() => toggleTask("task1")}>Check</button>
            ) : (
              <button onClick={() => toggleTask("task1")}>Start</button>
            )}
          </div>
          <div className="task">
            <span>Subscribe to DOGS channel (+100 DOGS)</span>
            {tasks.task2 ? (
              <button onClick={() => toggleTask("task2")}>Check</button>
            ) : (
              <button
                onClick={() => {
                  window.open("https://t.me/dogs_channel", "_blank");
                  toggleTask("task2");
                }}
              >
                Start
              </button>
            )}
          </div>
          <div className="task">
            <span>Subscribe to Dogs X.com (+1000 DOGS)</span>
            {tasks.task3 ? (
              <button onClick={() => toggleTask("task3")}>Check</button>
            ) : (
              <button
                onClick={() => {
                  window.open("https://www.dogsx.com", "_blank");
                  toggleTask("task3");
                }}
              >
                Start
              </button>
            )}
          </div>
          <div className="task">
            <span>Invite 5 friends to DOGS (+20000 DOGS)</span>
            {tasks.task4 ? (
              <button onClick={() => toggleTask("task4")}>Check</button>
            ) : (
              <button onClick={() => toggleTask("task4")}>Start</button>
            )}
          </div>
          <div className="task">
            <span>Send 🦴 to Binance X.com (+100 DOGS)</span>
            {tasks.task5 ? (
              <button onClick={() => toggleTask("task5")}>Check</button>
            ) : (
              <button
                onClick={() => {
                  window.open("https://www.binance.com", "_blank");
                  toggleTask("task5");
                }}
              >
                Start
              </button>
            )}
          </div>
          <div className="task">
            <span>Send 🦴 to OKX X.com (+100 DOGS)</span>
            {tasks.task6 ? (
              <button onClick={() => toggleTask("task6")}>Check</button>
            ) : (
              <button
                onClick={() => {
                  window.open("https://www.okx.com", "_blank");
                  toggleTask("task6");
                }}
              >
                Start
              </button>
            )}
          </div>
          <div className="task">
            <span>Send 🦴 to Bybit X.com (+100 DOGS)</span>
            {tasks.task7 ? (
              <button onClick={() => toggleTask("task7")}>Check</button>
            ) : (
              <button
                onClick={() => {
                  window.open("https://www.bybit.com", "_blank");
                  toggleTask("task7");
                }}
              >
                Start
              </button>
            )}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}

