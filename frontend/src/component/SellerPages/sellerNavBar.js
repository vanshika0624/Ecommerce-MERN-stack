import React from "react";
import "./sellerNavBar.css"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Grid from '@mui/material/Grid';
import NavLogo from "../../images/nav_logo.png"
import axios from "axios";

const SellerNavBar = () => {
    const navigate = useNavigate();

    const goToAddProduct = () => {
        navigate('/add-product')
    }

    const goToCatalogue = () => {
        navigate('/seller/catalogue')
    }

    const goToOrders = () => {
        navigate('/seller-orders')
    }

    const goToProfile = () => {
        navigate('/address')
    }
    
    const goToDashboard = () => {
        navigate('/seller-dashboard')
    }

    const goToLogin=()=> {
        navigate("/signin");
    }

    const logOut=()=>
    {
        axios
        .get(`http://localhost:2000/user/logout/`,{ withCredentials: true })
        .then((res) => {
            localStorage.setItem("accessToken", "");
            localStorage.setItem("userRole", "");
            navigate("/");
        })
        .catch((err) => {
            console.log('Error while logging out');
        });
        navigate('/')
    };

    return (
        <div>


            <Grid container alignContent="flex-start" direction="rows" className="nav-id-s">
                <Grid item xs={1}  >
                    <div><img src={NavLogo} onClick={goToDashboard} className="nav_logo_seller" /> </div>
                </Grid>
                <Grid item xs={7}>
                    <div className="navbar" >
                        <Typography >
                            <Button size="large" className="buttonstyle" onClick={goToCatalogue}>Catalogue</Button>
                            <Button size="large" className="buttonstyle" onClick={goToOrders}> Orders</Button>
                            <Button size="large" className="buttonstyle" onClick={goToAddProduct}>Add Product</Button>
                        </Typography>
                    </div>
                </Grid>

                <Grid container item xs={4} alignContent="flex-end" justifyContent="flex-end" >
                    <div className="iconstyle">
                    {localStorage.getItem('accessToken') && 
                    <Tooltip title="Account"><PersonIcon fontSize="large" onClick={goToProfile}/></Tooltip>
                    }
                    {localStorage.getItem('accessToken') && 
                    <Tooltip title="Sign Out"><LogoutIcon fontSize="large" onClick={logOut}/></Tooltip>
                    }
                    {!localStorage.getItem('accessToken') && 
                    <Typography align="right">
                      <Button variant="outlined" size="large" color="inherit" onClick={goToLogin}> Sign In</Button>
                    </Typography>
                    }
                    </div>
                </Grid>
            </Grid>


        </div>
    )
};

export default SellerNavBar;