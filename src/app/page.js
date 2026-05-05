"use client"; // Required for using useState
import { useState } from "react";

export default function Home() {
  // 1. Setup state to track if "Teacher" or "Principal" is selected
  const [role, setRole] = useState("teacher");

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-sm border border-black/5">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold">Scholarly</h1>
          <p className="text-[10px] tracking-[0.2em] text-gray-400 mt-2 font-sans uppercase font-bold">
            Editorial Portal Access
          </p>
        </div>

        {/* 2. Role Selector (The Toggle) */}
        <div className="mb-8">
          <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3 block">
            Select Position
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole("teacher")}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all duration-300 ${
                role === "teacher"
                  ? "border-scholarly-charcoal bg-black/5 shadow-inner"
                  : "border-gray-100 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">🎓</span>
              <span className="font-bold text-sm">Teacher</span>
            </button>

            <button
              onClick={() => setRole("principal")}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all duration-300 ${
                role === "principal"
                  ? "border-scholarly-charcoal bg-black/5 shadow-inner"
                  : "border-gray-100 hover:border-gray-300"
              }`}
            >
              <span className="text-xl">🏛️</span>
              <span className="font-bold text-sm">Principal</span>
            </button>
          </div>
        </div>

        {/* Placeholder for Inputs */}
        <div className="text-center text-xs text-gray-300 italic">
          Selected Role: {role.toUpperCase()}
        </div>
      </div>
    </main>
  );
}
