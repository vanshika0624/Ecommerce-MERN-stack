import React, { useEffect, useState } from "react";
import "./signin.css";
import signinimg from "../../images/Jewelry.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();

    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');
    // const [successmsg, setSuccessmsg] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [errmsg, setErrmsg] = useState('');
    const [emptyfields, setEmptyfields] = useState(false);

    const renderErrorMessage = (name) =>{
        name === errorMessages.name && (
             <div className="error">{errorMessages.message}
             </div>
  );}
  const errors = {
    username: "invalid username",
    password: "invalid password"
  };

    const handleUserChange = (e) => {
        setUser(e.target.value)
        if (!validateUser(e.target.value)) {
            setUserError('Please Enter Valid Username')

        }
        else {
            setUserError('')
        }
    }
    const validateUser = (user) => {
        const userRegex = /^(?!\s*$).+/;
        return userRegex.test(user)

    }

    const validatePass = (pass) => {
        const passRegex = /^(?!\s*$).+/;
        return passRegex.test(pass)

    }

    const handlePassChange = (e) => {
        setPass(e.target.value)
        if (!validatePass(e.target.value)) {
            setPassError('Please Enter Valid Password')

        }
        else {
            setPassError('')
        }
    }

    useEffect(() => {
        reDirectUser();
    });

    const reDirectUser = () => {
        if (localStorage.getItem("userRole") === 'seller') {
            navigate('/seller-dashboard');
        }
        else if (localStorage.getItem("userRole") === 'buyer') {
            navigate('/home');
        }
    }

    const getData = (event) => {
        event.preventDefault()
        if (user != "" && pass != "") {
            setEmptyfields(false);
            axios.post("http://localhost:2000/user/login", {
                "email": user,
                "password": pass,
            }, { withCredentials: true })
                .then((response) => {
                    console.log(response);
                    if (response.status == 200) {
                        localStorage.setItem("accessToken", response.data.token);
                        localStorage.setItem("userRole", response.data.userDetails.role);
                        reDirectUser();
                        console.log("success")
                    }
                    else {
                        console.log("error")
                        setErrmsg("Invalid Email Id or Password");
                    }
                })
                .catch((err) => {
                    console.log(err, "err");
                    setErrmsg("Invalid Email Id or Password");
                });
        }
        else {


            setEmptyfields(true);

        }

    }
    const goToUserSignup = () => {
        navigate('/user-signup')
    }
    return (<Grid container direction="row" className="userSignin_bgcolor">
        <Grid item xs={8}  >
            <div className="userSignin_align">
                <div >
                    <Typography align="center" className="userSignin_style" >
                        Sign In
                    </Typography>
                </div>
                <div style={{ margin: "10px", textAlign: "center", padding: "10px" }}>
                    <TextField id="filled-basic" name = "username" sx={{ width: 300 }} value={user} onChange={handleUserChange} error={Boolean(userError)} helperText={!user ? " " : ""} label="Username" variant="filled" className="userSignin_textbox" InputLabelProps={{ style: { color: 'white' } }} /> {renderErrorMessage("username")}
                </div>
                <div style={{ margin: "10px", textAlign: "center" }}>
                    <TextField type='password' sx={{ width: 300 }} value={pass} name = "password" onChange={handlePassChange} error={Boolean(passError)} helperText={!pass ? "" : ""} id="filled-psw" label="Password" variant="filled" className="userSignin_textbox" InputLabelProps={{ style: { color: 'white' } }} /> {renderErrorMessage("password")} 
                </div>

                <div className="userSignin_buttonmargin">
                    <Typography align='center'>
                        <Button variant="contained" onClick={getData} size="large" className="userSignin_button" >Sign In</Button>

                    </Typography>
                    {errmsg && (
                        <Typography className="userSignin_errmsg">
                            {errmsg}
                        </Typography>)}

                    {/* {
                        errmsg && <Typography className="userSignin_errmsg">
                            Something went Wrong!! Please try again after sometime.
                        </Typography>

                    } */}
                    {
                    emptyfields && <div>
                            <Typography className="userSignin_errmsg">
                                Please fill all the required fields.
                            </Typography>
                        </div>
                    }
                    <div className="link">
                        <Typography align='center'>
                            <Link color="inherit" onClick={goToUserSignup} >
                                Don't have an account ?<br />
                                Sign up here !
                            </Link>
                        </Typography>
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