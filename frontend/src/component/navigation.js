import React, { useState } from "react";
import "./navigation.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";
import Search from "./UserPages/ProductPages/search.js";
import NavLogo from "../images/nav_logo.png";

const Navigation = ({ searchBarData }) => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

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

    const goToProfile = () => {
        navigate("/profile");
    };

    const goToHome = () => {
        navigate("/home");
    };

    const handleSearchResults = (results) => {
        navigate("/search");
        setSearchResults(results);
        searchBarData(results);
        console.log(searchResults, "in navigation page");
    };

    return (
        <div>
            <Grid container alignContent="flex-start">
                <Grid item xs={1}  >
                    <div><img src={NavLogo} onClick={goToHome} className="nav_logo_style" /> </div>
                </Grid>
                <Grid item xs={11} md={7}>
                    <div className="navbar">
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
                <Grid container item xs={6} md={3} alignContent="center" justifyContent="center">
                    <Search onSearchResults={handleSearchResults} />

                </Grid>
                <Grid container item xs={6} md={1} alignContent="flex-end" justifyContent="flex-end">
                    <div className="iconstyle">
                        {/* <HomeIcon fontSize="large" onClick={goToHome} /> */}
                        <ShoppingCartIcon fontSize="large" onClick={goToCart} />
                        <PersonIcon fontSize="large" onClick={goToProfile} />
                    </div>
                </Grid>
            </Grid>



        </div>
    );
};

export default Navigation;
