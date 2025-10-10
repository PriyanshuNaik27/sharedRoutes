import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Register = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${backendUrl}/api/v1/user/register`, form, {
        withCredentials: true,
      });
      setMessage(res.data.message || "Registered successfully!");
      onLoginSuccess?.();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white dark:bg-gray-800 border rounded-md shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">Create your account</h2>
        <InputField label="Username" name="userName" type="text" value={form.userName} onChange={handleChange} placeholder="Enter username" />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "Creating..." : "Register"}
        </button>
  {message && <p className="mt-3 text-center text-gray-700 dark:text-gray-300">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
