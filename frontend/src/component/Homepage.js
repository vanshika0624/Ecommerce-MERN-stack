import React, { useState, useEffect } from "react";
import "./Homepage.css"
import Button from '@mui/material/Button';
import Navigation from "./navigation.js";
import Footer from "./Footer.js";
import Pagination from 'react-bootstrap/Pagination';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import Tooltip from "@mui/material/Tooltip";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";
import Search from "./UserPages/ProductPages/search.js";
// import Grid from "@mui/material/Grid";
const HomePage = () => {
  const navigate = useNavigate();
  const [furnitureProducts, setFurnitureProducts] = useState([]);
  const [jewelryProducts, setJewelryProducts] = useState([]);
  const [decorProducts, setDecorProducts] = useState([]);
  const [toyProducts, setToyProducts] = useState([]);
  const [clothProducts, setClothProducts] = useState([]);
  const [paintingProducts, setPaintingProducts] = useState([]);
  // const [searchBarData, setSearchBarData] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);

  // const handleSearchResults = (results) => {
  //   setSearchBarData(results);
  //   console.log(searchBarData, "in homepage");
  // };

  useEffect(() => {
    if(localStorage.getItem("userRole") === 'seller') {
      navigate('/seller-dashboard');
    }
  }, []);


  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProductsHome?category=Furniture', { withCredentials: true })
      .then((res) => {
        setFurnitureProducts(res.data.products);
        // console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);
  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProductsHome?category=Jewelry', { withCredentials: true })
      .then((res) => {
        setJewelryProducts(res.data.products);
        // console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProductsHome?category=Paintings', { withCredentials: true })
      .then((res) => {
        setPaintingProducts(res.data.products);
        // console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProductsHome?category=Clothing', { withCredentials: true })
      .then((res) => {
        setClothProducts(res.data.products);
        // console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProductsHome?category=Home-Decor', { withCredentials: true })
      .then((res) => {
        setDecorProducts(res.data.products);
        // console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProductsHome?category=Toys', { withCredentials: true })
      .then((res) => {
        setToyProducts(res.data.products);
        // console.log(res.data.products);
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
      <Grid container item xs={12} direction="row" spacing={2}   >
        {cards.map((card) => (
          <Grid item xs={3} >
            <Card key={card._id} className="homePage_card"  >
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
                <Typography variant="body2" color="#848D62" component="p">
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

<Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
  Home Decor
</Typography>
{disaplyCards(decorProducts)}
<Grid container item xs={12} justifyContent ="center">
<Button className="homePage_button" onClick={goToHomeDecor}> View All Products</Button>
</Grid>
</div>


      
      <div className="alignment">
        <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
          Furniture
        </Typography>
        {disaplyCards(furnitureProducts)}
        <Grid container item xs={12} justifyContent ="center">
        <Button className="homePage_button" onClick={goToFurniture}> View All Products</Button>
        </Grid>
      </div>

      <div className="alignment">
        <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
          Jewelry
        </Typography>
        {disaplyCards(jewelryProducts)}

        <Grid container item xs={12} justifyContent ="center">
        <Button className="homePage_button" onClick={goToJewelry}> View All Products</Button>
        </Grid>
      </div>

      <div className="alignment">

        <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
          Clothing
        </Typography>
        {disaplyCards(clothProducts)}
        <Grid container item xs={12} justifyContent ="center">
        <Button className="homePage_button" onClick={goToClothing}> View All Products</Button>
        </Grid>
      </div>
      <div className="alignment">
        <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
          Paintings
        </Typography>
        {disaplyCards(paintingProducts)}
        <Grid container item xs={12} justifyContent ="center">
        <Button className="homePage_button" onClick={goToPaintings}> View All Products</Button>
        </Grid>
      </div>
      <div className="alignment">
        <Typography className="homePage_typography" variant="h4" color="textSecondary" component="div">
          Toys
        </Typography>
        {disaplyCards(toyProducts)}
        <Grid container item xs={12} justifyContent ="center">
        <Button className="homePage_button" onClick={goToToys}> View All Products</Button>
        </Grid>
      </div>
      <Footer />
    </div>
    //  <div>Home</div>

  )
};

export default HomePage;