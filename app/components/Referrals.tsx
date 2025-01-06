"use client";

import React, { useState } from "react";

interface ReferralsProps {
  userId: number;
}

const Referrals: React.FC<ReferralsProps> = ({ userId }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `https://t.me/motmoonbot?start=notmoon${userId}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Referral Program</h2>
      <p>Share your referral link:</p>
      <div>
        <input type="text" value={referralLink} readOnly style={{ width: "100%" }} />
        <button onClick={copyReferralLink}>Copy</button>
      </div>
      {copied && <p style={{ color: "green" }}>Copied!</p>}
    </div>
  );
};

export default Referrals;
