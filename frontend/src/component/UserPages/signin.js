import React, { useState } from "react";
import "./signin.css";
import signinimg from "../../images/Jewelry.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios';
const SignIn = () => {

    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");
    const [successmsg, setSuccessmsg] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [emptyfields, setEmptyfields] = useState(false);

    const getData = (event) => {
        event.preventDefault()
        if (user != "" && pass != "") {
            setEmptyfields(false);
            axios.get("http://localhost:2000/user/login", {
                "email": user,
                "password": pass,
            })
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        setSuccessmsg(true);
                        console.log("success")
                    }
                    else {
                        console.log("error")
                        setErrmsg(true);
                    }
                })
                .catch((err) => console.log(err, "err"));
        }
        else {


            setEmptyfields(true);

        }
    }
    return (<Grid container direction="row" className="userSignin_bgcolor">
        <Grid item xs={8}  >
            <div className="userSignin_align">
                <div >
                    <Typography align="center" className="userSignin_style" >
                        Sign In
                    </Typography>
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>
                    <TextField id="filled-basic" value={user} onChange={(e) => setUser(e.target.value)} error={!user} helperText={!user ? "Require" : ""} label="Username" variant="filled" className="userSignin_textbox" InputLabelProps={{ style: { color: 'white' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "center" }}>
                    <TextField type='password' value={pass} onChange={(e) => setPass(e.target.value)} error={!pass} helperText={!pass ? "Require" : ""} id="filled-basic" label="Password" variant="filled" className="userSignin_textbox" InputLabelProps={{ style: { color: 'white' } }} />
                </div>

                <div className="userSignin_buttonmargin">
                    <Typography align='center'>
                        <Button variant="contained" onClick={getData} size="large" className="userSignin_button" >Sign In</Button>
                    </Typography>
                    {successmsg && !emptyfields && <Typography className="userSignin_successmsg">
                      Signed In Successfully!
                    </Typography>}
                    {
                        errmsg && <Typography className="userSignin_errmsg">
                            Something went Wrong!! Please try again after sometime.
                        </Typography>

                    }
                    {
                        emptyfields && <div>
                            <Typography className="userSignin_errmsg">
                                Please fill all the required fields.
                            </Typography>
                        </div>
                    }
                    <div className="userSignin_link ">
                        <Link href="#" color="inherit" >
                            Don't have an account ?
                            Sign up here !
                        </Link>
                    </div>
                </div>
            </div>

        </Grid>
        <Grid item xs={4} className="userSignin_hide">
            <img src={signinimg} alt="Background" className="userSignin_size" />
        </Grid>
    </Grid>)
};

export default SignIn;