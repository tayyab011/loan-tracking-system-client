import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DashBoardLayout = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return <Loader/>
  }
  return (
    <div>
      <Navbar />
      <div className="drawer lg:drawer-open ">
        {/* toggle for mobile */}
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle "
        />

        {/* Page content */}
        <div className="drawer-content flex flex-col ">
          {/* Mobile Navbar */}
          <div className="navbar bg-base-200 lg:hidden">
            <div className="flex-none">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-square btn-ghost"
              >
                ☰
              </label>
            </div>
            <div className="flex-1 px-2 text-xl font-semibold">Dashboard</div>
          </div>

          {/* Main content */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side ">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 min-h-full bg-[#155C62]">
            <li>
              <Link to="/">🏠 Home</Link>
            </li>
            {/* <li>
              <Link to="/dashboard"> Dashboard</Link>
            </li> */}
            {role === "manager" && (
              <>
                <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? " font-black text-base " : null
                    }
                    to="/dashboard/add-loan"
                  >
                    ➕ Add Loan
                  </NavLink>
                </li>
                <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? " font-black text-base " : null
                    }
                    to="/dashboard/manage-loans"
                  >
                    📋 Manage Loans
                  </NavLink>
                </li>
                <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? " font-black text-base " : null
                    }
                    to="/dashboard/pending-loans"
                  >
                    📋 Pending Applications
                  </NavLink>
                </li>
                <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? " font-black text-base " : null
                    }
                    to="/dashboard/approved-loans"
                  >
                    📋 Approved Applications
                  </NavLink>
                </li>
              </>
            )}
            {role === "borrower" && (
              <>
                <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
                  <Link to="/dashboard/myloan">➕ My Loans</Link>
                </li>
              </>
            )}
            {role === "admin" && (
              <>
                <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
                  <NavLink
                className={({ isActive }) =>
                  isActive ? " font-black text-base" : null
                } to="/dashboard/manage-users">➕ Manage User</NavLink>
                </li>
                <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
                  <NavLink
                className={({ isActive }) =>
                  isActive ? " font-black text-base" : null
                } to="/dashboard/allloans">➕ All Loans</NavLink>
                </li>
                <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
                  <NavLink
                className={({ isActive }) =>
                  isActive ? " font-black text-base" : null
                } to="/dashboard/loan-applications">
                    ➕ Loan Application
                  </NavLink>
                </li>
              </>
            )}
            <li className="hover:bg-[#1F887A] w-full text-[#B5F6EB] rounded-full border-0 ">
              <NavLink
                className={({ isActive }) =>
                  isActive ? " font-black text-base" : null
                }
                to="/dashboard/myProfile"
              >
                ➕ My Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
