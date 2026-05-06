import StatusBadge from "./StatusBadge";

export default function UploadRow({ title, subtitle, date, status, type }) {
  const icon = type === "audio" ? "🎵" : "📄";

  return (
    <div className="flex items-center justify-between py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-4 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl text-gray-400">
          {icon}
        </div>
        <div>
          <h4 className="font-serif font-bold text-scholarly-charcoal text-[15px]">
            {title}
          </h4>
          <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-12">
        <span className="text-sm text-gray-400 font-medium">{date}</span>
        <div className="w-24 flex justify-end">
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
}
