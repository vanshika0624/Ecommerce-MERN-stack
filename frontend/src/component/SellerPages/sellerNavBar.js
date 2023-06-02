import React from "react";
import "./sellerNavBar.css"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from '@mui/material/Grid';
import NavLogo from "../../images/nav_logo.png"
import axios from "axios";

const SellerNavBar = () => {
    const navigate = useNavigate();

    const goToAddProduct = () => {
        navigate('/add-product')
    }

    const goToCatalogue = () => {
        // navigate('/seller-dashboard')
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

    const logOut=()=>
    {
        axios
        .get(`http://localhost:2000/user/logout/`,{ withCredentials: true })
        .then((res) => {
            // console.log(res)
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
                        <Tooltip title="Account"><PersonIcon fontSize="large" onClick={goToProfile}/></Tooltip>
                        <Tooltip title="Sign Out"><LogoutIcon fontSize="large" onClick={logOut}/></Tooltip>
                    </div>
                </Grid>
            </Grid>


        </div>
    )
};

export default SellerNavBar;