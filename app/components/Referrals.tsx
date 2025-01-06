"use client";

import { useState } from "react";

interface ReferralsProps {
  userData: {
    username: string;
    points: number;
  };
}

export default function Referrals({ userData }: ReferralsProps) {
  const [copied, setCopied] = useState(false);

  const copyReferralLink = () => {
    const referralLink = `https://t.me/motmoonbot?start=notmoon${userData.username}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Referrals</h1>
      <p>Your referral link:</p>
      <input
        type="text"
        value={`https://t.me/motmoonbot?start=notmoon${userData.username}`}
        readOnly
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={copyReferralLink}>
        {copied ? "Copied!" : "Copy Referral Link"}
      </button>
    </div>
  );
}
