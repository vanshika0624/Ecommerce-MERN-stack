import React, { useEffect } from "react";
import Navigation from "./navigation.js"
import SellerNavBar from "./SellerPages/sellerNavBar.js";
//import  "./AboutUs.css"
import Footer from "./Footer.js";
import Typography from '@mui/material/Typography';

const AboutUs = () => {
    const role = localStorage.getItem("userRole");
 
    useEffect(() => {
        
    });

    return <div className="bg">
            { 
            role === 'buyer' &&
            <Navigation/>
            }
            { 
            role === 'seller' && 
            <SellerNavBar/>
            }
            <div>
                Maker's Mart - About Us
            </div>
        <Footer />
    </div>;
  };
  
export default AboutUs;