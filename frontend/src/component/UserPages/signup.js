import React from "react";
import "./signup.css";
import signupimg from "../../images/soap.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
const SignUp = () => {
    return (<Grid container direction="row" className="bgcolor">
        <Grid item xs={8}  >
            <div className="align">
                <div >
                    <Typography align="left" className="style" >
                        Create an Account
                    </Typography>
                </div>
                <div style={{ margin: "5px", textAlign: "left" }}>
                    <TextField id="filled-basic" label="First Name" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    <TextField id="filled-basic" label="Last Name" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "left" }}>
                    <TextField id="filled-basic" label="Email" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "left" }}>
                    <TextField id="filled-basic" label="Password" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>

                <div className="buttonmargin style">
                    <Typography align='left'>
                        <Button variant="contained" size="large" className="button" >Sign Up</Button>
                    </Typography>
                    <div className="link" >
                        <Link href="#" color="inherit"  >
                            Interested in selling?<br />
                            Click here to join !
                        </Link>
                    </div>
                </div>
            </div>

        </Grid>
        <Grid item xs={4} className="hide">
            <img src={signupimg} alt="Background" className="size" />
        </Grid>
    </Grid>)
};

export default SignUp;