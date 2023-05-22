import React from "react";
import "./Footer.css";
import Button from '@mui/material/Button';
const Footer = () => {
    return (
        <div align="center" >
            <div className="Footer_heading">Maker's Mart </div>
            <div className="Footer_sub_heading">A one-stop-shop for all your
                Handcrafted needs. </div>

            {/* <Typography align='center'> */}
            <div> <Button className="Footer_button" variant="contained" size="large" >Sign Up</Button> </div>
            <div>  <Button className="Footer_button" variant="contained" size="large" >Contact Us</Button> </div>
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