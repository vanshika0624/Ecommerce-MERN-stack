import React from "react";
import "./Footer.css";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate();

    const goToSignup = () => {
        navigate('/user-signup')
    }
    return (
        <div align="center" style={{background: "#C4AD88" }}> 
            <div className="Footer_heading">Maker's Mart </div>
            <div className="Footer_sub_heading">A one-stop-shop for all your
                Handcrafted needs. </div>

            {/* <Typography align='center'> */}
            <div> <Button className="Footer_button" variant="contained" size="small" onClick={goToSignup} >Sign Up</Button> </div>
            <div>  <Button className="Footer_button" variant="contained" size="small" >About Us</Button> </div>
            {/* </Typography> */}
            <div className="Footer_about"> MAKER'S MART COMPANY<br />
                University of California,<br />
                Irvine CA 92697<br />
            </div> 
            <div className="Footer_about">www.makersmart.com</div>
        </div>

    )
};
export default Footer;