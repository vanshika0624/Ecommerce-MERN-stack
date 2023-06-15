import React, { useState, useEffect, useRef } from "react";
import "./addProduct.css";
import SellerNavBar from "./sellerNavBar.js";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navigation from './sellerNavBar.js';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const AddProduct = () => {
  const [prNameError, setprNameError] = useState('');
  const [prName, setprName] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState('');
  const [description, setdescription] = useState('');
  const [Stock, setStock] = useState('');
  const [StockError, setStockError] = useState('');
  const [PriceError, setPriceError] = useState('');
  // const [sizing, setsizing] = useState('');
  const navigate = useNavigate();
  const [successmsg, setSuccessmsg] = useState(false);
  const [errmsg, setErrmsg] = useState(false);
  const [images, setImages] = useState([]);


  const [imagesPreview, setImagesPreview] = useState([]);
  const fileInputRef = useRef(null);
  const handleprNameChange = (e) => {
    // setprName(e.target.value)
    if ((e.target.value.length) > 25) {
      setprNameError('Please Enter less than 25 characters')

    }
    else {
      setprNameError('')
      setprName(e.target.value)
    }
  }
  const handleStockChange = (e) => {
    setStock(e.target.value)
    if (!(validateStock(e.target.value))) {
      setStockError('Please Enter a Number')

    }
    else {
      setStockError('')
      // setStock(e.target.value)
      // setprName(e.target.value)
    }
  }
  const handlePrice = (e) => {
    setprice(e.target.value)
    if (!(validateStock(e.target.value))) {
      setPriceError('Please Enter a Number')

    }
    else {
      setPriceError('')
      // setStock(e.target.value)
      // setprName(e.target.value)
    }
  }

  const validateStock = (stock) => {
    const stockRegex = /^[0-9]+$/;

    return stockRegex.test(stock)
  }

  const handleCategory = (event) => {
    setcategory(event.target.value);
  };
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  const postData = (event) => {
    event.preventDefault()
    // if (user != "" && pass != "") 
    {

      // setEmptyfields(false);
      axios.post("http://localhost:2000/product/seller/createProduct", {

        "name": prName,
        "description": description,
        "price": price,
        "category": category,
        "images": images,
        "Stock": Stock,
        // "user": "64596f0f3d0561f78b51993d"

      }, { withCredentials: true })
        .then((response) => {
          // console.log(response);
          if (response.status == 201) {
            setSuccessmsg(true);
            navigate('/seller/catalogue');
            console.log("success")
          }
          else {
            console.log("error")
            setErrmsg(true);
          }
        })
        .catch((err) => console.log(err, "err"));
    }
    // else {


    //     setEmptyfields(true);

    // }

  }
  return (
    <div>
      <SellerNavBar />
      <div className="heading">  Add Product<br /> </div>
      <Divider className="divider" />
      <Grid container item xs={12} justifyContent="center" >
        <Card variant="outlined" className="cardStyle" sx={{ minWidth: 450 }}>
          <div>
            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="labelStyle">
                  Product Title:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="labelStyle">
                  <TextField value={prName} onChange={handleprNameChange} error={Boolean(prNameError)} helperText={prNameError} required sx={{ width: 300 }} className="addProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid>
            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="labelStyle">
                  Product Category:
                </div>
              </Grid>
              <Grid item xs={8}>
                {/* <div className="labelStyle">
                  <TextField value={category} onChange={e => setcategory(e.target.value)} required sx={{ width: 300 }} className="addProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div> */}
                <div className="labelStyle">
                  <FormControl required sx={{ m: 0, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={category}
                      label="Category"
                      onChange={handleCategory}
                    >
                      <MenuItem value={"Clothing"}>Clothing</MenuItem>
                      <MenuItem value={"Furniture"}>Furniture</MenuItem>
                      <MenuItem value={"Toys"}>Toys</MenuItem>
                      <MenuItem value={"Home-Decor"}>Home Decor</MenuItem>
                      <MenuItem value={"Paintings"}>Paintings</MenuItem>
                      <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </Grid>

            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="labelStyle">
                  Product Price:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="labelStyle">
                  <TextField value={price} onChange={handlePrice} error={Boolean(PriceError)} helperText={PriceError} required sx={{ width: 300 }} className="addProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>

            </Grid>

            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="labelStyle">
                  Product Images:
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    // multiple
                    ref={fileInputRef}
                    style={{ display: 'none' }}

                  />
                  {/* <Button onClick={handleOpenFileDialog}> <UploadIcon onClick={handleOpenFileDialog} /></Button> */}
                  <UploadIcon onClick={handleOpenFileDialog} />

                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="labelStyle">
                  <div id="createProductFormImage"  >
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>
                </div>
              </Grid>
            </Grid>


            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="labelStyle">
                  Product  Description:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="labelStyle">
                  <TextField onChange={e => setdescription(e.target.value)} value={description} required sx={{ width: 400 }} multiline rows={4} className="addProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid>

            {/* <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="labelStyle">
                  Product  sizing:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="labelStyle">
                  <TextField value={sizing} onChange={e => setsizing(e.target.value)} required sx={{ width: 300 }} className="addProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid> */}

            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="labelStyle">
                  Product  Quantity:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="labelStyle">
                  <TextField value={Stock} onChange={handleStockChange} error={Boolean(StockError)} helperText={StockError} sx={{ width: 300 }} required className="addProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid>

            <div>
              <Typography align='center'>
                <Button className="addProduct_button" disabled={(prName && price && category && images.length != 0 && description && Stock) ? false : true} variant="contained" size="large" onClick={postData} >Add Product</Button>
                {/* <Button className="addProduct_button" variant="contained"  size="large" >Delete Product</Button> */}
              </Typography>
            </div>

          </div>
        </Card>
      </Grid>
    </div>


  )
};
export default AddProduct;