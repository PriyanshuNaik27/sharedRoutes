import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/v1/user/login`, form, {
        withCredentials: true,
      });
      onLoginSuccess?.();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const googleLogin = () => {
    
    window.location.href = `${backendUrl}/api/v1/user/auth/google`;
    console.log("Redirecting to Google OAuth...");
    console.log("redirect URL:", `${backendUrl}/api/v1/user/auth/google`);
  };
  

  // ... rest of your JSX remains the same
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

        <div className="flex flex-col items-center gap-4 p-6 ">
          <button
            onClick={googleLogin}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Log in with Google
          </button>
        </div>

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
