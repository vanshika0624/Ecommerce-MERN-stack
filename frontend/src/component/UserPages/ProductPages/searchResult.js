import React, { useState, useEffect } from "react";
import "./products.css";
import Button from '@mui/material/Button';
// import Navigation from "./navigation.js";
import Navigation from "../../navigation.js"
import Footer from "../../Footer.js";
import Typography from '@mui/material/Typography';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ButtonGroup } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";
import Pagination from "react-js-pagination";
// import Search from "./UserPages/ProductPages/search.js";

const SearchResult = () => {

    // const [searchBarData, setSearchBarData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumOrders, setTotalNumofOrders] = useState();
    const [resultsPerPage, setResultsPerPage] = useState();
    // const handleSearchResults = (results) => {
    //     setSearchBarData(results);
    //      setSearchResults(results.products);
    //     console.log(searchResults, "in Search Results1");
    // }; 
    useEffect(() => {
        getSearchResults(currentPage);
    }, [keyword]);

    const getSearchResults = (page) => {
        setCurrentPage(page);
        console.log(keyword, "in search results")
        axios
            .get(`http://localhost:2000/product/getProducts?keyword=${keyword}&page=` + page, { withCredentials: true })
            .then((res) => {
                setSearchResults(res.data.products);
                setTotalNumofOrders(res.data.filteredProductsCount);
                setResultsPerPage(res.data.resultPerPage);
                console.log(res.data.products);
            })
            .catch((err) => {
                console.log('Error searching for products');
            });

    };

    const displayCards = (cards) => {
        return (
            <Grid container direction="row" spacing={2}>
                {cards.map((card) => (
                    <Grid item xs={3} key={card._id}>
                        <Card className="homePage_card">
                            {card.images && card.images.map((image) => (
                                <CardMedia key={image.url} alt="product image" className="displayProductFormImage">
                                    <img src={image.url} alt="Product Preview" />
                                </CardMedia>
                            ))}
                            <CardContent>
                                <Typography variant="h6" component="h6" color="#848D62">
                                    {card.name}
                                </Typography>
                                <Typography variant="body2" color="#848D62" component="p">
                                    ${card.price}
                                </Typography>
                                <Link style={{ color: "#848D62" }} to={`/products/${card._id}`}>
                                    Details
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <div className="bg">
            <Navigation />

            {searchResults.length > 0 ? (
                <div className="alignment">
                    <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
                        Search Results
                    </Typography>
                    {displayCards(searchResults)}
                    {totalNumOrders > resultsPerPage && (
                        <div className="paginationBoxProducts">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultsPerPage}
                                totalItemsCount={totalNumOrders}
                                onChange={getSearchResults}
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="alignment">
                    <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
                        No search results found.
                    </Typography>
                </div>
            )}


            <Footer />
        </div>
    );
};

export default SearchResult;
