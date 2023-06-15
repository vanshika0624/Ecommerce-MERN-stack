import React, { useState, useEffect } from "react";
import "./dashboard.css"
import Button from '@mui/material/Button';
import SellerNavBar from "./sellerNavBar.js";
import Footer from "../Footer.js";
import Pagination from 'react-js-pagination';
import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, Link } from 'react-router-dom';
import { ButtonGroup } from "@mui/material";
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
 
  const [productsSold, setProductsSold] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [shippedCount, setShippedCount] = useState(0);
  const [unshippedCount, setUnshippedCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [earnings, setEarnings] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("userRole") === 'buyer') {
      navigate('/home');
    }
  }, []);

  useEffect(() => {
     axios
      .get('http://localhost:2000/mart/seller/getAllMyOrders', { withCredentials: true })
      .then((res) => {
        const orders = res.data.orders
        getStatisticsData(orders);
      
      })
      .catch((err) => {
        console.log('Error from get all Orders',err);
      });

      axios
      .get('http://localhost:2000/product/seller/getProducts',{ withCredentials: true })
      .then((res) => {
        setProductsCount(res.data.filteredProductsCount);
        console.log(res.data)
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);


 const getStatisticsData= (orders)=>{
  let soldCount = 0;
  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      soldCount += item.quantity;
    });
  });
  setProductsSold(soldCount);

  // Current Total Revenue
  let revenue = 0;
  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
    revenue += (item.price *item.quantity) ;
  });
  });
  setEarnings(revenue);

  // Number of Unshipped products
  let unshipped = 0;
  orders.forEach((order) => { 
      order.orderItems.forEach((item) => {
        if (item.orderStatus === 'Processing')
        unshipped += item.quantity;
      });
    
  });
  setUnshippedCount(unshipped);

  // Number of Shipped products
  let shipped = 0;
  orders.forEach((order) => {
  
      order.orderItems.forEach((item) => {
        if (item.orderStatus === 'Shipped') 
        shipped += item.quantity;
      });
  });
  setShippedCount(shipped);

  // Number of Delivered products
  let delivered = 0;
  orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.orderStatus === 'Delivered') 
        delivered += item.quantity;
      });
    
  });
  setDeliveredCount(delivered);

 }



  return (
    <div className="bg">
      <SellerNavBar />
      <div className="alignment">
      <div>
      <Typography variant="h3" component="h3" className="dashboard_typographyhead"> Dashboard
      </Typography>
      </div>
      <Grid container justifyContent="center">
     
      <Grid item xs={6} md={4}>
         <div>
      <Card className="dashboard_card"  >
              <CardContent>             
                  <Typography variant="h6" component="h6"  className="dashboard_typography1">
                   Total Products
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
               {productsCount}
                  </Typography>
              </CardContent>
            </Card>
      </div>
      </Grid>
      <Grid item xs={6} md={4}>
      <div>
      <Card className="dashboard_card"  >
              <CardContent>             
                  <Typography variant="h6" component="h6"  className="dashboard_typography1">
                     Total Items Sold
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                 {productsSold}
                  </Typography>
              </CardContent>
            </Card>
      </div>
      </Grid>
      <Grid item xs={6} md={4}>
      <div>
      <Card className="dashboard_card"  >
              <CardContent>             
                  <Typography variant="h6" component="h6"  className="dashboard_typography1">
                     Current Total Revenue
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                    {earnings}
                  </Typography>
              </CardContent>
            </Card>
      </div>
      </Grid>
      <Grid item xs={6} md={4}>
      <div>
      <Card className="dashboard_card"  >
              <CardContent>             
                  <Typography variant="h6" component="h6"  className="dashboard_typography1">
                   Unshipped Items
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                    {unshippedCount}
                  </Typography>
              </CardContent>
            </Card>
      </div>
      </Grid>
       
      <Grid item xs={6} md={4}>
      <div>
      <Card className="dashboard_card"  >
              <CardContent>             
                  <Typography variant="h6" component="h6"  className="dashboard_typography1">
                     Delivered Items
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                    {deliveredCount}
                  </Typography>
              </CardContent>
            </Card>
      </div>
      </Grid>
      <Grid item xs={6} md={4}>
      <div>
      <Card className="dashboard_card"  >
              <CardContent>             
                  <Typography variant="h6" component="h6"  className="dashboard_typography1">
                    Shipped Items
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                    {shippedCount}
                  </Typography>
              </CardContent>
            </Card>
      </div>
      </Grid>
      
      </Grid>
      </div>
      <Footer />
    </div>
     

  )
};

export default Dashboard;