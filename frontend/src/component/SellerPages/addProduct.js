import React from "react";
import "./addProduct.css";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
const addProduct= () =>{
return(
    <div>
        <div className="heading">  Add Product<br/> </div>
        <Divider  className="divider"/>
        <Grid container item xs={12} justifyContent="center" >
        <Card variant="outlined" className="cardStyle" sx={{ minWidth: 450 }}>
        <div>
        
        <div  className="labelStyle">
        Product Title:
        <TextField required sx={{width: 300}} className="addProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>
        <div  className="labelStyle">
        Product Price:
        <TextField required sx={{width: 300}} className="addProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>
        <div  className="labelStyle">
        Product Images:
        
        </div>
        <div  className="labelStyle">
        Product  Description:
        <TextField required sx={{width: 400}} multiline rows={4} className="addProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>
        <div  className="labelStyle">
            
        Product  sizing:
        <TextField required sx={{width: 300}} className="addProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>
        <div  className="labelStyle">
        Product  Quantity:        
        <TextField sx={{width: 300}} required className="addProduct_textbox" style={{marginLeft:'200px'}} id="outlined-basic" label="" variant="outlined" />  
        </div>     
        <div>
          <Typography align='center'>
              <Button className="addProduct_button" variant="contained"  size="large" >Save Changes</Button>
              <Button className="addProduct_button" variant="contained"  size="large" >Delete Product</Button>
            </Typography>
        </div>
       
        </div>
        </Card>
        </Grid>
    </div>
    

)
};
export default addProduct;