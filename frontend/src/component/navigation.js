import React from "react";
import "./navigation.css"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from "@mui/material/ButtonGroup";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
const Navigation = () => {
    const navigate = useNavigate();

    const goToJewelry = () => {
        navigate('/jewelry')
    }
    const goToFurniture = () => {
        navigate('/furniture')
    }
    const goToClothing = () => {
        navigate('/clothing')
    }
    const goToHomeDecor = () => {
        navigate('/home-decor')
    }
    const goToPaintings = () => {
        navigate('/paintings')
    }
    const goToToys = () => {
        navigate('/toys')
    }
    const goToCart = () => {
        navigate('/cart')
    }
    const goToProfile = () => {
        navigate('/profile')
    }
    const goToHome=()=>
    {
        navigate('/home')
    }
    return (
        <div>


            <Grid container alignContent="flex-start">
                <Grid item xs={12} md={7}>
                    <div className="navbar" >
                        <Typography >
                            <Button size="large" className="buttonstyle" onClick={goToJewelry}>Jewelry</Button>
                            <Button size="large" className="buttonstyle" onClick={goToFurniture}> Furniture</Button>
                            <Button size="large" className="buttonstyle" onClick={goToClothing}> Clothing</Button>
                            <Button size="large" className="buttonstyle" onClick={goToHomeDecor}> Home Decor</Button>
                            <Button size="large" className="buttonstyle" onClick={goToPaintings}> Paintings</Button>
                            <Button size="large" className="buttonstyle" onClick={goToToys}> Toys </Button>
                        </Typography>
                    </div>
                </Grid>

                <Grid container item xs={12} md={5} alignContent="flex-end" justifyContent="flex-end" >
                    <div className="iconstyle">
                    <HomeIcon fontSize="large" onClick={goToHome} />
                        <ShoppingCartIcon fontSize="large" onClick={goToCart} />
                        <PersonIcon fontSize="large" onClick={goToProfile} />
                    </div>
                </Grid>
            </Grid>


        </div>
    )
};

export default Navigation;