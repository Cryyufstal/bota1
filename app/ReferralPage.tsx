interface ReferralPageProps {
  userData: UserData | null;
  copied: boolean;
  copyReferralLink: () => void;
}

export default function ReferralPage({ userData, copied, copyReferralLink }: ReferralPageProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Referral</h1>
      <div style={{ margin: "10px 0" }}>
        <button onClick={copyReferralLink} style={{ backgroundColor: "green", color: "white", padding: "10px" }}>
          Invite Friends
        </button>
      </div>
      {copied && <div style={{ color: "lime", marginTop: "5px" }}>Copied</div>}
    </div>
  );
}
