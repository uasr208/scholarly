"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

export default function Home() {
  const [role, setRole] = useState("teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Student portal search input value, used to join a teacher's public broadcast page
  const [searchId, setSearchId] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email.includes("@")) {
      setEmailError("Please enter a valid academic email format.");
      setIsLoading(false);
      return;
    }
    setEmailError("");

    try {
      const user = await authService.login(email, password, role);
      if (user.role === "teacher") {
        router.push("/teacher/dashboard");
      } else {
        router.push("/principal/dashboard");
      }
    } catch (err) {
      setEmailError(err || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle public student access by redirecting to the teacher-specific live view.
  const handleJoinLive = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      // Redirect to the dynamic student-facing route using a sanitized teacher ID.
      router.push(`/live/${searchId.trim()}`);
    } else {
      alert("Please enter a valid Teacher ID.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] p-4 space-y-8">
      {/* Faculty login form for teacher and principal access */}
      <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-sm border border-black/5">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold italic">Scholarly</h1>
          <p className="text-[10px] tracking-[0.2em] text-gray-400 mt-2 font-sans uppercase font-bold">
            Editorial Portal Access
          </p>
        </div>

        {/* Role Selector */}
        <div className="mb-8">
          <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3 block text-center">
            Select Position
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole("teacher")}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${role === "teacher" ? "border-black bg-black/5 shadow-sm" : "border-gray-100 text-gray-400"}`}
            >
              <span className="text-xl">🎓</span>
              <span className="font-bold text-sm">Teacher</span>
            </button>
            <button
              onClick={() => setRole("principal")}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${role === "principal" ? "border-black bg-black/5 shadow-sm" : "border-gray-100 text-gray-400"}`}
            >
              <span className="text-xl">🏛️</span>
              <span className="font-bold text-sm">Principal</span>
            </button>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2 block">
            Email Address
          </label>
          <div
            className={`relative flex items-center border-2 rounded-xl px-4 py-4 transition-all ${emailError ? "border-red-600" : "border-gray-100"}`}
          >
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none bg-transparent font-medium text-sm"
              placeholder="name@school.edu"
            />
            {emailError && (
              <span className="text-red-600 font-bold text-lg">!</span>
            )}
          </div>
          {emailError && (
            <p className="text-[11px] text-red-600 mt-2 font-medium">
              {emailError}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block">
              Password
            </label>
            <button className="text-[10px] font-bold text-gray-400 uppercase hover:text-black transition-colors">
              Forgot?
            </button>
          </div>
          <div className="relative flex items-center border-2 border-gray-100 rounded-xl px-4 py-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
              placeholder="••••••••"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-black"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
        </div>

        <button
          disabled={isLoading}
          onClick={handleLogin}
          className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-900 transition-all disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <span className="tracking-[0.2em] text-xs">LOG IN</span>
          )}
        </button>
      </div>

      {/* Public portal section for student access without authentication */}
      <div className="w-full max-w-md bg-[#f2f1ec]/50 p-10 rounded-[40px] border border-black/5 text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
          Student / Public Portal
        </p>

        <form onSubmit={handleJoinLive} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Teacher ID (e.g., utkarsh-208)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full p-4 bg-white border border-black/5 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all text-center"
          />
          <button
            type="submit"
            className="w-full py-4 border border-black text-black rounded-2xl font-bold text-[10px] tracking-widest uppercase hover:bg-black hover:text-white transition-all"
          >
            Watch Live Broadcast
          </button>
        </form>

        <p className="mt-6 text-[11px] text-gray-400 leading-relaxed">
          No authentication required for students. <br /> Enter the ID provided
          by your faculty.
        </p>
      </div>
    </main>
  );
}
