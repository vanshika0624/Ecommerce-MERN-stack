import React from "react";
import "./signup.css";
import img1 from "../../images/seller.png";
import img2 from "../../images/candle.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Carousel from 'react-material-ui-carousel';
const SellerSignUp = () => {
    return (<Grid container direction="row" className="bgcolor" >
        <Grid item xs={8}  >
            <div className="align">
                <div >
                    <Typography align="center" className="style" >
                        Register as a Seller 
                    </Typography>
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>
                    <TextField id="outlined-basic" label="First Name" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>
                    <TextField id="outlined-basic" label="Address" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    <TextField id="outlined-basic" label="City" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>       
                    <TextField id="outlined-basic" label="State" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    <TextField id="outlined-basic" label="ZipCode" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    <TextField id="outlined-basic" label="EIN" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                <div className="buttonmargin style">
                    <Typography align='center'>
                        <Button variant="contained" size="large" className="button" >Sign Up</Button>
                    </Typography>
                </div>
            </div>

        </Grid>
        <Grid item xs={2} className="hide">
            <img src={img1} alt="Background" className="size" />
        </Grid>
        <Grid item xs={2} className="hide">
            <img src={img2} alt="Background" className="size" />
        </Grid>
    </Grid>)
};

export default SellerSignUp;