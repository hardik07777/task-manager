import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm border-b border-slate-200"
          : "bg-white"
      }`}
    >
      <div
        className={`w-full px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className={`rounded-xl bg-slate-900 text-white flex items-center justify-center font-semibold transition-all duration-300 ${
              scrolled
                ? "h-8 w-8 text-sm"
                : "h-10 w-10 text-base"
            }`}
          >
            T
          </div>

          <div>
            <h1
              className={`font-bold text-slate-900 leading-none transition-all duration-300 ${
                scrolled
                  ? "text-lg"
                  : "text-2xl"
              }`}
            >
              Task Manager
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              Personal workspace
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3">
            <div
              className={`rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-semibold text-slate-700 transition-all duration-300 ${
                scrolled
                  ? "h-8 w-8 text-xs"
                  : "h-10 w-10 text-sm"
              }`}
            >
              {initial}
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
