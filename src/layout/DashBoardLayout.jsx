import React from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";

const DashBoardLayout = () => {
  const {role}=useRole()
  return (
    <div className="drawer lg:drawer-open">
      {/* toggle for mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
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
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200">
          <li>
            <Link to="/">🏠 Home</Link>
          </li>
          <li>
            <Link to="/dashboard"> Dashboard</Link>
          </li>
          {role === "manager" && (
            <>
              <li>
                <Link to="/dashboard/add-loan">➕ Add Loan</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-loans">📋 Manage Loans</Link>
              </li>
              <li>
                <Link to="/dashboard/pending-loans">
                  📋 Pending Applications
                </Link>
              </li>
              <li>
                <Link to="/dashboard/approved-loans">
                  📋 Approved Applications
                </Link>
              </li>
            </>
          )}
          {role === "borrower" && (
            <>
              <li>
                <Link to="/dashboard/myloan">➕ My Loans</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/dashboard/myProfile">➕ My Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
