import { UserData } from "./types";

interface ProfilePageProps {
  userData: UserData | null;
  points: number;
}

export default function ProfilePage({ userData, points }: ProfilePageProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {userData ? (
        <>
          <ul>
            <li>Hello: {userData.username}</li>
          </ul>
          <div style={{ margin: "20px 0" }}>
            <img
              src="/images/paws.png"
              alt="Paws"
              width={171}
              height={132}
              className="mb-4"
            />
          </div>
          <div style={{ margin: "10px 0", fontSize: "18px", fontWeight: "bold" }}>
            Points: {points}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
