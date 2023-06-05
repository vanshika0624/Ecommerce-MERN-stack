import React, { useState, useEffect } from "react";
import Navigation from "../../navigation.js"
import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";
import Footer from "../../Footer.js";
import "./products.css";
const HomeDecor = () => {
    const navigate = useNavigate();
    const [decorProducts, setDecorProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumOrders, setTotalNumofOrders] = useState();
    const [resultsPerPage, setResultsPerPage] = useState();

    useEffect(() => {
        getHomeDecor(currentPage);
    }, []);

    const getHomeDecor = (page) => {
        setCurrentPage(page);
        axios
            .get('http://localhost:2000/product/getProducts?category=Home-Decor&page='+ page, { withCredentials: true })
            .then((res) => {
                setDecorProducts(res.data.products);
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
                {disaplyCards(decorProducts)}
                {totalNumOrders > resultsPerPage && (
                <div className="paginationBoxProducts">
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultsPerPage}
                    totalItemsCount={totalNumOrders}
                    onChange={getHomeDecor}
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

export default HomeDecor;
