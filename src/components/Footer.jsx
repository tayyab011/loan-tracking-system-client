import React from "react";
import { Link } from "react-router";
import { CiFacebook } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className=" py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img
            className="w-8 h-8 rounded-full"
            src="https://t4.ftcdn.net/jpg/01/83/77/65/360_F_183776586_ETr3Lg7pmP2bw0dF2vyNlBaf93eM5TaA.jpg"
            alt="logo"
          />
          <p className="text-sm leading-relaxed">
            Your trusted platform for fast, secure, and flexible loan solutions.
            Apply online, get quick approval, and achieve your financial goals.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#1F887A] mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#1F887A] cursor-pointer">
              <Link to="/aboutus">About Us</Link>
            </li>
            <li className="hover:text-[#1F887A] cursor-pointer">
              {" "}
              <Link to="/contact">Contact</Link>
            </li>
            <li className="hover:text-[#1F887A] cursor-pointer">
              {" "}
              <Link to="/all-loan">All Loans</Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-semibold text-[#1F887A] mb-3">
            Follow Us
          </h3>
          <div className="flex items-center gap-4">
            <a className="hover:text-[#1F887A]">
              <CiFacebook size={20} />
            </a>

            <a className="hover:text-[#1F887A]">
              <FaLinkedinIn size={20} />
            </a>
          
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-[#1F887A] font-bold mt-8 border-t pt-5">
        © {new Date().getFullYear()} LoanEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
