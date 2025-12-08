import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Registration from './../pages/auth/Registration';
import DashBoardLayout from "../layout/DashBoardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageLoan from "../pages/Manager/ManageLoan";
import AddLoan from "../pages/Manager/AddLoan";
import PendingLoan from './../pages/Manager/PendingLoan';
import ApproveLoan from './../pages/Manager/ApproveLoan';
import AllLoan from './../pages/allLoan/AllLoan';
import LoanDetails from "../pages/loanDetails/LoanDetails";
import LoanFrom from './../pages/LoanFrom/LoanFrom';
import MyLoan from '../pages/Borrower Dashboard/MyLoan';
import PrivateRoute from "./PrivateRoute";
import ManagerRout from "./ManagerRout";
import ManageUsers from "../pages/admin/ManageUsers";
import AllLoans from "../pages/admin/AllLoans";
import LoanApplication from './../pages/admin/LoanApplication';
import AdminRoute from "./AdminRoute";
import Profile from "../pages/userPrifile.jsx/Profile";
import AboutUs from './../pages/Aboutus';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-loan",
        element: <AllLoan />,
      },
      {
        path: "aboutus",
        element: <AboutUs/>,
      },
      {
        path: "apply-loan/:id",
        element: <LoanFrom />,
      },
      {
        path: "loan/:id",
        element: (
          <PrivateRoute>
            <LoanDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
    ],
  },

  {
    path: "dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "myloan",
        element: (
          <PrivateRoute>
            <MyLoan />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-loans",
        element: (
          <PrivateRoute>
            <ManagerRout>
              <ManageLoan />,
            </ManagerRout>
          </PrivateRoute>
        ),
      },
      {
        path: "add-loan",
        element: (
          <PrivateRoute>
            <ManagerRout>
              <AddLoan />
            </ManagerRout>
          </PrivateRoute>
        ),
      },
      {
        path: "pending-loans",
        element: (
          <PrivateRoute>
            <ManagerRout>
              <PendingLoan />
            </ManagerRout>
          </PrivateRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <PrivateRoute>
            <ManagerRout>
              <ApproveLoan />
            </ManagerRout>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allloans",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllLoans />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <LoanApplication />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        ),
      },
    ],
  },
]);