import React, {useState, useEffect} from "react";
import  "./viewOrder.css"
import Footer from "../Footer.js";
import Navigation from "../navigation.js";
import Typography from '@mui/material/Typography';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import axios from "axios";
const ViewSingleOrder = () => {
    
    const { id } = useParams();
    const [shippingInfo, setShippingInfo] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [orderNumber, setOrderNumber] = useState('');
    const [itemsPrice, setItemsPrice] = useState('');
    const [taxPrice, setTaxPrice] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const [shippingPrice, setShippingPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [overallOrderStatus, setOverallOrderStatus] = useState('');
    const [overallDeliveryDate, setOverallDeliveryDate] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        axios
        .get(`http://localhost:2000/mart/order/${id}`, { withCredentials: true })
        .then((res) => {
            setShippingInfo(res.data.order.shippingInfo);
            setPaymentInfo(res.data.order.paymentInfo);
            setOrderItems(res.data.order.orderItems);
            setOrderNumber(res.data.order.orderNumber);
            setItemsPrice(res.data.order.itemsPrice);
            setTaxPrice(res.data.order.taxPrice);
            setServicePrice(res.data.order.servicePrice);
            setShippingPrice(res.data.order.shippingPrice);
            setTotalPrice(res.data.order.totalPrice);
            setOverallOrderStatus(res.data.order.overallOrderStatus);
            const oDate = new Date(res.data.order.orderDate);
            setOrderDate(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(oDate));

            if (res.data.order.overallDeliveredAt !== 'undefined' && res.data.order.overallDeliveredAt !== undefined && res.data.order.overallDeliveredAt !== '') {
                const dDate = new Date(res.data.order.overallDeliveredAt);
                setOverallDeliveryDate(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(dDate));
            }

            setErrorMsg('')
        })
        .catch((err) => {
            console.log('Error while fetching Orders');
            console.log(err);
          setErrorMsg('No Orders to Display!')
        });
    }, []);

    return <div className="imgstyle">
    <Navigation/>
    <div>
        <Card variant="outlined" className="profileOuterCard" sx={{ minWidth: 450, minHeight: 585 }}>
            <CardContent className="cardPadding">
                <Typography fontSize="40px" color="black" align="left">
                    Order Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}  >
                        <Typography variant="h6" component="h6" color="#3b2f28" align="left">
                            Order Number: {orderNumber}
                        </Typography>
                        <Typography variant="h6" component="h6" color="#3b2f28" align="left">
                            Payment Status: {paymentInfo.status}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Items Price: ${itemsPrice}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Tax: ${taxPrice}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Service Tax: ${servicePrice}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Shipping Price: ${shippingPrice}
                        </Typography>
                        <Typography variant="h6" component="h6" color="#3b2f28" align="left">
                            Total Price: ${totalPrice}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}  >
                        <Typography variant="h6" component="h6" color="#3b2f28" align="left">
                            Order Status: {overallOrderStatus}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Ordered on: {orderDate}
                        </Typography> 
                        <Typography variant="h6" component="h6" color="#3b2f28">
                            Shipping Address:
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.address}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.zipCode}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.phoneNo}
                        </Typography>
                        <Typography variant="h6" component="h6" color="#3b2f28" align="left">
                            {(overallDeliveryDate === 'undefined' || overallDeliveryDate === undefined || overallDeliveryDate === '') &&
                              'Estimated Delivery time: 1-2 weeks'
                            }
                            {overallDeliveryDate !== 'undefined' && overallDeliveryDate !== undefined && overallDeliveryDate !== '' &&
                              'Delivered on: ' + overallDeliveryDate
                            }

                        </Typography>
                        
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent className="cardPadding">  
                <Typography fontSize="30px" color="black" align="left">
                    Ordered Items
                </Typography>
            </CardContent>
        {orderItems.map((card) => (
            <Card key={card._id} className="viewOrderPage_card"  >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}  >
                            <Link  style={{ textDecoration: "none" }} to={`/products/${card.product}`}>
                            <Typography variant="h5" component="h5" color="#3b2f28">
                                {card.name}
                            </Typography>
                            </Link>
                            <Typography variant="body2"component="p" color="#3b2f28">
                                Price: ${card.price}
                            </Typography>
                            <Typography variant="body2"component="p" color="#3b2f28">
                                Quantity: {card.quantity}
                            </Typography>
                            <Typography variant="body2" component="p" color="#3b2f28">
                                Status: {card.orderStatus}
                            </Typography>
                            
                        </Grid>
                        <Grid item xs={6}>
                            <Link to={`/products/${card.product}`}>
                                <div className="imgContainerOrder">
                                    <CardMedia alt="Order Image">
                                        <img src={card.image} alt="Order Image Preview" />
                                    </CardMedia>
                                </div>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent> 
            </Card>
        ))
        }
        {errorMsg !== "" &&
        <Typography fontSize="40px" color="black" align="center">
            {errorMsg}
        </Typography>
        }
        </Card>
    </div>
    <Footer/>
    </div>
};

export default ViewSingleOrder;