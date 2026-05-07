"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

/**
 * DashboardLayout
 * @param {ReactNode} children - The page content
 * @param {string} role - "TEACHER" or "PRINCIPAL"
 */
export default function DashboardLayout({ children, role = "TEACHER" }) {
  return (
    <div className="flex bg-[#FAF9F6] min-h-screen text-scholarly-charcoal font-sans selection:bg-black selection:text-white">
      {/* 
          1. Sidebar wrapper
          The role prop controls which menu items are shown.
          Teacher and Principal dashboards share the same shell.
      */}
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* 
            2. Top navigation bar
            Contains the search input, notification icon, and role label.
        */}
        <TopNav role={role} />

        {/* 
            3. Main content area
            Provides padding and overflow handling for page contents.
        */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
