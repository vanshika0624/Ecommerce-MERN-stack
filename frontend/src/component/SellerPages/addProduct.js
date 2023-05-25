import React,{useState,useEffect,useRef} from "react";
import "./addProduct.css";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";
const AddProduct= () =>{
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const fileInputRef = useRef(null);
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
                
                    "name": "2 Sample - User Auth test",
                    "description": "3rd User Auth test",
                    "price": "700",
                    "category": "Clothing",
                    "images":images,
                    "stock":"18",
                    // "user": "64596f0f3d0561f78b51993d"
                
            },{ withCredentials: true })
                .then((response) => {
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
return(
    <div>
        <div className="heading">  Add Product<br/> </div>
        <Divider  className="divider"/>
        <Grid container item xs={12} justifyContent="center" >
        <Card variant="outlined" className="cardStyle" sx={{ minWidth: 450 }}>
        <div>
        <Grid container direction="row"  >  
        <Grid item  xs={4}>
        <div  className="labelStyle">
        Product Title:
        </div>
        </Grid>
        <Grid item xs={8}>
        <div  className="labelStyle">
        <TextField required sx={{width: 300}} className="addProduct_textbox"  id="outlined-basic" label="" variant="outlined" />  
        </div>
        </Grid>
        </Grid>

        <Grid container direction="row"  >  
        <Grid item  xs={4}>
        <div  className="labelStyle">
        Product Price:
        </div>
        </Grid>
        <Grid item xs={8}>
        <div  className="labelStyle">
        <TextField required sx={{width: 300}} className="addProduct_textbox"  id="outlined-basic" label="" variant="outlined" />  
        </div>
        </Grid>
        </Grid>

        <Grid container direction="row"  >  
        <Grid item  xs={4}>
        <div  className="labelStyle">
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
        <div  className="labelStyle">
        <div id="createProductFormImage"  >
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            </div>
            </Grid>
        </Grid>


        <Grid container direction="row"  >  
        <Grid item  xs={4}>
        <div  className="labelStyle">
        Product  Description:
        </div>
        </Grid>
        <Grid item xs={8}>
        <div  className="labelStyle">
        <TextField required sx={{width: 400}} multiline rows={4} className="addProduct_textbox"  id="outlined-basic" label="" variant="outlined" />  
        </div>
        </Grid>
        </Grid>

        <Grid container direction="row"  >  
        <Grid item  xs={4}>
        <div  className="labelStyle">           
        Product  sizing:
        </div>
        </Grid>
        <Grid item xs={8}>
        <div  className="labelStyle">
        <TextField required sx={{width: 300}} className="addProduct_textbox"  id="outlined-basic" label="" variant="outlined" />  
        </div>
        </Grid>
        </Grid>

        <Grid container direction="row"  >  
        <Grid item  xs={4}>
        <div  className="labelStyle">
        Product  Quantity:        
        </div>
        </Grid>
        <Grid item xs={8}>
        <div  className="labelStyle">
        <TextField sx={{width: 300}} required className="addProduct_textbox"  id="outlined-basic" label="" variant="outlined" />  
        </div>  
        </Grid>
        </Grid>

        <div>
          <Typography align='center'>
              <Button className="addProduct_button" variant="contained"  size="large" onClick={postData} >Add Product</Button>
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