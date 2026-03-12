import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black px-6 py-4">
      <div className="flex items-center justify-between px-10">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">
            Book<span className="text-red-500">My</span>Event
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {/* Events */}
          <button
            onClick={() => navigate("/")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              isActive("/")
                ? "border border-red-500 text-[#AAAAAA]"
                : "text-[#AAAAAA] hover:text-white"
            }`}
          >
            Events
          </button>

          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all ${
              isActive("/login")
                ? "border-red-500 text-[#AAAAAA]"
                : "border-zinc-700 text-[#AAAAAA] hover:text-white"
            }`}
          >
            Login
          </button>

          {/* Register */}
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-1.5 rounded-md text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-all"
          >
            Register
          </button>
        </div>

        {/* Hamburger - mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 border-t border-zinc-800 pt-4">
          <button
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium border transition-all ${
              isActive("/")
                ? "border-red-500 text-white"
                : "border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium border transition-all ${
              isActive("/login")
                ? "border-red-500 text-white"
                : "border-zinc-700 text-zinc-300 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/register");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 rounded-md text-sm font-bold bg-red-600 text-white"
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
