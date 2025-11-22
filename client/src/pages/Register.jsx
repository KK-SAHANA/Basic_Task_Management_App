import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";

export default function Register({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setMessage("Registration Successful! Redirecting to Login...");

      // Clear inputs
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        goToLogin();
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration Failed. Try again."
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white/30 p-4 rounded-full shadow-md">
            <FaUserPlus size={40} className="text-white" />
          </div>

          <h2 className="text-3xl font-bold text-white mt-4">Create Account</h2>
          <p className="text-white/80 mt-1 text-sm">Register to get started</p>
        </div>

        {message && (
          <p className="text-center text-white mb-4 bg-black/30 p-2 rounded">
            {message}
          </p>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg bg-white/30 text-white placeholder-white/60 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/30 text-white placeholder-white/60 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/30 text-white placeholder-white/60 outline-none"
          />

          <button className="mt-3 w-full py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition">
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
}
