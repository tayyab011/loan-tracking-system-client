import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import useRole from '../hooks/useRole';

const Navbar = () => {
  const {role}=useRole()
  console.log(role)
  const { user, logout } = use(AuthContext);
   /*   const [theme, setTheme] = useState(
       localStorage.getItem("theme") || "autumn"
     ); */
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
        <li className="">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="">
          <NavLink to="/">All-Loans</NavLink>
        </li>
        <li className="">
          <NavLink to="/">About Us</NavLink>
        </li>
        <li className="">
          <NavLink to="/">Contact</NavLink>
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
                className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 px-5 py-3 shadow"
              >
                {link}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{link}</ul>
          </div>
          <div className="navbar-end gap-4">
            {/*   <label class="ui-switch">
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
              />
              <div class="slider">
                <div class="circle"></div>
              </div>
            </label> */}
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
                <a onClick={logout} className="btn">
                  Logout
                </a>
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