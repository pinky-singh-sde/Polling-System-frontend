"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

const Footer = () => {
  const currentYear =
    new Date().getFullYear();

    const pathname = usePathname();

    const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(false);
    useEffect(() => {
        const token =
          localStorage.getItem("token");
      
        setIsLoggedIn(Boolean(token));
      }, [pathname]);

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-5 py-16">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  font-black
                  text-xl
                  shadow-lg
                "
              >
                P
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Polling System
                </h2>

                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Live Election Platform
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed max-w-sm">
              Professional realtime online
              polling system built with
              modern technologies for live
              election analytics and secure
              audience voting.
            </p>
          </div>

          {/* QUICK LINKS */}
     {/* QUICK LINKS */}
<div>
  <h3 className="text-lg font-bold text-gray-900 mb-6">
    Quick Links
  </h3>

  <div className="flex flex-col gap-3">
    {/* HOME */}
    <Link
      href="/"
      className={`
        px-4
        py-3
        rounded-2xl
        font-medium
        transition-all
        duration-200
        ${
          pathname === "/"
            ? "bg-black text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-black"
        }
      `}
    >
      Home
    </Link>

    {/* ADMIN */}
    {!isLoggedIn && (
      <Link
        href="/admin/login"
        className={`
          px-4
          py-3
          rounded-2xl
          font-medium
          transition-all
          duration-200
          ${
            pathname ===
            "/admin/login"
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-black"
          }
        `}
      >
        Admin Login
      </Link>
    )}

    {/* DASHBOARD */}
    {isLoggedIn && (
      <Link
        href="/admin/dashboard"
        className={`
          px-4
          py-3
          rounded-2xl
          font-medium
          transition-all
          duration-200
          ${
            pathname ===
            "/admin/dashboard"
              ? "bg-black text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-black"
          }
        `}
      >
        Dashboard
      </Link>
    )}
  </div>
</div>

          {/* SYSTEM STATUS */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              System Status
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between border rounded-2xl p-4">
                <span className="text-gray-700 font-medium">
                  Voting System
                </span>

                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                  Active
                </div>
              </div>

              <div className="flex items-center justify-between border rounded-2xl p-4">
                <span className="text-gray-700 font-medium">
                  Realtime Updates
                </span>

                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                  Live
                </div>
              </div>

              <div className="flex items-center justify-between border rounded-2xl p-4">
                <span className="text-gray-700 font-medium">
                  Admin Dashboard
                </span>

                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                  Online
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 border-t border-gray-200"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-gray-500 text-sm">
            © {currentYear} Online Live
            Polling System. All rights
            reserved.
          </p>

          <div className="flex items-center gap-3">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
              Next.js
            </div>

            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
              Express
            </div>

            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
              Socket.IO
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;