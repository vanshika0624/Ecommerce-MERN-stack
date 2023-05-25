import React,{useEffect,useState,useRef} from "react";
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


const EditProduct= () =>{

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
      const updateData = (event) => {
        event.preventDefault()
        // if (user != "" && pass != "") 
        {
            // setEmptyfields(false);
            axios.put("http://localhost:2000/product/seller/createProduct", {
                
                    // "name": "2 Sample - User Auth test",
                    // "description": "3rd User Auth test",
                    // "price": "700",
                    // "category": "Clothing",
                    // "images":images,
                    // "stock":"18",
                    // "user": "64596f0f3d0561f78b51993d"
                
            })
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
    const deleteData = (event) => {
        event.preventDefault()
        // if (user != "" && pass != "") 
        {
            // setEmptyfields(false);
            axios.delete("http://localhost:2000/product/seller/createProduct", {
                
                    // "name": "2 Sample - User Auth test",
                    // "description": "3rd User Auth test",
                    // "price": "700",
                    // "category": "Clothing",
                    // "images":images,
                    // "stock":"18",
                    // "user": "64596f0f3d0561f78b51993d"
                
            })
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
        <div className="editProduct_heading"> Edit Product<br/> </div>
        <Divider  className="editProduct_divider"/>
        <Grid container item xs={12} justifyContent="center" >
        <Card variant="outlined" className="editProduct_cardStyle" sx={{ minWidth: 450 }}>
        <div>
        <div className="editProduct_labelStyle" style={{marginTop: "40px"}} >
        Product ID: 
        <TextField  className="editProduct_textbox" sx={{width: 300}} style={{marginLeft:'200px'}} required id="outlined-basic" label="" variant="outlined" InputProps={{readOnly: true, }}  />  
        </div>
        <div  className="editProduct_labelStyle">
        Product Title:
        <TextField required sx={{width: 300}} className="editProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>
        <div  className="editProduct_labelStyle">
        Product Price:
        <TextField required sx={{width: 300}} className="editProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>
        <div  className="editProduct_labelStyle">
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
        <div id="createProductFormImage" style={{marginLeft:'200px'}} >
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
        
        <div  className="editProduct_labelStyle">
        Product  Description:
        <TextField required sx={{width: 400}} multiline rows={4} className="editProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>
        <div  className="editProduct_labelStyle">
            
        Product  sizing:
        <TextField required sx={{width: 300}} className="editProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>
        <div  className="editProduct_labelStyle">
        Product  Quantity:        
        <TextField sx={{width: 300}} required className="editProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>     
        <div>
          <Typography align='center'>
              <Button className="editProduct_button" variant="contained"  size="large"  onClick={updateData}>Save Changes</Button>
              <Button className="editProduct_button" variant="contained"  size="large" onClick={deleteData} >Delete Product</Button>
            </Typography>
        </div>
       
        </div>
        </Card>
        </Grid>
    </div>
    

)
};
export default EditProduct;