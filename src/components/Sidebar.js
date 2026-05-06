"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authService } from "@/services/auth.service";

const menuItems = [
  { name: "DASHBOARD", path: "/teacher/dashboard", icon: "⊞" },
  { name: "BROADCASTS", path: "/teacher/my-content", icon: "🎙" },
  { name: "RESEARCH", path: "/teacher/research", icon: "📖" },
  { name: "ARCHIVE", path: "/teacher/archive", icon: "📁" },
  { name: "SETTINGS", path: "/teacher/settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/"; // Force a full reload to clear any remaining state
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col p-6 sticky top-0">
      <div className="mb-12">
        <h1 className="font-serif text-2xl font-bold italic">Scholarly</h1>
        <p className="text-[9px] tracking-[0.2em] text-gray-400 font-bold uppercase">
          Editorial Portal
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[11px] font-bold tracking-widest transition-all ${
                isActive
                  ? "bg-black text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Link
          href="/teacher/upload"
          className="w-full bg-black text-white py-4 rounded-xl font-bold text-[10px] tracking-widest flex items-center justify-center hover:bg-gray-800 transition-all"
        >
          NEW BROADCAST
        </Link>
        <div className="mt-auto pt-6 space-y-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[11px] font-bold tracking-widest text-red-500 hover:bg-red-50 transition-all"
          >
            <span className="text-lg">Logout</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 text-[11px] font-bold tracking-widest px-4">
            <span>❓</span> HELP CENTER
          </button>
        </div>
      </div>
    </aside>
  );
}
