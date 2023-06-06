import React from "react";
import "./orderSuccess.css";
import Footer from "../Footer.js";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Navigation from "../navigation.js";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
// import Button from "@mui/material/Button";
//import CardActions from "@material-ui/core/CardActions";


import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div>
    <Navigation/>
    <div className="orderSuccess">
        <Card
            style={{
                width: 500,
                backgroundColor: "#C4AD88" ,
                borderRadius : 10 ,
            }}
        >
            <CardContent>
                <Typography variant="h5" component="h2">
                    Your Order has been Confirmed !
                </Typography>
                <Typography
                    style={{
                        marginBottom: 12,
                    }}
                    color="textSecondary"
                >
                    Thank you so much for buying from us !
                </Typography>
                <Link to={`/orders/${id}`}>View Order</Link>
            </CardContent>
        </Card>
        </div>
    <Footer/>
    </div>
);
  return (
    <div>
<Navigation/>
    
    <div className="orderSuccess">


      <Typography>Your Order has been Placed successfully ! 
        Thank you for ordering from us !
      </Typography>
      <Link to="/viewOrder">View Orders</Link>
    </div>
    <Footer/>
    </div>
  );
  
};

export default OrderSuccess;