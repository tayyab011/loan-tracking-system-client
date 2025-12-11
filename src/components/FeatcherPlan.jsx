import React from 'react';
import Swal from 'sweetalert2';
const loanPlans = [
  {
    title: "Personal Loan",
    amount: "$5,000 - $50,000",
    interest: "5% - 10%",
    duration: "12 - 60 months",
  },
  {
    title: "Business Loan",
    amount: "$10,000 - $200,000",
    interest: "6% - 12%",
    duration: "12 - 72 months",
  },
  {
    title: "Education Loan",
    amount: "$1,000 - $30,000",
    interest: "4% - 8%",
    duration: "6 - 48 months",
  },
];
const haha=(loan)=>{
  Swal.fire(
    "Application Started!",
    `You have selected the ${loan.title}. Let's help you get the best loan option!`,
    "success"
  );

}
const FeatcherPlan = () => {
    return (
      <div className="w-full py-16 px-4 md:px-8 lg:px-16 b">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F887A]  text-center mb-10">
          Featured Loan Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loanPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-[#155C62] text-[#B5F6EB] p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center"
            >
              <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
              <p className="mb-1">Amount: {plan.amount}</p>
              <p className=" mb-1">Interest: {plan.interest}</p>
              <p className=" mb-4">Duration: {plan.duration}</p>
              <button
                onClick={() => haha(plan)}
                className="btn btn-md border-none bg-[#86A9AB] hover:bg-[#29A6A6] shadow-none font-semibold text-white hover:scale-105 transition duration-300 md:mb-0 mb-2"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default FeatcherPlan;