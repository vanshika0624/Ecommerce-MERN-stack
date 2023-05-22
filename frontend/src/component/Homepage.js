import React, { useState, useEffect } from "react";
import "./Homepage.css"
import Button from '@mui/material/Button';
import Navigation from "./navigation.js"
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import { ButtonGroup } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:2000/getProducts')
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);

  const carddata = [
    { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' },
    { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' }, { id: 1, title: 'Card 1', description: 'This is card 1', image: 'https://example.com/image1.jpg' },

  ];

  const disaplyCards = (cards) => {
    return (
      <Grid container direction="row" spacing={2}  >
        {cards.map((card) => (
          <Grid item xs={4} >
            <Card key={card.id} className="card"  >
              <CardMedia image={card.image} alt="product image" />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {card.description}
                </Typography>
                <Link to={`/product/${card.id}`}> View Product Details</Link>
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
      {disaplyCards(carddata)}
    </div>
    //  <div>Home</div>

  )
};

export default HomePage;