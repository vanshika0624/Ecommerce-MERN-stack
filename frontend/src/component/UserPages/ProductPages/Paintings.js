import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Navigation from "../../navigation.js"
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import { ButtonGroup } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";
import Footer from "../../Footer.js";
import "./products.css"
const Paintings = () => {
    const navigate = useNavigate();
    const [paintingProducts, setPaintingProducts] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:2000/product/getProducts?category=Paintings', { withCredentials: true })
            .then((res) => {
                setPaintingProducts(res.data.products);
                console.log(res.data.products);
            })
            .catch((err) => {
                console.log('Error from GetProducts');
            });
    }, []);






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
                {disaplyCards(paintingProducts)}
            </div>
            <Footer />

        </div>
        //  <div>Home</div>

    )
};

export default Paintings;
