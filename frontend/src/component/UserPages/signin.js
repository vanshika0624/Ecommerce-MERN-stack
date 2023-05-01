import React, { useState } from "react";
import "./signin.css";
import signinimg from "../../images/Jewelry.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
const SignIn = () => {
    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");
    return (<Grid container direction="row" className="bgcolor">
        <Grid item xs={8}  >
            <div className="align">
                <div >
                    <Typography align="center" className="style" >
                        Sign In
                    </Typography>
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>
                    <TextField id="filled-basic" value={user} onChange={(e) => setUser(e.target.value)} error={!user} helperText={!user ? "Require" : ""} label="Username" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'white' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>
                    <TextField type='password' value={pass} onChange={(e) => setPass(e.target.value)} error={!pass} helperText={!pass ? "Require" : ""} id="filled-basic" label="Password" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'white' } }} />
                </div>

                <div className="buttonmargin style">
                    <Typography align='center'>
                        <Button variant="contained" size="large" className="button" >Start</Button>
                    </Typography>
                    <div className="link">
                        <Link href="#" color="inherit" >
                            Don't have an account ?<br />
                            Sign up here !
                        </Link>
                    </div>
                </div>
            </div>

        </Grid>
        <Grid item xs={4} className="hide">
            <img src={signinimg} alt="Background" className="size" />
        </Grid>
    </Grid>)
};

export default SignIn;