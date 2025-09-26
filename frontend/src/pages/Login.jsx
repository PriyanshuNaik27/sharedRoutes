import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // for redirecting

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/v1/user/login`, form, {
        withCredentials: true,
      });
      setMessage(res.data.message || "Logged in successfully!");
      // Optional: redirect after successful login
      // navigate("/"); 
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-96 p-6 border rounded-md shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Login
        </button>

        {message && <p className="mt-3 text-red-500">{message}</p>}

        {/* Redirect to Register */}
        <p className="mt-4 text-center">
  Don't have an account?{" "}
  <span
    className="text-blue-500 underline cursor-pointer"
    onClick={() => navigate("/register")}
  >
    Register here
  </span>
</p>
      </form>
    </div>
  );
};

export default Login;
