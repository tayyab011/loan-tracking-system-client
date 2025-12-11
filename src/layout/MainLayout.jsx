import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
      <div>
        <div className=" z-50  sticky top-0">
          <Navbar />
        </div>

        <Outlet />
        <Footer />
      </div>
    );
};

export default MainLayout;