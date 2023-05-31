import React, {useState, useEffect} from "react";
import  "./viewOrder.css"
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import axios from "axios";
const ViewSingleOrder = () => {
    const navigate = useNavigate();
    
    const { id } = useParams();
    const [shippingInfo, setShippingInfo] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [itemsPrice, setItemsPrice] = useState([]);
    const [taxPrice, setTaxPrice] = useState([]);
    const [shippingPrice, setShippingPrice] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [orderStatus, setOrderStatus] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        axios
        .get(`http://localhost:2000/mart/order/${id}`, { withCredentials: true })
        .then((res) => {
            setShippingInfo(res.data.order.shippingInfo);
            setPaymentInfo(res.data.order.paymentInfo);
            setOrderItems(res.data.order.orderItems);
            setItemsPrice(res.data.order.itemsPrice);
            setTaxPrice(res.data.order.taxPrice);
            setShippingPrice(res.data.order.shippingPrice);
            setTotalPrice(res.data.order.totalPrice);
            setOrderStatus(res.data.order.orderStatus);

            setErrorMsg('')
        })
        .catch((err) => {
          console.log('Error while fetching Orders');
          setErrorMsg('No Orders to Display!')
        });
    }, []);


    const goToProfile = () => {
        navigate('/address')
    }
    
    const goToCart = () => {
        navigate('/cart')
    }
    
    const goToHome=()=> {
        navigate('/home')
    }

    const goToOrders =()=> {
        navigate('/profile')
    }

    return <div>
    <div>
        <Grid container direction="row">
            <Grid item xs={8}  > 
                <Typography fontSize="40px" color="black" marginLeft={3}>
                </Typography>
            </Grid>
            <Grid item xs={4}  > 
                <div className="buttonmargin">
                    <Typography align="right">
                        <Tooltip title="Home"><HomeIcon fontSize="large" onClick={goToHome}/></Tooltip>
                        <Tooltip title="Orders"><InventoryIcon fontSize="large" onClick={goToOrders}/></Tooltip>
                        <Tooltip title="Cart"><ShoppingCartIcon fontSize="large" onClick={goToCart}/></Tooltip>
                        <Tooltip title="Account"><PersonIcon fontSize="large" onClick={goToProfile}/></Tooltip>
                    </Typography>
                </div>
            </Grid>
        </Grid>

        <Card variant="outlined" className="profileOuterCard" sx={{ minWidth: 450, minHeight: 585 }}>
            <CardContent className="cardPadding">
                <Typography fontSize="40px" color="black" align="left">
                    Order Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}  >
                        <Typography variant="h5" component="h5" color="#3b2f28" align="left">
                            Order Status: {orderStatus}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Order Number: {id}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                        Items Price: {itemsPrice}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Tax: {taxPrice}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Shipping Price: {shippingPrice}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Total Price: {totalPrice}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}  >
                        <Typography variant="h5" component="h5" color="#3b2f28">
                            Shipping Address:
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.address}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.city}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.state},  {shippingInfo.zipCode}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.phoneNo}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Payment Information: {paymentInfo.status}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        {orderItems.map((card) => (
            <Card key={card._id} className="profilePage_card"  >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}  >
                            <Typography variant="h5" component="h5" color="#3b2f28">
                                Product Name: {card.name}
                            </Typography>
                            <Typography variant="body2"component="p" color="#3b2f28">
                                Price: ${card.price}
                            </Typography>
                            <Typography variant="body2"component="p" color="#3b2f28">
                                Quantity: {card.quantity}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className="imgContainer">
                            <CardMedia alt="Order Image">
                                <img src={card.image} alt="Order Image Preview" />
                            </CardMedia>
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
    </div>
};

export default ViewSingleOrder;