"use client";

import React, { useState } from "react";

export default function App() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("https://example.com/invite?ref=your_code");
  const [invitedFriends, setInvitedFriends] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert("Link copied to clipboard!");
  };

  const activeTasks = [
    { key: 1, label: "Send to Binance X.com (+100 DOGS)", started: false },
    { key: 2, label: "Send to OKX X.com (+100 DOGS)", started: false },
    { key: 3, label: "Send to Bybit X.com (+100 DOGS)", started: false },
  ];

  const handleTaskStart = (key) => {
    console.log(`Starting task ${key}`);
    // Add task start logic here
  };

  const handleTaskComplete = (key) => {
    console.log(`Completing task ${key}`);
    // Add task complete logic here
  };

  return (
    <main>
      <h1>Welcome, Hopgfij</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Points: 21200</p>
        <button
          onClick={() => setShowInviteModal(true)}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 24px",
            borderRadius: "4px",
            border: "none",
            fontSize: "1rem",
            marginBottom: "20px",
          }}
        >
          Invite Friends
        </button>
      </div>

      {/* Task List */}
      {activeTasks.map((task) => (
        <div
          key={task.key}
          style={{
            marginBottom: "15px",
            padding: "12px",
            backgroundColor: "#555",
            borderRadius: "6px",
            color: "white",
          }}
        >
          <span>{task.label}</span>
          {task.started ? (
            <button
              onClick={() => handleTaskComplete(task.key)}
              style={{
                marginLeft: "10px",
                padding: "8px 16px",
                backgroundColor: "#007BFF",
                color: "white",
                borderRadius: "4px",
              }}
            >
              Check
            </button>
          ) : (
            <button
              onClick={() => handleTaskStart(task.key)}
              style={{
                marginLeft: "10px",
                padding: "8px 16px",
                backgroundColor: "#FFA500",
                color: "white",
                borderRadius: "4px",
              }}
            >
              Start
            </button>
          )}
        </div>
      ))}

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "80%",
              maxWidth: "400px",
            }}
          >
            <h2>Invite Friends</h2>
            <p>Copy your invite link and share it with your friends!</p>
            <button
              onClick={handleCopyLink}
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                marginBottom: "10px",
              }}
            >
              Copy Invite Link
            </button>
            <h3>Invited Friends</h3>
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {invitedFriends.map((friend) => (
                <li key={friend.id} style={{ marginBottom: "5px" }}>
                  {friend.name}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowInviteModal(false)}
              style={{
                backgroundColor: "#FF0000",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                marginTop: "10px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
            }

                
