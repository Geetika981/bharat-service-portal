import React, { useState } from "react";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../redux/slice/authSlice";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      dispatch(setUser(res.data));
      const role = res.data.role;
      if (role === "user") navigate("/user");
      else if (role === "provider") navigate("/provider/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col">
    <Navbar/>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600">
            Welcome Back
          </h2>

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
