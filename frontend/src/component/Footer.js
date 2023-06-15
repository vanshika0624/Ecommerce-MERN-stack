import React from "react";
import "./Footer.css";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import footerLogo from "../images/footer_logo.png";
const Footer = () => {
    const navigate = useNavigate();

    const goToSignup = () => {
        navigate('/user-signup')
    }
    
    const goToAboutUs = () => {
        navigate('/aboutUs')
    }

    return (
        <div align="center" className="Footer_maindiv" >
            <div className="Footer_heading">Maker's Mart </div>
            <div className="Footer_sub_heading">A one-stop-shop for all your
                Handcrafted needs. </div>

            {/* <Typography align='center'> */}
            { !localStorage.getItem("accessToken") && 
            <div> <Button className="Footer_button" variant="contained" size="small" onClick={goToSignup} >Sign Up</Button> </div>
            }
            <div>  <Button className="Footer_button" variant="contained" size="small" onClick={goToAboutUs}>About Us</Button> </div>
            {/* </Typography> */}
            <div className="Footer_about"> MAKER'S MART COMPANY<br />
                University of California,<br />
                Irvine CA 92697<br />
            </div>
            <div className="Footer_about">www.makersmart.com</div>
            <div><img src={footerLogo} className="footer_logo_style" /> </div>
        </div>

    )
};
export default Footer;