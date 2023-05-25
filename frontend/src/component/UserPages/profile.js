import React from "react";
// import  "./DisplayPage.css"
// import bg from "../images/bg.jpg";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate,Link } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();


    return <div >

        Profile
        <Link to="/seller-dashboard">Go to Seller Dashboard</Link>


    </div>;
};

export default Profile;