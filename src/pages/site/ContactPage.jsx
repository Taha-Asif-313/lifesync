"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen text-white p-8 max-w-7xl pt-20 mx-auto">
      <h1 className="text-4xl font-bold text-[#00ba0f] mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 outline-none text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 outline-none text-white"
        />
        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 outline-none text-white resize-none"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-linear-to-r from-[#00ba0f] to-lime-500 rounded-xl font-semibold hover:shadow-[#00ba0f]/25 transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
