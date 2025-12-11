import React, { use } from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AuthContext } from '../provider/AuthContext';

const MainLayout = () => {
  const {loading}=use(AuthContext)
   const navigation = useNavigation();
   const { state } = navigation;
 if (loading) {
  return <Loader/>
 }
    return (
      <div>
        <div className=" z-50  sticky top-0">
          <Navbar />
        </div>

        {state === "loading" ? <Loader /> : <Outlet />}
        <Footer />
      </div>
    );
};

export default MainLayout;