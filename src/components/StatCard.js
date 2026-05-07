// Reusable stat card for dashboard overview metrics.
export default function StatCard({ icon, title, value, subtext, statusLabel }) {
  return (
    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-black/5 flex flex-col justify-between h-[220px] transition-hover hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="bg-gray-50 w-10 h-10 rounded-xl flex items-center justify-center text-xl border border-black/5">
          {icon}
        </div>
        <span className="text-[9px] font-bold tracking-[0.2em] text-gray-300 uppercase">
          {statusLabel}
        </span>
      </div>

      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-serif font-bold text-scholarly-charcoal">
          {value}
        </p>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-gray-300 uppercase">
        <span className="text-xs">↗</span>
        {subtext}
      </div>
    </div>
  );
}
