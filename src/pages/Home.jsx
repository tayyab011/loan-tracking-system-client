import React from 'react';
import HeroBanner from '../components/HeroBanner';
import AvailableLoans from '../components/AvailableLoans';
import HowItWorks from '../components/HowitWorks';
import CustomerReviews from '../components/CustomerReviews';
import FAQSection from '../components/FAQSection';
import FeatcherPlan from '../components/FeatcherPlan';


const Home = () => {
    return (
        <div>
        <HeroBanner/>
        <AvailableLoans/>
        <HowItWorks/>
        <CustomerReviews/>
        <FeatcherPlan/>
        <FAQSection/>
        </div>
    );
};

export default Home;