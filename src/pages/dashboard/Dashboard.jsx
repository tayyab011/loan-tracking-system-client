import React from 'react';
import useRole from '../../hooks/useRole';
import Managerdashboard from './Managerdashboard';
import BorrowerDashboad from './BorrowerDashboad';
import AdminDashboard from './AdminDashboard';
import { Navigate } from 'react-router';

const Dashboard = () => {
    const { role, isLoading } = useRole();
    if (isLoading) {
      return "loading...";
    }
    if (role === "admin") {
      return <Navigate to="/dashboard/manage-users" />;
    }
    if (role === "manager") {
      return <Navigate to="/dashboard/add-loan" />;
    }
    if (role === "borrower") {
      return <Navigate to="/dashboard/myloan" />;
    }
};

export default Dashboard;