import React, { useState, useEffect } from "react";
import Navigation from "../../navigation.js"
import SellerNavBar from "../../SellerPages/sellerNavBar.js";
import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";
import Footer from "../../Footer.js";
import "./products.css";
const Jewelry = () => {
    const [jewelryProducts, setJewelryProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumOrders, setTotalNumofOrders] = useState();
    const [resultsPerPage, setResultsPerPage] = useState();
    const role = localStorage.getItem("userRole");

    useEffect(() => {
        getJewelry(currentPage);
    }, []);


    const getJewelry = (page) => {
        if(role === 'buyer'){
            getJewelryBuyer(page);
        }
        else { //if(role === 'seller') {
            getJewelrySeller(page);
        }
    }

    const getJewelryBuyer = (page) => {
        setCurrentPage(page);
        axios
            .get('http://localhost:2000/product/getProducts?category=Jewelry&page='+ page, { withCredentials: true })
            .then((res) => {
                setJewelryProducts(res.data.products);
                setTotalNumofOrders(res.data.filteredProductsCount);
                setResultsPerPage(res.data.resultPerPage);
            })
            .catch((err) => {
                console.log('Error from GetProducts');
            });
    }

    const getJewelrySeller = (page) => {
        setCurrentPage(page);
        axios
            .get('http://localhost:2000/product/seller/getProducts?category=Jewelry&page='+ page, { withCredentials: true })
            .then((res) => {
                setJewelryProducts(res.data.products);
                setTotalNumofOrders(res.data.filteredProductsCount);
                setResultsPerPage(res.data.resultPerPage);
            })
            .catch((err) => {
                console.log('Error from GetProducts');
            });
    }

    const disaplyCards = (cards) => {
        return (
            <Grid container direction="row" spacing={2}  >
                {cards.map((card) => (
                    <Grid item xs={3} >
                        <Card key={card._id} className="card"  >
                            {/* <CardMedia image={card.image} alt="product image" /> */}
                            {
                                card.images && card.images.map((image) => (
                                    //  console.log(card);
                                    <CardMedia alt="product image" className="displayProductFormImage">
                                        <img src={image.url} alt="Product Preview" />
                                    </CardMedia>
                                ))
                            }
                            <CardContent>
                                <Tooltip title={card.name}>
                                    <Typography variant="h6" component="h6" color="#848D62" className="nameEllipsis">
                                        {card.name}
                                    </Typography>
                                </Tooltip>
                                <Typography color="#848D62" variant="body2" component="p">
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

                ))
                }
            </Grid>
        )

    }


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
            <div className="alignment">
                {disaplyCards(jewelryProducts)}
                {totalNumOrders > resultsPerPage && (
                <div className="paginationBoxProducts">
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultsPerPage}
                    totalItemsCount={totalNumOrders}
                    onChange={getJewelry}
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
            <Footer />

        </div>
        //  <div>Home</div>

    )
};

export default Jewelry;
