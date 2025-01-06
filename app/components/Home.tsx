export default function Home({ userData }: { userData: { username: string; points: number } }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {userData.username}!</h1>
      <p className="text-lg text-gray-600">You have <span className="font-bold text-blue-600">{userData.points}</span> points.</p>
    </div>
  );
}

