import { useState } from "react";

export default function Referrals({ userData }: { userData: { username: string; points: number } }) {
  const [copied, setCopied] = useState(false);

  const copyReferralLink = () => {
    const referralLink = `https://t.me/motmoonbot?start=notmoon${userData.username}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Referrals</h1>
      <p className="text-gray-600 mb-2">Share your referral link:</p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={`https://t.me/motmoonbot?start=notmoon${userData.username}`}
          readOnly
          className="flex-grow border border-gray-300 rounded p-2"
        />
        <button
          className={`px-4 py-2 rounded text-white ${copied ? "bg-green-500" : "bg-blue-500"}`}
          onClick={copyReferralLink}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
