"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-[#20467e] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#20467e]">
            MES Services Monitoring
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Username</label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#20467e]
                         focus:border-[#20467e]"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#20467e]
                         focus:border-[#20467e]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#20467e] hover:bg-[#183866]
                     text-white py-2.5 rounded-md text-sm font-medium
                     transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}
