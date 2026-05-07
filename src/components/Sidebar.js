import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ role, isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  // Navigation configuration for each user role in the dashboard.
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
    // Clear any authentication state before redirecting back to the landing page.
    // localStorage.removeItem('token');
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-64 bg-white h-screen border-r border-black/5 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:translate-x-0`}
      >
        <div>
          <div className="mb-12 px-4 flex justify-between items-center">
            <h2 className="font-serif text-2xl font-bold tracking-tighter text-scholarly-charcoal">
              Scholarly.
            </h2>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden text-2xl p-2 text-gray-400 hover:text-black"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={onClose} // Close sidebar on mobile after navigation
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

        {/* Logout control displayed at the bottom of the sidebar */}
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
    </>
  );
}
