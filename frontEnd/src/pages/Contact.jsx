import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import rollSweet from "../assets/sweets2.webp";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/contact", formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className=" flex items-center justify-center px-4 mt-10">
      <div className="w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 p-8 flex flex-col bg-black rounded-2xl shadow-2xl justify-center">
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-6">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="mb-1 text-sm">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:border-yellow-500"
              ></textarea>
            </div>

            {message && (
              <p className="text-center text-red-500 text-sm">{message}</p>
            )}

            <div className="flex justify-between gap-4 mt-4">
              <button className="w-full bg-yellow-600 py-2 rounded-lg font-semibold hover:bg-transparent hover:text-yellow-500 hover:border border-yellow-600 transition">
                Submit
              </button>

              <NavLink to="/" className="w-full">
                <button className="w-full bg-gray-700 py-2 rounded-lg font-semibold hover:bg-transparent hover:text-gray-300 hover:border border-gray-500 transition">
                  Back
                </button>
              </NavLink>
            </div>
          </form>
        </div>
        <div className="hidden md:flex md:w-1/2 items-center justify-center  p-6">
          <img src={rollSweet} alt="Sweets" className="w-80 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
