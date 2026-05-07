// Top navigation bar used across teacher/principal dashboards.
// Includes the mobile menu trigger, role label, search field, and notifications.
export default function TopNav({ role = "TEACHER", onMenuClick }) {
  return (
    <header className="h-20 bg-transparent flex items-center justify-between px-4 md:px-10">
      <div className="flex items-center gap-4">
        {/* Toggle sidebar on small screens */}
        <button onClick={onMenuClick} className="lg:hidden text-2xl p-2">
          ☰
        </button>

        <h2 className="text-lg md:text-xl font-serif whitespace-nowrap">
          Overview
        </h2>
        <span className="hidden sm:inline-block px-3 py-1 bg-gray-100 text-[10px] font-bold tracking-widest rounded-full text-gray-500 uppercase">
          {role}
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search archives..."
            className="bg-gray-100/50 border border-transparent focus:border-gray-200 outline-none rounded-full py-2 px-10 text-sm w-48 lg:w-64 transition-all"
          />
          <span className="absolute left-4 top-2.5 text-gray-400">🔍</span>
        </div>
        <button className="text-xl">🔔</button>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-400 border border-gray-100" />
      </div>
    </header>
  );
}
