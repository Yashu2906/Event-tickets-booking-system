import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState("Events");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-black px-6 py-3">
        <div className="flex items-center justify-between px-10 ">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Book<span className="text-red-500">My</span>Event
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {/* Events - active with red border */}
            <button
              onClick={() => setActive("Events")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium  transition-all ${
                active === "Events"
                  ? "border border-red-500 text-[#AAAAAA]"
                  : "text-[#AAAAAA]"
              }`}
            >
              Events
            </button>

            {/* Login - bordered */}
            <button
              onClick={() => setActive("Login")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all ${
                active === "Login"
                  ? "border border-red-500 text-[#AAAAAA]"
                  : "border-zinc-700 text-[#AAAAAA] "
              }`}
            >
              Login
            </button>

            {/* Register - solid red */}
            <button className="px-4 py-1.5 rounded-md text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-all">
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
            {["Events", "My Bookings", "Login"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActive(item);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                  active === item
                    ? "border-red-500 text-white"
                    : "border-zinc-700 text-zinc-300 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
            <button className="w-full text-left px-4 py-2 rounded-md text-sm font-bold bg-red-600 text-white">
              Register
            </button>
          </div>
        )}
      </nav>

      {/* Background to match image */}
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
    </>
  );
};

export default Navbar;
