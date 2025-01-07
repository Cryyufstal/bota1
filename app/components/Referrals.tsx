"use client";

interface ReferralsProps {
  userData: {
    id: number;
    username: string;
    points: number;
  };
}

export default function Referrals({ userData }: ReferralsProps) {
  const copyReferralLink = () => {
    const referralLink = `https://example.com/referral/${userData.id}`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Referrals</h1>
      <button
        onClick={copyReferralLink}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Copy Referral Link
      </button>
    </div>
  );
}
