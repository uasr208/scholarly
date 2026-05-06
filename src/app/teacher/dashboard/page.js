"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatCard from "@/components/StatCard";
import UploadRow from "@/components/UploadRow";

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

      {/* Recent Upload Section */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-black/5">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold">Recent Uploads</h3>
            <p className="text-gray-400 text-sm mt-1">
              Your latest submissions for archival review.
            </p>
          </div>
          <button className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-black uppercase border-b-2 border-transparent hover:border-black transition-all pb-1">
            VIEW ALL
          </button>
        </div>

        <div className="flex flex-col">
          <UploadRow
            title="Phenomenology of Digital Classrooms"
            subtitle="PHIL-104-LECTURE-NOTES.PDF"
            date="Oct 24, 2023"
            status="APPROVED"
            type="pdf"
          />
          <UploadRow
            title="Seminar: Ethics in Algorithmic Govern..."
            subtitle="SEMINAR-AUDIO-RAW.WAV"
            date="Oct 22, 2023"
            status="PENDING"
            type="audio"
          />
          <UploadRow
            title="A Critical Review of Modernist Pedag..."
            subtitle="FINAL-DRAFT-MANUSCRIPT.DOCX"
            date="Oct 19, 2023"
            status="REJECTED"
            type="pdf"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
