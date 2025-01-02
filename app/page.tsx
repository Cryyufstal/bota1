"use client";

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import '/app/global.css'; // مسار ملف CSS
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}


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
          <div className="task">
            <span>Be a good dog 🐶 (+50 DOGS)</span>
            <button className="check">Check</button>
          </div>
          <div className="task">
            <span>Subscribe to DOGS channel (+100 DOGS)</span>
            <button
              onClick={() => window.open("https://t.me/dogs_channel", "_blank")}
            >
              Start
            </button>
          </div>
          <div className="task">
            <span>Subscribe to Dogs X.com (+1000 DOGS)</span>
            <button
              onClick={() => window.open("https://www.dogsx.com", "_blank")}
            >
              Start
            </button>
          </div>
          <div className="task">
            <span>Invite 5 friends to DOGS (+20000 DOGS)</span>
            <button className="check">Check</button>
          </div>
          <div className="task">
            <span>Send 🦴 to Binance X.com (+100 DOGS)</span>
            <button
              onClick={() => window.open("https://www.binance.com", "_blank")}
            >
              Start
            </button>
          </div>
          <div className="task">
            <span>Send 🦴 to OKX X.com (+100 DOGS)</span>
            <button
              onClick={() => window.open("https://www.okx.com", "_blank")}
            >
              Start
            </button>
          </div>
          <div className="task">
            <span>Send 🦴 to Bybit X.com (+100 DOGS)</span>
            <button
              onClick={() => window.open("https://www.bybit.com", "_blank")}
            >
              Start
            </button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
