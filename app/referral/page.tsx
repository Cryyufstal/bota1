import ReferralPage from "../../components/ReferralPage";
import { UserData } from "../../types";

export default function Referral() {
  const userData: UserData | null = null; // Fetch user data here
  const copied = false; // Manage copied state here
  const copyReferralLink = () => {}; // Implement copy referral link logic here

  return <ReferralPage userData={userData} copied={copied} copyReferralLink={copyReferralLink} />;
}
