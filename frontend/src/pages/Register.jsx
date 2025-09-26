import React, { useState } from "react";
import InputField from "../components/InputField";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Register = () => {
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${backendUrl}/api/v1/user/register`, form, {
      withCredentials: true,
    });

    // Instead of redirect, just log the response
    console.log("Response from backend:", res.data);

    setMessage(res.data.message || "Registered successfully!");

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    setMessage(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-6 border rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <InputField label="Username" name="userName" type="text" value={form.userName} onChange={handleChange} placeholder="Enter username" />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Register
        </button>
        {message && <p className="mt-3 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
