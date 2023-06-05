import React, { useState, useEffect } from 'react';
// import  "./DisplayPage.css"
// import bg from "../images/bg.jpg";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Navigation from "../navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import { CardMedia, Grid, CardContent, Card, TextField } from '@mui/material';
import axios from 'axios';

import "./cart.css";
const Cart = () => {
    const navigate = useNavigate();


    const [cartItems, setCartItems] = useState([]);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [einError, setEINError] = useState('');
    const [successMsgFlag, setSuccessMsgFlag] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsgFlag, setErrorMsgFlag] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        axios
            .get('http://localhost:2000/user/getMyDetails', { withCredentials: true })
            .then((res) => {


                if (res.data.user.address.length > 0) {
                    setStreet(res.data.user.address[0].street);
                    setCity(res.data.user.address[0].city);
                    setState(res.data.user.address[0].state);
                    setZip(res.data.user.address[0].zipcode);
                }
                setSuccessMsgFlag(true);
                setErrorMsgFlag(false);
                setSuccessMsg('');
            })
            .catch((err) => {
                setErrorMsgFlag(true);
                setSuccessMsgFlag(false);
                setErrorMsg(err.response.data.message);
            });
    }, []);
    useEffect(() => {
        // const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    axios.get(`http://localhost:2000/cart/details`,{ withCredentials: true })
    .then((res)=>
       { setCartItems(res.data.cart.cartItems);
        // console.log(res.data.cart.cartItems);
       })
       .catch((err) => {
        console.log('Error from getcart details',err);
       })
    }, [cartItems]);
    
    const removeFromCart = (productId) => {
        // const updatedCart = cartItems.filter((item) => item.product !== productId);
    axios.delete(`http://localhost:2000/cart/removeproduct/${productId}`,{ withCredentials: true })
.then((res) =>{
        setCartItems(res.data.cart.cartItems);
        // console.log(res.data.cart.cartItems);
}).catch((err) => {
    console.log('Error from delete product from cart',err);
   })
        // localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    const updateQuantity = (productId, newQuantity) => {
        const itemToUpdate = cartItems.find((item) => item.product === productId);
        const maxQuantityAvailable = itemToUpdate.Stock;
      console.log(itemToUpdate,maxQuantityAvailable , "in update quantity")
        if (newQuantity > 0 && newQuantity <= maxQuantityAvailable) {

        //     const updatedCart = cartItems.map((item) =>
        //         item.product === productId ? { ...item, quantity: newQuantity } : item
        //     );
        //     setCartItems(updatedCart);
        //     localStorage.setItem('cart', JSON.stringify(updatedCart));
        // } else {
        //     // Show an error or notification for invalid quantity
        //     console.log('Invalid quantity');
        // }
           axios.put(`http://localhost:2000/cart/addproduct`,{
    
          
        //   name: productDetails.name,
        //   price: productDetails.price,
        //   image: productDetails.images[0].url,
        //   seller: productDetails.user,
          product: productId,
          // stock: productDetails.Stock,
          quantity: newQuantity,
        //   stock: productDetails.Stock,
          // seller: productDetails.user
          }

     ,{ withCredentials: true })
     .then((res)=> {
      console.log(res.data);
      setCartItems(res.data.cart.cartItems);
     })
     .catch((err) => {
      console.log('Error from updatecart',err);})
  
        
    }
    else{
        // snackbar to be added
    }

    };

    const calculateSubtotal = (item) => {

        return item.price * item.quantity;

    };

    // Calculate the total cart value
    const calculateItemTotal = () => {

        const subtotals = cartItems.map(calculateSubtotal);
        return subtotals.reduce((accumulator, current) => accumulator + current, 0);
    };
    const calculateTotal = () => {

        return calculateItemTotal() + calculateServiceCharge();
    };
    const calculateServiceCharge = () => {
        const salesTaxRate = getStateSalesTaxRate(state);
        return calculateItemTotal() * (salesTaxRate + 0.03);
    };

    const getStateSalesTaxRate = (state) => {
        switch (state) {


            case 'AL':
                return 0.04;
            case 'AK':
                return 0.00;
            case 'AZ':
                return 0.056;
            case 'AR':
                return 0.065;
            case 'CA':
                return 0.0725;
            case 'CO':
                return 0.029;
            case 'CT':
                return 0.0635;
            case 'DE':
                return 0.00;
            case 'DC':
                return 0.06;
            case 'FL':
                return 0.06;
            case 'GA':
                return 0.04;
            case 'HI':
                return 0.04;
            case 'ID':
                return 0.06;
            case 'IL':
                return 0.0625;
            case 'IN':
                return 0.07;
            case 'IA':
                return 0.06;
            case 'KS':
                return 0.065;
            case 'KY':
                return 0.06;
            case 'LA':
                return 0.0445;
            case 'ME':
                return 0.055;
            case 'MD':
                return 0.06;
            case 'MA':
                return 0.0625;
            case 'MI':
                return 0.06;
            case 'MN':
                return 0.06875;
            case 'MS':
                return 0.07;
            case 'MO':
                return 0.04225;
            case 'MT':
                return 0.00;
            case 'NE':
                return 0.055;
            case 'NV':
                return 0.0685;
            case 'NH':
                return 0.00;
            case 'NJ':
                return 0.06625;
            case 'NM':
                return 0.05125;
            case 'NY':
                return 0.04;
            case 'NC':
                return 0.0475;
            case 'ND':
                return 0.05;
            case 'OH':
                return 0.0575;
            case 'OK':
                return 0.045;
            case 'OR':
                return 0.00;
            case 'PA':
                return 0.06;
            case 'RI':
                return 0.07;
            case 'SC':
                return 0.06;
            case 'SD':
                return 0.045;
            case 'TN':
                return 0.07;
            case 'TX':
                return 0.0625;
            case 'UT':
                return 0.061;
            case 'VT':
                return 0.06;
            case 'VA':
                return 0.053;
            case 'WA':
                return 0.065;
            case 'WV':
                return 0.06;
            case 'WI':
                return 0.05;
            case 'WY':
                return 0.04;
            default:
                return 0.00;


        }
    }

    const goToProfile = () => {
        navigate('/address')
    }
    return (
        <div >

            <Navigation />
            <div className="heading">  My Bag<br /> </div>
            <Divider className="divider" />
            <Grid style={{ alignItems: "flex-start" }} container direction="row" spacing={2}  >
                <Grid container item xs={7} >
                    {cartItems.length === 0 ? (
                        <p className="cart_EmptyMsg">Your cart is empty.</p>
                    ) : (
                        <ul style={{ listStyleType: "none" }}>
                            {cartItems.map((item) => (
                                <li key={item.product}>
                                    <h3 className="cart_Item">{item.name}</h3>
                                    <div className="cart_Item"><Typography>Price: ${item.price}</Typography></div>
                                    <div className="cart_Item"><Typography>Quantity: <input
                                        type="number"
                                        className="cart_quantity"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.product, e.target.value)}
                                    />
                                        <Tooltip title="Remove"><DeleteIcon fontSize="medium" onClick={() => removeFromCart(item.product)} /></Tooltip>
                                    </Typography>
                                    </div>

                                    {/* <button onClick={() => removeFromCart(item.product)}>Remove</button> */}
                                    <Divider className="cart_Itemdivider" />
                                    {/* Add other product details as needed */}
                                </li>
                            ))}
                        </ul>

                    )}

                </Grid>
                <Grid container item xs={5} >
                    <Card variant="outlined" align="center" className="cart_cardStyle" sx={{ minWidth: 550 }}>
                        <Grid container direction="row"  >
                            <Grid item xs={6}>
                                <h2 className="cart_billing">Total:</h2>
                            </Grid>
                            <Grid item xs={6}>
                                <h2 className="cart_billing"> ${calculateTotal()}</h2>
                            </Grid>
                        </Grid>

                        <Divider className="cart_divider" />
                        <Grid container direction="row"  >
                            <Grid item xs={6}>
                                <Typography className="cart_billing">Cart SubTotal: </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className="cart_billing">${calculateItemTotal()}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row"  >
                            <Grid item xs={6}>
                                <Typography className="cart_billing">Taxes and Service Charge:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className="cart_billing">${calculateServiceCharge()}</Typography>

                            </Grid>
                        </Grid>
                        <div>
                            <Button className="cart_button" variant="contained" size="large" >Checkout</Button>
                        </div>

                    </Card>
                    <Card variant="outlined" align="center" className="cart_AddressCardStyle" sx={{ minWidth: 550 }} >

                        <h2 className="cart_billing" fontSize="25px" color="black" align="center">
                            Address: {street}, {city}<br />{state}-{zip}
                        </h2>

                        {/* <Divider className="cart_divider" />
                        <div>
                            <Typography className="cart_billing cart_textbox"> {street}, {city}<br />{state}-{zip}</Typography> */}
                        {/* <TextField readonly id="id-street" value={street} label="Address" variant="filled" className="cart_textbox" />
                            <TextField readonly id="id-city" value={city} label="City" variant="filled" className="cart_textbox" />
                        </div>
                        <div style={{ margin: "20px", textAlign: "left" }}>
                            <TextField readonly id="id-state" value={state} label="State" variant="filled" className="cart_textbox" />
                            <TextField readonly id="id-zip" value={zip} label="Zip" variant="filled" className="cart_textbox" /> */}

                        {/* </div> */}
                        <div>
                            <Button className="cart_button" variant="contained" size="large" onClick={goToProfile} >Change Address</Button>
                        </div>
                    </Card>


                </Grid>
            </Grid>
        </div >
    )
};

export default Cart;