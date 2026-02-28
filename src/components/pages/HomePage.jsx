import React from "react";
import BelowNav from "../BelowNav";
import Best from "../Best";
import Epic from "../Epic";
import Section from "../Section";
import Footer from "../Footer";
import Countdown from "../Countdown";
import Testimonials from "../Testimonials";

const HomePage = () => {
    return (
        <>
            <BelowNav />
            <Section />
            <Testimonials />
            <Best />
            <Countdown />
            <Epic />
            <Footer />
        </>
    );
};

export default HomePage;
