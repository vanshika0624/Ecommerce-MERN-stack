import React, { useState, useEffect } from "react";
import "./Homepage.css"
import Button from '@mui/material/Button';
import Navigation from "./navigation.js";
import Footer from "./Footer.js";
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import { ButtonGroup } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();
  const [furnitureProducts, setFurnitureProducts] = useState([]);
  const [jewelryProducts, setJewelryProducts] = useState([]);
  const [decorProducts, setDecorProducts] = useState([]);
  const [toyProducts, setToyProducts] = useState([]);
  const [clothProducts, setClothProducts] = useState([]);
  const [paintingProducts, setPaintingProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProducts?category=Furniture')
      .then((res) => {
        setFurnitureProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);
  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProducts?category=Jewelry')
      .then((res) => {
        setJewelryProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProducts?category=Paintings')
      .then((res) => {
        setPaintingProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProducts?category=Clothing')
      .then((res) => {
        setClothProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProducts?category=Home-Decor')
      .then((res) => {
        setDecorProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProducts?category=Toys')
      .then((res) => {
        setToyProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);


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

  const disaplyCards = (cards) => {
    return (
      <Grid container direction="row" spacing={2}  >
        {cards.map((card) => (
          <Grid item xs={4} >
            <Card key={card._id} className="card"  >
              <CardMedia image={card.image} alt="product image" />
              <CardContent>
                <Typography variant="h6" component="h6">
                  {card.name},
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  ${card.price}
                </Typography>
                <Link to={`/products/${card._id}`}> Details</Link>
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
      <div>
        <Typography variant="h4" color="textSecondary" component="div">
          Jewelry
        </Typography>
        {disaplyCards(jewelryProducts)}
        <Button onClick={goToJewelry}> View All Products</Button>
      </div>
      <div>
        <Typography variant="h4" color="textSecondary" component="div">
          Furniture
        </Typography>
        {disaplyCards(furnitureProducts)}
        <Button onClick={goToFurniture}> View All Products</Button>
      </div>
      <div>

        <Typography variant="h4" color="textSecondary" component="div">
          Clothing
        </Typography>
        {disaplyCards(clothProducts)}
        <Button onClick={goToClothing}> View All Products</Button>
      </div>
      <div>

        <Typography variant="h4" color="textSecondary" component="div">
          Home Decor
        </Typography>
        {disaplyCards(decorProducts)}
        <Button onClick={goToHomeDecor}> View All Products</Button>
      </div>
      <div>
        <Typography variant="h4" color="textSecondary" component="div">
          Paintings
        </Typography>
        {disaplyCards(paintingProducts)}
        <Button onClick={goToPaintings}> View All Products</Button>
      </div>
      <div>
        <Typography variant="h4" color="textSecondary" component="div">
          Toys
        </Typography>
        {disaplyCards(toyProducts)}
        <Button onClick={goToToys}> View All Products</Button>
      </div>
    </div>
    //  <div>Home</div>

  )
};

export default HomePage;