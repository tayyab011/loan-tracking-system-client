import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import useRole from '../hooks/useRole';
import "./nav.css"
const Navbar = () => {
  const { role } = useRole();
  console.log(role)
  const { user, logout } = use(AuthContext);
 
     const [theme, setTheme] = useState(() => {
       return localStorage.getItem("theme") || "autumn";
     });
     useEffect(() => {
       const html = document.querySelector("html");
       html.setAttribute("data-theme", theme);
       localStorage.setItem("theme", theme);
     }, [theme]);
    const link = (
      <>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li >
          <NavLink to="/all-loan">All-Loans</NavLink>
        </li>
        <li >
          <NavLink to="/aboutus">About Us</NavLink>
        </li>
        <li >
          <NavLink to="/contact">Contact</NavLink>
        </li>

        {user && (
          <li className="">
            {" "}
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        )}
      </>
    );
    const handleTheme = (checked) => {
      setTheme(checked ? "dark" : "autumn");
    };

    return (
      <div>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-[#155C62] text-[#B5F6EB] rounded-box z-10 mt-3 w-52 px-5 py-3 shadow"
              >
                {link}
              </ul>
            </div>
            <Link to='/' className="btn btn-ghost text-xl">
              <img
              className='w-8 h-8 rounded-full'
                src="https://t4.ftcdn.net/jpg/01/83/77/65/360_F_183776586_ETr3Lg7pmP2bw0dF2vyNlBaf93eM5TaA.jpg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{link}</ul>
          </div>
          <div className="navbar-end gap-4">
            <label className="ui-switch">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={(e) => handleTheme(e.target.checked)}
              />
              <div className="slider">
                <div className="circle"></div>
              </div>
            </label>
            {user ? (
              <>
                {/* <a onClick={logout} className="btn">
                  Logout
                </a> */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content text-[#B5F6EB] bg-[#155C62] rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <span className="py-2 font-black text-xl ">
                        {" "}
                        {user?.displayName}
                      </span>
                    </li>
                    <li className="hover:bg-[#B5F6EB] hover:text-white duration-500 rounded-full">
                      <a onClick={logout} className="font-bold">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {" "}
                <Link to="/login" className="btn">
                  Login
                </Link>
                <Link to="register" className="btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default Navbar;