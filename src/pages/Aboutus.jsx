import React from "react";
import tay from "/tay.png"
const teamMembers = [
  {
    name: "Md Tayyab",
    role: "Founder & MERN Stack Developer",
    img: tay ,
  },
  {
    name: "Ayesha Khan",
    role: "UI/UX Designer",
    img: "https://img.freepik.com/free-photo/female-web-designer-office_23-2149749862.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Rahim Uddin",
    role: "Backend Engineer",
    img: "https://thumbs.dreamstime.com/b/black-software-programmer-workplace-portrait-african-american-man-as-software-engineer-looking-camera-posing-259365851.jpg",
  },
  {
    name: "Sara Islam",
    role: "Project Manager",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChXpQ1tNLKfmgklNh-8RVYrWS6hYhEKIHjQ&s",
  },
];

const AboutUs = () => {
  return (
    <div className=" ">

      <section className="py-20 text-center px-6">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          We are a modern Loan Management Platform focused on transparency,
          security, and fast approvals — helping borrowers and lenders connect
          with confidence.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6 mb-20">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-400">
            To make loan processing simple, transparent, and accessible for
            everyone using secure digital solutions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">🚀 Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-400">
            To become a trusted digital finance platform empowering users
            through smart loan management systems.
          </p>
        </div>
      </section>

 
      <section className="px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className=" rounded-xl shadow hover:shadow-xl transition overflow-hidden text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
