import React, { useEffect, useState, useRef } from "react";
import "./editProduct.css";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import axios from "axios";
import UploadIcon from '@mui/icons-material/Upload';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import Typography from "@mui/material";

const EditProduct = () => {

  const [prName, setprName] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState('');
  const [description, setdescription] = useState('');
  const [Stock, setStock] = useState('');
  const [sizing, setsizing] = useState('');
  const navigate = useNavigate();
  const [successmsg, setSuccessmsg] = useState(false);
  const [errmsg, setErrmsg] = useState(false);
  const [open, setOpen] = useState(false);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imageDisplayFlag , setImageDisplayFlag] = useState(false);
  const fileInputRef = useRef(null);
  const { id } = useParams();


  useEffect(() => {

    axios
      .get(`http://localhost:2000/product/getProducts/${id}`, { withCredentials: true })
      .then((res) => {
        // setProductDetails(res.data.products[0]);
        setprName(res.data.product.name)
        setprice(res.data.product.price)
        setcategory(res.data.product.category)
        setStock(res.data.product.stock)
        setImages(res.data.product.images)
        setImagesPreview(res.data.product.images)
        setdescription(res.data.product.description)
        console.log(res.data.product)
      })
      .catch((err) => {
        console.log('Error from ViewProduct');
      });
  }, [id]);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImageDisplayFlag(true);
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
  const updateData = (event) => {
    event.preventDefault()
    // if (user != "" && pass != "") 
    {
      // setEmptyfields(false);
      axios.put(`http://localhost:2000/product/seller/getProducts/${id}`, {

        "name": prName,
        "description": description,
        "price": price,
        "category": category,
        "images": images,
        "Stock": Stock,
        // "user": "64596f0f3d0561f78b51993d"

      }, { withCredentials: true })
        .then((response) => {
          console.log(response);
          navigate("/seller/catalogue");
          // if (response.status == 200) {
          // setSuccessmsg(true);
          // navigate('/home');
          //     console.log("success")
          // }
          // else {
          //     console.log("error")
          //     setErrmsg(true);
          // }
        })
        .catch((err) => console.log(err, "err"));
    }

    
    // else {


    //     setEmptyfields(true);

    // }

  }
  const deleteData = (event) => {
    event.preventDefault()
    // if (user != "" && pass != "") 
    {
      // setEmptyfields(false);
      axios.delete(`http://localhost:2000/product/seller/getProducts/${id}`,
        { withCredentials: true })
        .then((response) => {
          setOpen(true);
          console.log(response);
          // if (response.status == 200) {
          // setSuccessmsg(true);
          // navigate('/home');
          //     console.log("success")
          // }
          // else {
          //     console.log("error")
          //     setErrmsg(true);
          // }
        })
        .catch((err) => console.log(err, "err"));
    }
    // else {


    //     setEmptyfields(true);

    // }

  }

  const goToSellerCatalogue = () => {
    navigate('/seller-dashboard')
  }
  return (
    <div>
      <div className="editProduct_heading"> Edit Product<br /> </div>
      <Divider className="editProduct_divider" />
      <Grid container item xs={12} justifyContent="center" >
        <Card variant="outlined" className="editProduct_cardStyle" sx={{ minWidth: 450 }}>
          <div>
            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="editProduct_labelStyle" style={{ marginTop: "40px" }} >
                  Product ID:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="editProduct_labelStyle" style={{ marginTop: "40px" }}>
                  <TextField className="editProduct_textbox" sx={{ width: 300 }} required id="outlined-basic" value={id} label="" variant="outlined" InputProps={{ readOnly: true, }} > </TextField>
                </div>
              </Grid>

            </Grid>
            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="editProduct_labelStyle">
                  Product Title:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="editProduct_labelStyle">
                  <TextField value={prName} required onChange={e => setprName(e.target.value)} sx={{ width: 300 }} className="editProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid>

            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="editProduct_labelStyle">
                  Product Price:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="editProduct_labelStyle">
                  <TextField value={price} onChange={e => setprice(e.target.value)} required sx={{ width: 300 }} className="editProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid>

            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="editProduct_labelStyle">
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
                <div className="editProduct_labelStyle">
                  <div id="createProductFormImage"  >
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={ imageDisplayFlag?  image : image.url} alt="Product Preview" />
                    ))}
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="editProduct_labelStyle">
                  Product  Description:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="editProduct_labelStyle">
                  <TextField value={description} onChange={e => setdescription(e.target.value)} required sx={{ width: 400 }} multiline rows={4} className="editProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid>

            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="editProduct_labelStyle">
                  Product  sizing:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="editProduct_labelStyle">
                  <TextField value={sizing} onChange={e => setsizing(e.target.value)} required sx={{ width: 300 }} className="editProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid>

            <Grid container direction="row"  >
              <Grid item xs={4}>
                <div className="editProduct_labelStyle">
                  Product  Quantity:
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className="editProduct_labelStyle">
                  <TextField value={Stock} onChange={e => setStock(e.target.value)} sx={{ width: 300 }} required className="editProduct_textbox" id="outlined-basic" label="" variant="outlined" />
                </div>
              </Grid>
            </Grid>

            <div>
              <Typography align='center'>
                <Button className="editProduct_button" variant="contained" size="large" onClick={updateData}>Save Changes</Button>
                <Button className="editProduct_button" variant="contained" size="large" onClick={deleteData} >Delete Product</Button>
              </Typography>
            </div>
            <Dialog
              open={open}
            ><DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography variant="h4" color="textSecondary" component="div">
                    Product Deleted Successfully!
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>

                <Button onClick={goToSellerCatalogue}>Click to go to Catalogue</Button>
              </DialogActions>
            </Dialog>

          </div>
        </Card>
      </Grid>
    </div>


  )
};
export default EditProduct;