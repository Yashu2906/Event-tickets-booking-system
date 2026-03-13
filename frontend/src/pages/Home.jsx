import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import EventCards from "../components/EventCards";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <EventCards />

      <Footer />
    </div>
  );
};

export default Home;
