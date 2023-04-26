import React from "react";
import  "./DisplayPage.css"
import bg from "../images/bg.jpg";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const DisplayPage = () => {
    return <div className="imgstyle"> 

        <img src={bg} alt="Background" className="imgstyle"/>
        <div className="buttonmargin">
        <Typography align="right" color="yellow" >
        <Button variant="outlined" size="large" color="inherit"> Sign In</Button>
        </Typography>
        </div>
        <div className='style'>
            Maker's <br/>Mart
        
        </div>
        <div className="buttonmargin style">
        <Typography align='center'>
        <Button variant="outlined" size="large" color="inherit">Shop Now</Button>
        </Typography>
        </div>
        
        
       
    </div>;
  };
  
  export default DisplayPage;