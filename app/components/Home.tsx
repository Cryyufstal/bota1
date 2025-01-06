"use client";

interface HomeProps {
  userData: {
    username: string;
    points: number;
  };
}

export default function Home({ userData }: HomeProps) {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Welcome, {userData.username}</h1>
      <p>Points: {userData.points}</p>
    </div>
  );
}

