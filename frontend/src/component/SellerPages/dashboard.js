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
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (localStorage.getItem("userRole") === 'buyer') {
      navigate('/home');
    }
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:2000/mart/seller/getAllMyOrders', { withCredentials: true })
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);






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
                    mockdata
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
                     Total Products Sold
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                
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
                    mockdata
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
                   Unshipped Orders
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                    mockdata
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
                     Delivered Orders
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                    mockdata
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
                    Shipped Orders
                  </Typography>
                  <Typography variant="h6" component="h6"  className="dashboard_typography">
                    mockdata
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