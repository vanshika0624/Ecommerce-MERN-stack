import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Navigation from "../../navigation.js"
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import { ButtonGroup } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import Footer from "../../Footer.js";
import axios from "axios";
import Pagination from "react-js-pagination";
import "./products.css"
const Clothing = () => {
    const navigate = useNavigate();
    const [clothProducts, setClothProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumClothing, setTotalNumofClothing] = useState();
    const [resultsPerPage, setResultsPerPage] = useState(2);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        getclothProducts(currentPage);
    }, []);

    const getclothProducts = (page) => {
        setCurrentPage(page);
        console.log(page);
        axios
            .get(`http://localhost:2000/product/getProducts?category=Clothing&page=${page}`, { withCredentials: true })
            .then((res) => {
                // console.log(res.data.products);
                if (res.data.products.length > 0) {
                    setTotalNumofClothing(res.data.productsCount);
                    setResultsPerPage(res.data.resultsPerPage);
                    setErrorMessage('')
                    setClothProducts(res.data.products);
                    // console.log(res.data.products);
                }
                else {
                    setErrorMessage('No Orders to Display!')
                }
            }
            )
            .catch((err) => {
                console.log('Error from GetProducts');
            });
    };





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
                                <Typography color="#848D62" variant="h6" component="h6">
                                    {card.name}
                                </Typography>
                                <Typography color="#848D62" variant="body2" component="p">
                                    ${card.price}
                                </Typography>
                                <Link style={{ color: "#848D62" }} to={`/products/${card._id}`}> Details</Link>
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
            <Navigation />
            <div className="alignment">
                {disaplyCards(clothProducts)}
            </div>
            <Footer />

            {totalNumClothing > resultsPerPage && (
                <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultsPerPage}
                        totalItemsCount={totalNumClothing}
                        onChange={getclothProducts}
                        firstPageText="First"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>
            )}
            {errorMessage !== "" &&
                <Typography fontSize="40px" color="black" align="center">
                    {errorMessage}
                </Typography>
            }
        </div>

    )

};

export default Clothing;
