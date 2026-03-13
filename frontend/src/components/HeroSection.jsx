import { useState, useEffect } from "react";

const slides = [
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1400&q=80",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1400&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80",
];

const stats = [
  { value: "2,400+", label: "Events Listed" },
  { value: "1.2M+", label: "Happy Attendees" },
  { value: "50+", label: "Cities Covered" },
  { value: "4.9 ★", label: "Rating" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-zinc-950">
      {/* Hero Slider */}
      <div className="relative w-full h-[630px] overflow-hidden">
        {/* Slides - only images change */}
        {slides.map((bg, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              src={bg}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}

        {/* Static Content - never changes */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-red-600 rounded-full px-4 py-1 mb-6 w-fit">
            <span className="text-red-500 text-xs font-bold tracking-widest">
              🔥 INDIA'S #1 EVENT PLATFORM
            </span>
          </div>

          <h1
            className="text-white font-black leading-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            Discover &
            <br />
            <span className="text-red-500">Book Live Events</span>
          </h1>

          <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-md">
            Concerts, tech summits, festivals and more — your next unforgettable
            experience is one click away.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-red-900/40">
              Explore Events →
            </button>
            <button className="border border-white/40 hover:border-white text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200">
              Sign Up Free
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-2 bg-red-500"
                  : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-800">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-4"
            >
              <span className="text-red-500 font-black text-3xl md:text-4xl mb-1">
                {stat.value}
              </span>
              <span className="text-zinc-500 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
