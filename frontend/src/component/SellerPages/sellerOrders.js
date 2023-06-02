import React, {useState, useEffect} from "react";
import SellerNavBar from "./sellerNavBar.js";
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import Pagination from "react-js-pagination";
import axios from "axios";
const SellerOrders = () => {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumOrders, setTotalNumofOrders] = useState();
    const [resultsPerPage, setResultsPerPage] = useState(2);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getOrders(currentPage);
    }, []);

    const getOrders = (page) => {
        setCurrentPage(page);
        axios
        .get('http://localhost:2000/mart/seller/getAllMyOrders?page='+ page, { withCredentials: true })
        .then((res) => {
            if(res.data.orders.length > 0) {
                setOrders(res.data.orders);
                setTotalNumofOrders(res.data.ordersCount);
                setResultsPerPage(res.data.resultsPerPage);
                setErrorMessage('')
            }
            else {
                setErrorMessage('No Orders to Display!')
            }
        })
        .catch((err) => {
          console.log('Error while fetching Orders');
          setErrorMessage('No Orders to Display!')
        });
        
    };

    return (<div >

    <SellerNavBar/>
    <div>
        <Card variant="outlined" className="profileOuterCard" sx={{ minWidth: 450, minHeight: 585 }}>
            <CardContent>
                <Typography fontSize="40px" color="black" align="left">
                    Orders
                </Typography>
            </CardContent>

        {orders.map((card) => (
            <Card key={card._id} className="profilePage_card"  >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={10}  >
                            <div className="orderContentDiv">
                                <Typography variant="h5" component="h5" color="#3b2f28">
                                    {card.orderItems.length === 1 && card.orderItems[0].name}
                                    {card.orderItems.length > 1 && card.orderItems[0].name + " and " + (card.orderItems.length - 1) + " more.."}
                                </Typography>
                                <Typography variant="body2"component="p" color="#3b2f28">
                                    Order Number: {card.orderNumber}
                                </Typography>
                                <Typography variant="body2"component="p" color="#3b2f28">
                                    Price: ${card.totalPrice}
                                </Typography>
                                <Typography variant="body2"component="p" color="#3b2f28">
                                    Status: {card.overallOrderStatus}
                                </Typography>
                                <Typography variant="body2"component="p" color="#3b2f28">
                                    Ordered on: {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(card.orderDate))}
                                </Typography>
                                <Typography variant="h6"component="h6" color="#3b2f28">
                                    <Link style={{ color: "#3b2f28", fontSize: 15 }} to={`/orders/${card._id}`}>View Details</Link>
                                </Typography>
                            </div>

                        </Grid>
                        <Grid item xs={2} >
                            <div className="imgContainer">
                                <CardMedia alt="Order Image">
                                    <img src={card.orderItems[0].image} alt="Order Image Preview" />
                                </CardMedia>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent> 
            </Card>
        ))
        }
        {totalNumOrders > resultsPerPage && (
        <div className="paginationBox">
            <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={totalNumOrders}
            onChange={getOrders}
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
        </Card>
               
    </div>


    </div>
    )
};

export default SellerOrders;