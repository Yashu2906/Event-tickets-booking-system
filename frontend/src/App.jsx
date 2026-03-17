import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import MyBookings from "./pages/MyBookings";
import EventDetails from "./pages/EventDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
