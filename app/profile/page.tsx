import ProfilePage from "../../components/ProfilePage";
import { UserData } from "../../types";

export default function Profile() {
  const userData: UserData | null = null; // Fetch user data here
  const points = 0; // Fetch points here

  return <ProfilePage userData={userData} points={points} />;
}
