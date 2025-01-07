"use client";

interface HomeProps {
  userData: {
    id: number;
    username: string;
    points: number;
  };
}

export default function Home({ userData }: HomeProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {userData.username}!</h1>
      <div className="mt-4">
        <p className="text-lg">
          <strong>Points:</strong> {userData.points}
        </p>
        <p className="text-lg">
          <strong>User ID:</strong> {userData.id}
        </p>
      </div>
    </div>
  );
}


