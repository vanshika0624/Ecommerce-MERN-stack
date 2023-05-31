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
import Grid from "@mui/material/Grid";
import Search from "./UserPages/ProductPages/search.js";

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

    const goToOrders = () => {
        navigate("/profile");
    };

    const goToHome = () => {
        navigate("/home");
    };

    const goToUserDetails=()=> {
        navigate("/address");
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);
        searchBarData(results);
        console.log(searchResults, "in navigation page");
    };

    return (
        <div>
            <Grid container alignContent="flex-start">
                <Grid item xs={12} md={7}>
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
                <Grid container item xs={6} md={2} alignContent="flex-end" justifyContent="flex-end">
                    <div className="iconstyle">
                        <Tooltip title="Home"><HomeIcon fontSize="large" onClick={goToHome}/></Tooltip>
                        <Tooltip title="Orders"><InventoryIcon fontSize="large" onClick={goToOrders}/></Tooltip>
                        <Tooltip title="Cart"><ShoppingCartIcon fontSize="large" onClick={goToCart}/></Tooltip>
                        <Tooltip title="Account"><PersonIcon fontSize="large" onClick={goToUserDetails}/></Tooltip>
                    </div>
                </Grid>
            </Grid>

            {/* Display search results */}
            {
                searchResults > 0 && (

                    <div className="search-results">
                        <h2>Search Results</h2>
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.id}>{result.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    );
};

export default Navigation;
