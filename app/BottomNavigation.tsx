import Link from "next/link";

export default function BottomNavigation() {
  return (
    <nav style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "black", display: "flex", justifyContent: "space-around", padding: "10px 0" }}>
      <Link href="/profile" style={{ color: "white" }}>Profile</Link>
      <Link href="/tasks" style={{ color: "white" }}>Tasks</Link>
      <Link href="/referral" style={{ color: "white" }}>Referral</Link>
    </nav>
  );
}
