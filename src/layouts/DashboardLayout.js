"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

export default function DashboardLayout({ children, role }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F2EA]">
      {/* Sidebar - Hidden on mobile, shown when isSidebarOpen is true */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {" "}
        {/* min-w-0 prevents flex items from overflowing */}
        <TopNav role={role} onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 md:p-10 pt-0 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
