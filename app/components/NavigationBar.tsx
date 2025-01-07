"use client";

interface NavigationBarProps {
  currentPage: "home" | "tasks" | "referrals";
  setCurrentPage: (page: "home" | "tasks" | "referrals") => void;
}

export default function NavigationBar({ currentPage, setCurrentPage }: NavigationBarProps) {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "tasks", label: "Tasks", icon: "📋" },
    { id: "referrals", label: "Referrals", icon: "🔗" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentPage(tab.id as "home" | "tasks" | "referrals")}
          className={`text-center ${currentPage === tab.id ? "font-bold text-blue-400" : ""}`}
        >
          <span>{tab.icon}</span>
          <div>{tab.label}</div>
        </button>
      ))}
    </nav>
  );
}
