import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuConfig = {
    TEACHER: [
      { name: "Dashboard", path: "/teacher/dashboard", icon: "📊" },
      { name: "My Content", path: "/teacher/my-content", icon: "📡" },
      { name: "Upload Content", path: "/teacher/upload", icon: "📤" },
    ],
    PRINCIPAL: [
      { name: "Dashboard", path: "/principal/dashboard", icon: "🏛️" },
      { name: "Pending Review", path: "/principal/pending", icon: "⏳" },
      { name: "All Content", path: "/principal/all-content", icon: "📚" },
    ],
  };

  const links = menuConfig[role] || menuConfig.TEACHER;

  const handleLogout = () => {
    // 1. Clear any auth tokens/session storage here
    // localStorage.removeItem('token');

    // 2. Redirect to login
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-white h-screen border-r border-black/5 p-6 flex flex-col justify-between">
      <div>
        <div className="mb-12 px-4">
          <h2 className="font-serif text-2xl font-bold tracking-tighter text-scholarly-charcoal">
            Scholarly.
          </h2>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-[11px] font-bold tracking-widest uppercase transition-all ${
                  isActive
                    ? "bg-black text-white shadow-lg shadow-black/10"
                    : "text-gray-400 hover:bg-gray-50 hover:text-black"
                }`}
              >
                <span>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button Section */}
      <div className="pt-6 border-t border-black/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[11px] font-bold tracking-widest uppercase text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
