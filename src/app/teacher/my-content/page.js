"use client";
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";

// Mock data representing teacher's uploads
const broadcasts = [
  {
    id: 1,
    title: "Modernist Architecture: A Sociological Perspective",
    subject: "History of Arts",
    status: "REJECTED",
    duration: 45,
    time: "14:00 - 14:45",
  },
  {
    id: 2,
    title: "The Neural Basis of Emotional Intelligence",
    subject: "Neuroscience",
    status: "APPROVED",
    duration: 60,
    time: "09:00 - 10:00",
  },
  {
    id: 3,
    title: "Quantum Field Theory for Beginners",
    subject: "Physics",
    status: "PENDING",
    duration: 120,
    time: "15:30 - 17:30",
  },
  {
    id: 4,
    title: "Statistical Modeling in Post-Truth Economics",
    subject: "Economics",
    status: "APPROVED",
    duration: 30,
    time: "11:15 - 11:45",
  },
];

export default function MyContent() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Logic: Filter the list based on the selected pill
  const filteredBroadcasts = broadcasts.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.status === activeFilter;
  });

  // Calculate dynamic stats for the progress bars
  const totalHours = (
    broadcasts.reduce((acc, curr) => acc + curr.duration, 0) / 60
  ).toFixed(1);
  const approvalRate = Math.round(
    (broadcasts.filter((b) => b.status === "APPROVED").length /
      broadcasts.length) *
      100,
  );

  const filterOptions = ["ALL", "APPROVED", "PENDING", "REJECTED"];

  return (
    <DashboardLayout role="TEACHER">
      <div className="space-y-10">
        {/* --- HEADER & RESPONSIVE FILTER --- */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">
              Library Management
            </p>
            <h1 className="font-serif text-4xl font-bold text-scholarly-charcoal">
              My Content
            </h1>
          </div>

          {/* Filter Pill Container: Wraps on mobile, stays single line on desktop */}
          <div className="flex flex-wrap lg:flex-nowrap bg-gray-50 p-1.5 rounded-2xl border border-black/5 w-full lg:w-auto">
            {filterOptions.map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`flex-1 lg:flex-none px-4 lg:px-6 py-2.5 rounded-xl text-[10px] font-bold tracking-widest transition-all whitespace-nowrap ${
                  activeFilter === status
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </header>

        {/* --- TABLE / LIST SECTION --- */}
        <div className="space-y-4 min-h-[300px]">
          {/* Table Headers: Hidden on mobile for better card layout */}
          <div className="hidden lg:grid grid-cols-12 px-8 text-[10px] font-bold tracking-widest text-gray-300 uppercase">
            <div className="col-span-5">Broadcast Title</div>
            <div className="col-span-3">Subject</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Schedule</div>
          </div>

          {filteredBroadcasts.length > 0 ? (
            filteredBroadcasts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[32px] p-6 lg:p-8 shadow-sm border border-black/5 flex flex-col lg:grid lg:grid-cols-12 items-start lg:items-center gap-4 lg:gap-0 hover:scale-[1.01] transition-all duration-300"
              >
                <div className="lg:col-span-5 pr-0 lg:pr-8">
                  <h4 className="font-serif font-bold text-lg text-scholarly-charcoal leading-tight">
                    {item.title}
                  </h4>
                  <p className="lg:hidden text-[10px] font-bold text-gray-300 uppercase mt-2">
                    {item.subject}
                  </p>
                </div>

                <div className="hidden lg:block lg:col-span-3 text-sm text-gray-400 font-medium">
                  {item.subject}
                </div>

                <div className="lg:col-span-2">
                  <StatusBadge status={item.status} />
                </div>

                <div className="lg:col-span-2 text-left lg:text-right text-sm text-gray-400 font-medium">
                  <span className="lg:hidden text-[10px] font-bold uppercase text-gray-300 block mb-1">
                    Time Range
                  </span>
                  {item.time}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
              <p className="font-serif italic text-gray-400">
                No content found in "{activeFilter}"
              </p>
            </div>
          )}
        </div>

        {/* --- DYNAMIC STATS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {/* Stat 1: Airtime */}
          <div className="bg-[#FAF9F6] p-8 rounded-[40px] border border-black/5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
              Weekly Airtime
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-serif font-bold text-scholarly-charcoal">
                {totalHours}
              </span>
              <span className="text-gray-400 text-sm font-medium">Hours</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 mt-8 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-1000"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>

          {/* Stat 2: Approval Rate */}
          <div className="bg-[#FAF9F6] p-8 rounded-[40px] border border-black/5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
              Approval Rate
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-serif font-bold text-scholarly-charcoal">
                {approvalRate}
              </span>
              <span className="text-gray-400 text-sm font-medium">%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 mt-8 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-1000"
                style={{ width: `${approvalRate}%` }}
              ></div>
            </div>
          </div>

          {/* Stat 3: Highlight Card */}
          <div className="bg-scholarly-charcoal text-white p-8 rounded-[40px] flex flex-col justify-between shadow-xl shadow-black/10 md:col-span-2 lg:col-span-1">
            <div>
              <div className="flex justify-between items-start">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                  Upcoming
                </p>
                <span className="text-[9px] bg-white/10 px-3 py-1 rounded-full text-white/60 font-bold uppercase tracking-widest">
                  Live Soon
                </span>
              </div>
              <h3 className="font-serif text-2xl mt-4 leading-tight">
                Quantum Field Theory for Beginners
              </h3>
              <p className="text-gray-500 text-sm mt-2 font-medium">
                Tomorrow • 15:30 IST
              </p>
            </div>
            <button className="w-full py-4 mt-8 border border-white/10 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">
              Broadcast Settings
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
