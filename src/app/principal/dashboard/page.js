"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatCard from "@/components/StatCard";
import UploadRow from "@/components/UploadRow";

export default function PrincipalDashboard() {
  return (
    <DashboardLayout role="PRINCIPAL">
      <div className="space-y-10">
        {/* Principal dashboard overview metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="PENDING REVIEWS"
            value="12"
            growth="+4 today"
            icon="⏳"
          />
          <StatCard
            title="TOTAL TEACHERS"
            value="48"
            growth="Active"
            icon="👨‍🏫"
          />
          <StatCard
            title="TOTAL BROADCASTS"
            value="842"
            growth="+12% MoM"
            icon="📡"
          />
          <StatCard
            title="COMPLIANCE RATE"
            value="98%"
            growth="High"
            icon="✅"
          />
        </div>

        {/* Priority review panel for the top pending items. */}
        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-black/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-2xl font-bold">Priority Reviews</h3>
            <button className="text-[10px] font-bold tracking-widest text-gray-400 hover:text-black">
              VIEW ALL QUEUE
            </button>
          </div>

          <div className="flex flex-col">
            <UploadRow
              title="Advanced Macroeconomics"
              subtitle="DR. ARUN SINGH"
              date="May 06, 2026"
              status="PENDING"
              type="pdf"
            />
            <UploadRow
              title="The Industrial Revolution"
              subtitle="DR. SARAH JAY"
              date="May 05, 2026"
              status="PENDING"
              type="pdf"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
