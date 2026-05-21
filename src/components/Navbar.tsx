"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

const Navbar = () => {
  const pathname = usePathname();

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(false);

  // CHECK AUTH
  useEffect(() => {
    const token =
      localStorage.getItem("token");

    setIsLoggedIn(Boolean(token));
  }, [pathname]);

  // NAVIGATION LINKS
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },

    // SHOW ADMIN ONLY IF NOT LOGGED IN
    ...(!isLoggedIn
      ? [
          {
            name: "Admin",
            href: "/admin/login",
          },
        ]
      : []),

    // SHOW DASHBOARD ONLY IF LOGGED IN
    ...(isLoggedIn
      ? [
          {
            name: "Dashboard",
            href: "/admin/dashboard",
          },
        ]
      : []),
  ];

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    router.push("/");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-gray-200
        bg-white/80
        backdrop-blur-xl
      "
    >
      <nav className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-4"
          >
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
              <h1 className="text-2xl font-black text-gray-900">
                Polling System
              </h1>

              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Live Election Platform
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <div className="flex items-center gap-3">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    hidden md:flex
                    px-5
                    py-3
                    rounded-2xl
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-black text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* LIVE STATUS */}
            <div className="hidden lg:flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

              LIVE
            </div>

            {/* LOGOUT */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  text-sm
                  font-semibold
                  transition
                "
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;