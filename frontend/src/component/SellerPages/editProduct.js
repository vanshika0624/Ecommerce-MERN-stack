import React from "react";
import "./editProduct.css";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
const editProduct= () =>{
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
              <Button className="editProduct_button" variant="contained"  size="large" >Save Changes</Button>
              <Button className="editProduct_button" variant="contained"  size="large" >Delete Product</Button>
            </Typography>
        </div>
       
        </div>
        </Card>
        </Grid>
    </div>
    

)
};
export default editProduct;