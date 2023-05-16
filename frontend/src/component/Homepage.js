import React from "react";
import  "./Homepage.css"
import Button from '@mui/material/Button';
import Navigation from "./navigation.js"
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from "@mui/material";
const HomePage = () => {
const navigate= useNavigate();
 

    return (
     <div className="bg">
         <Navigation/>
         </div>
    //  <div>Home</div>
      
  )};
  
  export default HomePage;