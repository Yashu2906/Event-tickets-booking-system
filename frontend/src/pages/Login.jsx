import { useState } from "react";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex flex-col items-center py-10 px-4">
        {/* Icon + Heading */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">👋</div>
          <h1 className="text-white text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-zinc-500 text-sm">Log in to your account</p>
        </div>

        {/* Card */}
        <div
          className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          style={{ boxShadow: "0 0 60px 10px rgba(220,38,38,0.08)" }}
        >
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
          <div className="mb-7">
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

          {/* Login Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg text-sm transition-all duration-200 tracking-wide">
            Login →
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-zinc-500 text-sm mt-6">
          Don't have an account?{" "}
          <a
            href="register"
            className="text-red-500 hover:text-red-400 font-medium transition-colors"
          >
            Sign up
          </a>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
