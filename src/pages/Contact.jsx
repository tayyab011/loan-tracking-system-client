import React from "react";
import Swal from "sweetalert2";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    Swal.fire(
      "Message Sent!",
      `Thank you, ${name}. We will contact you soon.`,
      "success"
    );
    e.target.reset();
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 ">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1F887A] text-center mb-10">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <div className="bg-[#155C62] p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-[#B5F6EB]">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="input input-bordered w-full"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="input input-bordered w-full"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
              className="textarea textarea-bordered w-full"
            ></textarea>

            <button
              type="submit"
              className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] shadow-none font-semibold text-white hover:scale-105 transition duration-300 md:mb-0 mb-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="map"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.023651675835!2d90.35785387477082!3d23.781190687790614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf548e3a8df9%3A0xf531ff61448f602c!2sZakir%20Hossain%20Road%2C%20Mohammadpur%2C%20Dhaka%201207!5e0!3m2!1sen!2sbd!4v1704721000000`}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
