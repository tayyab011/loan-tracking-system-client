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
        path: "apply-loan/:id",
        element: <LoanFrom/>,
      },
      {
        path: "loan/:id",
        element: <LoanDetails />,
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
        element: <Dashboard />,
      },
      {
        path: "manage-loans",
        element: <ManageLoan />,
      },
      {
        path: "add-loan",
        element: <AddLoan />,
      },
      {
        path: "pending-loans",
        element: <PendingLoan />,
      },
      {
        path: "approved-loans",
        element: <ApproveLoan />,
      },
    ],
  },
]);