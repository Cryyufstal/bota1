"use client";

import React from "react";

interface HomeProps {
  userData: { username: string; points: number };
}

const Home: React.FC<HomeProps> = ({ userData }) => {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Welcome, {userData.username}!</h1>
      <p>You have {userData.points} points.</p>
    </div>
  );
};

export default Home;
