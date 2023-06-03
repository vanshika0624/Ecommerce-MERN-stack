import React, { useState }  from "react";
import "./navigation.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Grid from "@mui/material/Grid";
import Search from "./UserPages/ProductPages/search.js";
import NavLogo from "../images/nav_logo.png";
import axios from "axios";

const Navigation = ({ searchBarData }) => {
    const navigate = useNavigate();
    // const [searchResults, setSearchResults] = useState([]);

    const goToJewelry = () => {
        navigate("/jewelry");
    };

    const goToFurniture = () => {
        navigate("/furniture");
    };

    const goToClothing = () => {
        navigate("/clothing");
    };

    const goToHomeDecor = () => {
        navigate("/home-decor");
    };

    const goToPaintings = () => {
        navigate("/paintings");
    };

    const goToToys = () => {
        navigate("/toys");
    };

    const goToCart = () => {
        navigate("/cart");
    };

    const goToOrders = () => {
        navigate("/profile");
    };

    const goToHome = () => {
        navigate("/home");
    };

    const goToUserDetails=()=> {
        navigate("/address");
    };

    const goToLogin=()=> {
        navigate("/signin");
    };

    // const handleSearchResults = (results) => {
     
    //     setSearchResults(results);
    //     searchBarData(results);
    //     // navigate("/search");
    //   return results;
    //     console.log(searchResults, "in navigation page");
    // };

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
            <Grid container alignContent="flex-start" className='nav-id'>
                <Grid container  item xs={7} >
                <Grid item xs={1}  >
                    <div><img src={NavLogo} onClick={goToHome} className="nav_logo_style" /> </div>
                </Grid>
                <Grid item xs={11} md={7}>
                    <div className="navbarMain">
                        <Typography>
                            <Button size="large" className="buttonstyle" onClick={goToJewelry}>
                                Jewelry
                            </Button>
                            <Button size="large" className="buttonstyle" onClick={goToFurniture}>
                                Furniture
                            </Button>
                            <Button size="large" className="buttonstyle" onClick={goToClothing}>
                                Clothing
                            </Button>
                            <Button size="large" className="buttonstyle" onClick={goToHomeDecor}>
                                Home Decor
                            </Button>
                            <Button size="large" className="buttonstyle" onClick={goToPaintings}>
                                Paintings
                            </Button>
                            <Button size="large" className="buttonstyle" onClick={goToToys}>
                                Toys
                            </Button>
                        </Typography>
                    </div>
                </Grid>
                </Grid>
                <Grid container  item xs={5} >
                <Grid container item xs={8} alignContent="center" justifyContent="center">
                    <Search />

                </Grid>
                <Grid container item  xs={4} alignContent="flex-end"  justifyContent="flex-end">
                    <div className="iconstyleNav">
                        {/* <HomeIcon fontSize="large" onClick={goToHome} /> */}
                        {localStorage.getItem('accessToken') && 
                        <Tooltip title="Orders"><InventoryIcon fontSize="large" onClick={goToOrders}/></Tooltip>
                        }
                        <Tooltip title="Cart"><ShoppingCartIcon fontSize="large" onClick={goToCart}/></Tooltip>
                        {localStorage.getItem('accessToken') && 
                        <Tooltip title="Account"><PersonIcon fontSize="large" onClick={goToUserDetails}/></Tooltip>
                        }
                        {localStorage.getItem('accessToken') && 
                        <Tooltip title="Sign Out"><LogoutIcon fontSize="large" onClick={logOut}/></Tooltip>
                        }
                        {!localStorage.getItem('accessToken') && 
                        <Tooltip title="Sign In"><LoginIcon fontSize="large" onClick={goToLogin}/></Tooltip>
                        }
                    </div>
                </Grid>
                </Grid>
            </Grid>



        </div>
    );
};

export default Navigation;
