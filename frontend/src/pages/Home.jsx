import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
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
    <div>
      <Navbar />
      <h1>Events</h1>

      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.city}</p>
          <p>Event : {event.price}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Home;
