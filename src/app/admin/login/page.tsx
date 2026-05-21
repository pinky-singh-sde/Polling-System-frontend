"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import API from "@/services/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        toast.error(
          "Please fill all fields"
        );

        return;
      }

      setLoading(true);

      const response = await API.post(
        "/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      toast.success("Login successful");

      router.push("/admin/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[32px] overflow-hidden shadow-2xl">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between bg-black text-white p-14">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-6">
              Admin Panel
            </p>

            <h1 className="text-6xl font-black leading-tight">
              Online Live
              <br />
              Polling System
            </h1>

            <p className="text-gray-400 text-lg mt-8 leading-relaxed">
              Monitor election results in
              real-time, manage nominees,
              and track live audience voting
              analytics securely.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="border border-gray-700 px-5 py-3 rounded-2xl">
              Real-Time Analytics
            </div>

            <div className="border border-gray-700 px-5 py-3 rounded-2xl">
              Secure Admin Access
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
                Welcome Back
              </p>

              <h2 className="text-5xl font-black text-gray-900">
                Admin Login
              </h2>

              <p className="text-gray-500 mt-4 text-lg">
                Enter your credentials to
                access the dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {/* USERNAME */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    text-black
                    outline-none
                    focus:border-black
                    transition
                  "
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password"
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    text-black
                    py-4
                    outline-none
                    focus:border-black
                    transition
                  "
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="
                  mt-4
                  bg-black
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  text-lg
                  transition-all
                  hover:opacity-90
                  active:scale-[0.98]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading
                  ? "Logging in..."
                  : "Login to Dashboard"}
              </button>
            </div>

            {/* FOOTER */}
            <div className="mt-10 text-sm text-gray-400">
              Protected admin access for
              election monitoring system.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}