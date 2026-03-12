import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 px-17 py-12">
      <div className="max-w-8xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Book<span className="text-red-500">My</span>Event
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              India's premier event discovery & booking platform. Find and book
              tickets for concerts, sports, tech summits, and more.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">
              Platform
            </h4>
            <ul className="flex flex-col gap-3">
              {["Browse Events", "My Bookings"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-zinc-500 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">
              Account
            </h4>
            <ul className="flex flex-col gap-3">
              {["Login", "Register"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-zinc-500 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">
              Categories
            </h4>
            <ul className="flex flex-col gap-3">
              {["Music", "Technology", "Festival", "Sports"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-zinc-500 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-sm">
            © 2025 BookMyEvent. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm">
            Made with <span className="text-red-500">❤</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
