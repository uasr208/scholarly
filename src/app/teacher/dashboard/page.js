"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatCard from "@/components/StatCard";

export default function TeacherDashboard() {
  return (
    <DashboardLayout role="TEACHER">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon="📊"
          title="Total Broadcasts"
          value="128"
          subtext="12% Increase this term"
          statusLabel="Snapshot"
        />
        <StatCard
          icon="💬"
          title="Pending Review"
          value="14"
          subtext="Avg. 2 days wait time"
          statusLabel="Reviewing"
        />
        <StatCard
          icon="✓"
          title="Approved Works"
          value="106"
          subtext="Published to Library"
          statusLabel="Active"
        />
        <StatCard
          icon="✕"
          title="Returned Drafts"
          value="8"
          subtext="Requires Formatting Check"
          statusLabel="Revision"
        />
      </div>
    </DashboardLayout>
  );
}
