import React, { useEffect } from "react";
import  "./DisplayPage.css"
import landing_page from "../images/landing.png";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
const DisplayPage = () => {
const navigate= useNavigate();
 
useEffect(() => {
    if(localStorage.getItem('accessToken')) {
        if(localStorage.getItem('userRole') === 'seller') {
            navigate('/seller-dashboard');
        }
        else if(localStorage.getItem('userRole') === 'buyer'){
            goToHome();
        }
    }
});

const goToSignin=()=>
{
    navigate('/signin')
}
const goToHome=()=>
{
    navigate('/home')
}
    return <div className="imgstyle"> 

        <img src={landing_page} alt="Background" className="imgstyle"/>
        <div className="buttonmargin">
        <Typography align="right"  >
        <Button className="buttonStyle" variant="outlined" size="large" color="inherit" onClick={goToSignin}> Sign In</Button>
        </Typography>
        </div>
        <div className='style'>
            Maker's <br/>Mart
        
        </div>
        <div className="buttonmargin style">
        <Typography align='center'>
        <Button className="buttonStyle" variant="outlined" size="large" onClick ={goToHome}color="inherit">Shop Now</Button>
        </Typography>
        </div>
        
        
       
    </div>;
  };
  
  export default DisplayPage;