import React from 'react';
import HeroBanner from '../components/HeroBanner';
import AvailableLoans from '../components/AvailableLoans';
import HowItWorks from '../components/HowitWorks';
import CustomerReviews from '../components/CustomerReviews';


const Home = () => {
    return (
        <div>
        <HeroBanner/>
        <AvailableLoans/>
        <HowItWorks/>
        <CustomerReviews/>
        </div>
    );
};

export default Home;