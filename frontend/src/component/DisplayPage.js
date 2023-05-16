import React from "react";
import  "./DisplayPage.css"
import bg from "../images/bg.jpg";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
const DisplayPage = () => {
const navigate= useNavigate();
 
const goToSignin=()=>
{
    navigate('/signin')
}
const goToHome=()=>
{
    navigate('/home')
}
    return <div className="imgstyle"> 

        <img src={bg} alt="Background" className="imgstyle"/>
        <div className="buttonmargin">
        <Typography align="right" color="yellow" >
        <Button variant="outlined" size="large" color="inherit" onClick={goToSignin}> Sign In</Button>
        </Typography>
        </div>
        <div className='style'>
            Maker's <br/>Mart
        
        </div>
        <div className="buttonmargin style">
        <Typography align='center'>
        <Button variant="outlined" size="large" onClick ={goToHome }color="inherit">Shop Now</Button>
        </Typography>
        </div>
        
        
       
    </div>;
  };
  
  export default DisplayPage;