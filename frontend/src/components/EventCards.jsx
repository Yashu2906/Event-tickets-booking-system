import React, { useEffect, useState } from "react";
import API from "../services/api";

const categoryColors = {
  MUSIC: "bg-purple-600",
  TECHNOLOGY: "bg-blue-500",
  FESTIVAL: "bg-green-500",
  SPORTS: "bg-yellow-600",
};

const EventCards = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-zinc-950 px-6 md:px-16 py-14">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-red-500 text-xs font-bold tracking-widest uppercase mb-1">
            Handpicked For You
          </p>
          <h2 className="text-white text-3xl font-black">Trending Events</h2>
        </div>
        <button className="border border-red-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 whitespace-nowrap mt-2">
          View All →
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {events.map((event) => {
          const category = event.category?.toUpperCase() || "MUSIC";
          const badgeColor = categoryColors[category] || "bg-red-600";
          const filledPercent = event.filled || 0;
          const seatsLeft = event.seatsLeft || event.seats_left || 0;

          return (
            <div
              key={event._id || event.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 
hover:border-red-600 transition-all duration-300 flex flex-col 
transform hover:scale-101 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <img
                  src={
                    event.image ||
                    event.imageUrl ||
                    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80"
                  }
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Selling Fast Badge */}
                {event.hot || filledPercent >= 90 ? (
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    🔥 SELLING FAST
                  </div>
                ) : null}
                {/* Category Badge */}
                <div
                  className={`absolute bottom-3 left-3 ${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}
                >
                  {category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-white font-bold text-base mb-2 leading-snug">
                  {event.title}
                </h3>

                {/* Location */}
                <p className="text-zinc-400 text-xs flex items-center gap-1 mb-1">
                  <span>📍</span> {event.location || event.city}
                </p>

                {/* Date */}
                <p className="text-zinc-400 text-xs flex items-center gap-1 mb-4">
                  <span>📅</span> {event.date || event.datetime}
                </p>

                {/* Seats + Fill Bar */}
                <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
                  <span>{seatsLeft.toLocaleString()} seats left</span>
                  <span className="text-zinc-400">{filledPercent}% filled</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-1.5 mb-4">
                  <div
                    className="bg-red-500 h-1.5 rounded-full"
                    style={{ width: `${filledPercent}%` }}
                  />
                </div>

                {/* Price + Book */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-zinc-500 text-xs mb-0.5">
                      Starting from
                    </p>
                    <p className="text-red-500 font-black text-lg">
                      ₹{event.price}
                    </p>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EventCards;
