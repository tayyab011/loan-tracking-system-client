import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <div className="w-full bg-[#6847B4] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.getzype.com/wp-content/uploads/2024/08/model-house-pile-coins-businessman-holding-coins-real-estate-investment-ideas-home-loans-new-home-loans-lowinterest-rates-homes-1-1.png.webp')",
             
          }}
        ></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Make Employee Loan Management Easy for <br /> You and Your Team
        </h1>

        <p className="text-white/90 max-w-2xl mx-auto mt-6 text-lg">
          Try the KAISPE Employee Loan Management App – it makes loan requests
          easy with automation, cuts down on paperwork, keeps things clear, and
          helps keep your employees happy.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="btn btn-primary rounded-full px-8 text-white">
            <Link to="/all-loan"> Book a Demo</Link>
          </button>

          {/*  <button className="flex items-center gap-2 text-white hover:text-gray-200">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
              ▶
            </span>
            Watch Intro Video
          </button> */}
        </div>

        {/* Phone / Mockup Images */}
        <div className="flex justify-center mt-16 gap-8">
          <img
            src="https://www.pnc.com/content/dam/pnc-thought-leadership/small-business/managing-business-finances/pnc_insights_sb_business-loan-vs-line-of-credit-difference.jpg"
            className="w-40 md:w-60 h-[380px] object-cover rounded-xl drop-shadow-2xl"
          />

          <img
            src="https://cdn.corporatefinanceinstitute.com/assets/Loans-1-1024x666.jpeg"
            className="w-40 md:w-60 h-[380px] object-cover rounded-xl drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
