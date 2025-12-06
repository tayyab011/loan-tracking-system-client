import React from 'react';
import useRole from '../../hooks/useRole';
import Managerdashboard from './Managerdashboard';
import BorrowerDashboad from './BorrowerDashboad';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const { role, isLoading } = useRole();
    if (isLoading) {
      return "loading...";
    }
    if (role === "admin") {
      return <AdminDashboard/>;
    }
    if (role === "manager") {
      return <Managerdashboard/>;
    }
    if (role === "borrower") {
      return <BorrowerDashboad/>;
    }
};

export default Dashboard;