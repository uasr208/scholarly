"use client";
import { useState } from "react";
import Link from "next/link";

// Placeholder broadcast data for the public teacher live page.
// Replace this with a data fetch from the API once the real backend is available.
const approvedBroadcasts = [
  {
    id: 1,
    title: "Modernist Architecture",
    teacher: "Dr. Sarah Jay",
    subject: "Arts",
    duration: "45m",
    thumbnail: "🏛️",
  },
  {
    id: 2,
    title: "Neural Basis of Intelligence",
    teacher: "Dr. Meera Bai",
    status: "APPROVED",
    subject: "Neuroscience",
    duration: "60m",
    thumbnail: "🧠",
  },
  {
    id: 4,
    title: "Post-Truth Economics",
    teacher: "Utkarsh Singh",
    subject: "Economics",
    duration: "30m",
    thumbnail: "📈",
  },
];

export default function PublicPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-scholarly-charcoal font-sans">
      {/* Public student-facing navigation bar */}
      <nav className="flex justify-between items-center px-8 lg:px-16 py-8 border-b border-black/5 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="font-serif text-3xl font-bold tracking-tighter">
          Scholarly.
        </h1>
        <div className="flex gap-8 items-center">
          <Link
            href="/auth"
            className="text-[10px] font-bold tracking-widest uppercase hover:text-gray-500 transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/auth"
            className="bg-black text-white px-6 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase shadow-xl shadow-black/10 hover:scale-105 transition-all"
          >
            Join for Free
          </Link>
        </div>
      </nav>

      {/* Hero section introducing the available live broadcasts */}
      <section className="px-8 lg:px-16 py-20 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">
            Open Knowledge Base
          </p>
          <h2 className="font-serif text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
            Access world-class{" "}
            <span className="italic text-gray-400">broadcasts</span> from top
            faculty.
          </h2>
          <div className="flex gap-4">
            <div className="h-1 w-20 bg-black mt-4"></div>
            <p className="text-gray-500 text-lg">
              Explore a curated library of research, lectures, and academic
              discussions across all departments.
            </p>
          </div>
        </div>
      </section>

      {/* Featured broadcast cards grid for the public feed */}
      <section className="px-8 lg:px-16 pb-32 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-black/5 pb-8">
          <h3 className="font-serif text-3xl font-bold">Featured Broadcasts</h3>
          <div className="flex gap-4 text-[10px] font-bold tracking-widest uppercase text-gray-400">
            <button className="text-black border-b border-black pb-1">
              All Subjects
            </button>
            <button className="hover:text-black transition-all">Science</button>
            <button className="hover:text-black transition-all">Arts</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {approvedBroadcasts.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              {/* Broadcast thumbnail / hero visual for the episode card */}
              <div className="aspect-video bg-white rounded-[40px] border border-black/5 flex items-center justify-center text-6xl shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                {item.thumbnail}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
              </div>

              {/* Broadcast metadata and instructor details */}
              <div className="mt-6 px-2">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                    {item.subject}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400">
                    {item.duration}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold leading-tight group-hover:underline decoration-1 underline-offset-4 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-400 font-medium italic">
                  with {item.teacher}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
