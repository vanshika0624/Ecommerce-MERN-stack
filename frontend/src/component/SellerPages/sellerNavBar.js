import React from "react";
import "./sellerNavBar.css"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from "@mui/material/ButtonGroup";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import NavLogo from "../../images/nav_logo.png"
const SellerNavBar = () => {
    const navigate = useNavigate();

    const goToAddProduct = () => {
        navigate('/add-product')
    }
    // const goToEditProduct = () => {
    //     navigate('/edit-product')
    // }
    const goToCatalogue = () => {
        // navigate('/catalogue')
    }
    const goToOrders = () => {
        navigate('/seller-orders')
    }

    // const goToCart = () => {
    //     navigate('/cart')
    // }
    const goToProfile = () => {
        navigate('/profile')
    }
    const goToDashboard = () => {
        navigate('/seller-dashboard')
    }
    return (
        <div>


            <Grid container alignContent="flex-start">
                <Grid item xs={1}  >
                    <div><img src={NavLogo} onClick={goToDashboard} className="nav_logo_style" /> </div>
                </Grid>
                <Grid item xs={10} md={5}>
                    <div className="navbar" >
                        <Typography >
                            <Button size="large" className="buttonstyle" onClick={goToCatalogue}>Catalogue</Button>
                            <Button size="large" className="buttonstyle" onClick={goToOrders}> Orders</Button>
                            <Button size="large" className="buttonstyle" onClick={goToAddProduct}>Add Product</Button>
                            <Button size="large" className="buttonstyle" onClick={goToProfile}>Profile</Button>

                        </Typography>
                    </div>
                </Grid>


            </Grid>


        </div>
    )
};

export default SellerNavBar;