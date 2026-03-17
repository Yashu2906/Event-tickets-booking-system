import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterPage = () => {
  const [accountType, setAccountType] = useState("User");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" min-h-screen bg-black flex flex-col items-center py-10 px-4 ">
        {/* Icon + Heading */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-white text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-zinc-500 text-sm">Join BookMyEvent today</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-zinc-400 text-xs font-semibold tracking-widest uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-zinc-400 text-xs font-semibold tracking-widest uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-zinc-400 text-xs font-semibold tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleRegister}
            className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold py-3.5 rounded-lg text-sm transition-all duration-200 tracking-wide"
          >
            Create Account →
          </button>
        </div>

        {/* Login link */}
        <p className="text-zinc-500 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-red-500 hover:text-red-400 font-medium transition-colors"
          >
            Login
          </a>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
