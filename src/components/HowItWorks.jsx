import React from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FcDonate } from "react-icons/fc";
import { VscGitStashApply } from "react-icons/vsc";
import { PiTimerFill } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
export default function HowItWorks() {
  const steps = [
    {
      title: "Browse Loan Options",
      description:
        "Explore a variety of loan plans tailored to your needs with clear interest rates and terms.",
      icon: <FcDonate className="w-8 h-8 text-[#1F887A]" />,
    },
    {
      title: "Apply Easily",
      description:
        "Fill out a simple application form with your basic information and submit within minutes.",
      icon: <VscGitStashApply className="w-8 h-8 text-[#1F887A]" />,
    },
    {
      title: "Get Approved Fast",
      description:
        "Our managers review your application quickly and notify you once it's approved.",
      icon: <PiTimerFill className="w-8 h-8 text-[#1F887A]" />,
    },
    {
      title: "Receive Your Funds",
      description:
        "After approval and payment, your loan amount will be disbursed without delays.",
      icon: <GiReceiveMoney className="w-8 h-8 text-[#1F887A]" />,
    },
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 text-[#1F887A]">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F887A] mb-4"
        >
          How It Works
        </motion.h2>

        <p className=" max-w-2xl mx-auto font-bold  text-sm md:text-base">
          Follow these simple steps to apply for a loan quickly and securely.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-[#155C62] text-[#B5F6EB] p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-[#B5F6EB] flex flex-col items-center text-center"
          >
            <div className="mb-3">{step.icon}</div>

            <h3 className="text-lg md:text-xl font-bold  mb-2">{step.title}</h3>

            <p className=" text-sm leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
