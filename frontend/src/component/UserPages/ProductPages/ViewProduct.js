import React, { useState, useEffect } from "react";
import "./ViewProduct.css"
// import bg from "../images/bg.jpg";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { CardMedia, Grid, MenuItem, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";
import Navigation from "../../navigation.js"
import Footer from "../../Footer.js"
const ViewProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [size, setSize] = React.useState('');
  const [productQuantity, setProductQuantity] = React.useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  const setSizeValue = (event) => {
    setSize(event.target.value);
  }
  // const setProductQuantityValue = (event) => {
  //   setProductQuantity(event.target.value);
  // }

  // const renderQuantity =(value)=>
  // {
  //     {for(let i=1 ; i<= productDetails.Stock; i++)
  //         <MenuItem value={i}>i</MenuItem>
  // }

  // }
  // const increaseQuantity = () => {
  //   if (productDetails.Stock <= quantity) return;
  //   const qty = quantity + 1;
  //   setQuantity(qty);
  // };

  // const decreaseQuantity = () => {
  //   if (1 >= quantity) return;
  //   const qty = quantity - 1;
  //   setQuantity(qty);
  // };
  const handleInputChange = (event) => {
    const inputValue = Number(event.target.value);
    1 >= inputValue ?
      setProductQuantity(1) :
      inputValue > productDetails.Stock ?
        setProductQuantity(productDetails.Stock) : setProductQuantity(inputValue)

  };
  const addToCart = () => {


    try {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const cart = {
        product: productDetails._id,
        name: productDetails.name,
        price: productDetails.price,
        // image: productDetails.images[0].url,
        stock: productDetails.Stock,
        quantity: productQuantity
      }
      const updatedCart = [...existingCart, cart];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setSuccessMessage('Product added to cart successfully!');
    }
    catch {
      const cart = {
        product: productDetails._id,
        name: productDetails.name,
        price: productDetails.price,
        // image: productDetails.images[0].url,
        stock: productDetails.Stock,
        quantity: productQuantity
      }
      // const updatedCart = [...existingCart, cart ];
      localStorage.setItem('cart', JSON.stringify(cart));
      setSuccessMessage('Product added to cart successfully!');
    }

  }

  useEffect(() => {

    axios
      .get(`http://localhost:2000/product/getProducts/${id}`, { withCredentials: true })
      .then((res) => {
        setProductDetails(res.data.product);
        // console.log(res.data.products)
      })
      .catch((err) => {
        console.log('Error from ViewProduct');

      });
  }, [id]);

  // const menuItems = Array.from(Array(productDetails.Stock), (_, index) => (
  //   <MenuItem key={index} value={index + 1}>
  //     {index + 1}
  //   </MenuItem>
  // ));
  return (<div className="bg" >
    <Navigation />
    <Grid container direction="row" spacing={2} justify="flex-end" alignItems="center" >
      <Grid container item xs={6} >
        {
          productDetails.images && productDetails.images.map((image) => (
            //  console.log(card);
            <CardMedia align="center" alt="product image" className="createProductFormImage">
              <img src={image.url} alt="Product Preview" />
            </CardMedia>
          ))
        }

      </Grid>
      <Grid item xs={4} >
        <Typography variant="h4" component="h4" className="fontStyles"  >
          {productDetails.name}
        </Typography>
        <Typography variant="h6" component="h6" className="fontStyles">
          {productDetails.description}
        </Typography>
        <Typography variant="h6" component="h6" className="fontStyles">
          Price: ${productDetails.price}
        </Typography>
        <div>
          {/* <Typography className="fontStyles" >
            OneSize
          </Typography> */}
          {/* <Select
              labelId="product_size_label"
              id="product_size"
              value={size}
              defaultValue="OneSize"
              label="Size"
              onChange={setSizeValue}
            >
              <MenuItem value={"OneSize"}>OneSize</MenuItem>
            </Select> */}
          {productDetails && productDetails.Stock > 0 ?
            // <Select
            //   labelId="product_quantity_label"
            //   id="product_quantity"
            //   value={quantity}
            //   label="Quantity"
            //   onChange={setQuantityValue}
            // >
            //     {menuItems}

            //   {/* <MenuItem value={i}>i</MenuItem> */}

            // </Select>
            <div  >
              {/* <Button onClick={decreaseQuantity}>-</Button> */}
              <Typography variant="h6" component="h6" className="fontStyles">
                <span className="quantity" > Quantity :  </span>  <TextField readOnly type="number" value={productQuantity} onChange={handleInputChange} />
              </Typography>
              {/* <Button onClick={increaseQuantity}>+</Button> */}
            </div>
            :
            <Typography variant="h4" component="h4" >
              Out of Stock!
            </Typography>
          }
        </div>
        <div>
          <Button className="viewProduct_Button" disabled={productDetails.Stock > 0 ? false : true} onClick={addToCart}> Add to Cart</Button>
          {successMessage && (
            <Typography variant="h6" component="h6" className="fontStyles">
              {successMessage}
            </Typography>
          )}
        </div>

      </Grid>
    </Grid>
    <Footer />
  </div >

  )
};

export default ViewProduct;
