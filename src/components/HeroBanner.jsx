import { Link, useNavigate } from "react-router";

const HeroBanner = () => {
  const navigate=useNavigate()
  return (
    <div className="hero ">
      <div className="hero-content flex-col lg:flex-row">
        <div
          className="w-full h-[550px] rounded-lg shadow-2xl bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/loan1.jpg')",
            backgroundPosition: "center 30%", // <-- niche ashbe
          }}
        ></div>
        <div className="flex-1 text-[#1F887A]">
          {/*  <h1 className="text-5xl font-bold">
            Fast, Secure & Hassle-Free Loan Solutions
          </h1> */}
          <span className="text-rotate md:text-7xl text-2xl  text-[#1F887A] font-black my-5">
            <span className="justify-items-center">
              <span>Fast Secure </span>
              <span> Hassle-Free </span>
              <span>Loan Solutions</span>
            </span>
          </span>
          <p className="py-6 font-semibold">
            Get quick access to personal and business loans with transparent
            interest rates, simple documentation, and a seamless online process.
            Manage your finances confidently with our trusted digital loan
            platform built for speed, clarity, and reliability.
          </p>

          <div className="flex gap-4">
            <button
              className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] shadow-none font-semibold text-white hover:scale-105 transition duration-300 md:mb-0 mb-2"
              onClick={() => navigate("/all-loan")}
            >
              Explore Loans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
