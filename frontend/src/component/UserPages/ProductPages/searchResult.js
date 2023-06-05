import React, { useState, useEffect } from "react";
import "./products.css";
import Navigation from "../../navigation.js"
import SellerNavBar from "../../SellerPages/sellerNavBar.js";
import Footer from "../../Footer.js";
import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip";
import { Link, useParams  } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";

const SearchResult = () => {

    const [searchResults, setSearchResults] = useState([]);
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumOrders, setTotalNumofOrders] = useState();
    const [resultsPerPage, setResultsPerPage] = useState();
    const role = localStorage.getItem("userRole");

    useEffect( () => {
        getSearch(currentPage, keyword);
    }, [keyword]);

    const getSearch = (page) => {
        if(role === 'buyer'){
            getSearchBuyer(page);
        }
        else { //if(role === 'seller') {
            getSearchSeller(page);
        }
    }

    const getSearchBuyer = (page) => {
        setCurrentPage(page);
        axios
            .get('http://localhost:2000/product/getProducts?page='+ page + '&keyword=' + keyword, { withCredentials: true })
            .then((res) => {
                setSearchResults(res.data.products);
                setTotalNumofOrders(res.data.filteredProductsCount);
                setResultsPerPage(res.data.resultPerPage);
            })
            .catch((err) => {
                console.log('Error searching for products');
            });
    }

    const getSearchSeller = (page) => {
        setCurrentPage(page);
        axios
            .get('http://localhost:2000/product/seller/getProducts?page='+ page + '&keyword=' + keyword, { withCredentials: true })
            .then((res) => {
                setSearchResults(res.data.products);
                setTotalNumofOrders(res.data.filteredProductsCount);
                setResultsPerPage(res.data.resultPerPage);
            })
            .catch((err) => {
                console.log('Error searching for products');
            });
    }

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
                                <Tooltip title={card.name}>
                                    <Typography variant="h6" component="h6" color="#848D62" className="nameEllipsis">
                                        {card.name}
                                    </Typography>
                                </Tooltip>
                                <Typography variant="body2" color="#848D62" component="p">
                                    ${card.price}
                                </Typography>
                                {role === 'buyer' &&
                                <Link style={{ color: "#848D62" }} to={`/products/${card._id}`}> Details</Link>
                                }
                                {role === 'seller' &&
                                <Link style={{ color: "#848D62" }} to={`/edit-product/${card._id}`}>Edit</Link>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <div className="bg">
            { 
            role === 'buyer' &&
            <Navigation/>
            }
            { 
            role === 'seller' && 
            <SellerNavBar/>
            }
            {searchResults.length > 0 ? (
                <div className="alignment">
                    <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
                        Search Results
                    </Typography>
                    {displayCards(searchResults)}
                </div>
            ) :  (
                <div className="alignment">
                    <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
                        No search results found.
                    </Typography>
                </div>
            )}
            
            {totalNumOrders > resultsPerPage && (
                <div className="paginationBoxProducts">
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultsPerPage}
                    totalItemsCount={totalNumOrders}
                    onChange={getSearch}
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                    />
                </div>
                )}

            <Footer />
        </div>
    );
};

export default SearchResult;
