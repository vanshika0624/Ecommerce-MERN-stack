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
    const goToDashboard=()=>
    {
        navigate('/seller-dashboard')
    }
    return (
        <div>


            <Grid container alignContent="flex-start">
                <Grid item xs={12} md={4}>
                    <div className="navbar" >
                        <Typography >
                            <Button size="large" className="buttonstyle" onClick={goToCatalogue}>Catalogue</Button>
                            <Button size="large" className="buttonstyle" onClick={goToOrders}> Orders</Button>
                            <Button size="large" className="buttonstyle" onClick={goToAddProduct}>Add Product</Button>
                            {/* <Button size="large" className="buttonstyle" onClick={goToEditProduct}> Edit Product</Button> */}
                            {/* <Button size="large" className="buttonstyle" onClick={goToPaintings}> Paintings</Button> */}
                            {/* <Button size="large" className="buttonstyle" onClick={goToToys}> Toys </Button> */}
                        </Typography>
                    </div>
                </Grid>

                <Grid container item xs={12} md={8} alignContent="flex-end" justifyContent="flex-end" >
                    <div className="iconstyle">
                    <HomeIcon fontSize="large" onClick={goToDashboard} />
                        <PersonIcon fontSize="large" onClick={goToProfile} />
                    </div>
                </Grid>
            </Grid>


        </div>
    )
};

export default SellerNavBar;