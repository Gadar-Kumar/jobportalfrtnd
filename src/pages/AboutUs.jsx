import React from "react";
import { Users, Briefcase, TrendingUp, Heart } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    { name: "John Doe", role: "CEO & Founder", img: "https://via.placeholder.com/150" },
    { name: "Jane Smith", role: "CTO", img: "https://via.placeholder.com/150" },
    { name: "Mark Wilson", role: "Head of Marketing", img: "https://via.placeholder.com/150" },
  ];

  const cards = [
    {
      title: "Our Mission",
      icon: <Users size={36} className="text-emerald-500" />,
      desc: "Empower job seekers and employers with a platform that simplifies recruitment and ensures the best match for every opportunity.",
    },
    {
      title: "Our Vision",
      icon: <TrendingUp size={36} className="text-teal-500" />,
      desc: "To become the most trusted job platform where talent and opportunities meet effortlessly across industries.",
    },
    {
      title: "Our Values",
      icon: <Heart size={36} className="text-pink-500" />,
      desc: "Integrity, transparency, and innovation guide everything we do.",
    },
  ];

  return (
    <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-24 rounded-xl shadow-xl overflow-hidden mb-16">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fadeIn">
            About Us
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto animate-fadeIn delay-200">
            Connecting talented individuals with the right opportunities, making job search and hiring seamless, efficient, and transparent.
          </p>
        </div>
        <div className="absolute inset-0 opacity-20 bg-white/20 animate-pulse rounded-xl"></div>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center"
          >
            <div className="mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-2">
          Email: <span className="font-medium text-gray-800">contact@jobportal.com</span>
        </p>
        <p className="text-gray-600 mb-2">
          Phone: <span className="font-medium text-gray-800">+91 98765 43210</span>
        </p>
        <p className="text-gray-600">
          Address: <span className="font-medium text-gray-800">123, Business Avenue, Delhi, India</span>
        </p>
      </section>
    </div>
  );
};

export default AboutUs;