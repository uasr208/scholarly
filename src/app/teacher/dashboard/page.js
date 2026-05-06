"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the user from localStorage
    const savedUser = localStorage.getItem("scholarly_user");
    if (!savedUser) {
      router.push("/"); // Redirect back to login if no user found
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  if (!user) return <div className="p-10 font-serif">Loading session...</div>;

  return (
    <div className="p-10">
      <h1 className="font-serif text-3xl">Welcome, {user.role}</h1>
      <p className="text-gray-500 mt-2 font-sans uppercase tracking-widest text-xs">
        Teacher Management Portal
      </p>

      <button
        onClick={() => {
          localStorage.removeItem("scholarly_user");
          router.push("/");
        }}
        className="mt-10 text-xs font-bold border-b border-black"
      >
        LOG OUT
      </button>
    </div>
  );
}
