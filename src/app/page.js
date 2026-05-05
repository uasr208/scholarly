"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // To move between pages
import { authService } from "@/services/auth.service"; // Import your service

export default function Home() {
  const [role, setRole] = useState("teacher");
  const [email, setEmail] = useState("invalid-email-format"); // Mocking the error from your screenshot
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // This state will control if the red error UI shows up
  const [emailError, setEmailError] = useState(
    "Please enter a valid academic email format.",
  );

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // This is where handleLogin lives!
  const handleLogin = async () => {
    setIsLoading(true);
    setEmailError("");

    try {
      const user = await authService.login(email, password, role);

      // Navigate based on the role we saved in state
      if (user.role === "teacher") {
        router.push("/teacher/dashboard");
      } else {
        router.push("/principal/dashboard");
      }
    } catch (err) {
      setEmailError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-sm border border-black/5">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold italic">Scholarly</h1>
          <p className="text-[10px] tracking-[0.2em] text-gray-400 mt-2 font-sans uppercase font-bold">
            Editorial Portal Access
          </p>
        </div>

        {/* Role Selector (Keep your working code here) */}
        <div className="mb-8">
          <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3 block">
            Select Position
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole("teacher")}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${role === "teacher" ? "border-black bg-black/5" : "border-gray-100"}`}
            >
              <span className="text-xl">🎓</span>{" "}
              <span className="font-bold text-sm">Teacher</span>
            </button>
            <button
              onClick={() => setRole("principal")}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${role === "principal" ? "border-black bg-black/5" : "border-gray-100"}`}
            >
              <span className="text-xl">🏛️</span>{" "}
              <span className="font-bold text-sm">Principal</span>
            </button>
          </div>
        </div>

        {/* Email Address Field */}
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
            <button className="text-[10px] font-bold text-gray-400 uppercase hover:text-black">
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
              className="text-gray-400 text-lg hover:text-black"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
        </div>

        {/* Placeholder for the Login Button */}
        {/* Login Button */}
        <button
          disabled={isLoading}
          onClick={handleLogin}
          className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              {/* Simple CSS Spinner */}
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="tracking-[0.2em] text-xs">
                AUTHENTICATING...
              </span>
            </>
          ) : (
            <span className="tracking-[0.2em] text-xs">LOG IN</span>
          )}
        </button>

        {/* Footer Link */}
        <p className="text-center mt-10 text-[13px] text-gray-500">
          New to the editorial team?{" "}
          <span className="font-bold text-black cursor-pointer hover:underline">
            Apply for Access
          </span>
        </p>
      </div>
    </main>
  );
}
