import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // React components
import "swiper/css"; // base styles
import "swiper/css/pagination"; // pagination styles
import "swiper/css/autoplay"; // optional

// Import modules directly
import { Pagination, Autoplay } from "swiper/modules";

const reviews = [
  {
    name: "John Doe",
    role: "Entrepreneur",
    feedback:
      "The loan process was seamless and fast. Highly recommend this platform!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    role: "Freelancer",
    feedback:
      "Applying for a loan has never been easier. Excellent customer support!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Brown",
    role: "Small Business Owner",
    feedback:
      "Fast approval and great customer service. I got my funds in no time!",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Emily Johnson",
    role: "Teacher",
    feedback:
      "The platform is very user-friendly. Loved the step-by-step guidance.",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "David Wilson",
    role: "Software Developer",
    feedback:
      "Transparent process with clear instructions. Highly trustworthy!",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Sophia Lee",
    role: "Designer",
    feedback: "Quick response from the team and easy to submit my application.",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    name: "James Taylor",
    role: "Entrepreneur",
    feedback:
      "Efficient and reliable. My loan was approved and disbursed fast!",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];


export default function CustomerReviewsPage() {
  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 ">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F887A] text-center mb-10">
        Customer Feedback
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        autoplay={{ delay: 1700, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 1.2, spaceBetween: 20 },
          768: { slidesPerView: 1.5, spaceBetween: 25 },
          1024: { slidesPerView: 2.2, spaceBetween: 30 },
          1280: { slidesPerView: 2.5, spaceBetween: 30 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#155C62] text-[#B5F6EB] p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold  mb-1">
                {review.name}
              </h3>
              <p className="text-sm  mb-2">{review.role}</p>
              <p className=" text-sm">{review.feedback}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
