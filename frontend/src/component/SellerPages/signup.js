import React, { useState } from "react";
import "./signup.css";
import img1 from "../../images/seller.png";
import img2 from "../../images/candle.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// const axios = require('axios');

const SellerSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [ein, setein] = useState('');
    const [pno, setpno] = useState('');
    const [street, setstreet] = useState('');
    const [city, setcity] = useState('');
    const [zip, setzip] = useState('');

    const [einError, setEinError] = useState('');
    const [pnoError, setPnoError] = useState('');
    // const [streetError, setStreetError] = useState('');
    // const [cityError, setCityError] = useState('');
    const [zipError, setZipError] = useState('');
    // const [stateError, setStateError] = useState('');

    const [st, setst] = useState('');
    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [successmsg, setSuccessmsg] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [emptyfields, setEmptyfields] = useState(false);

    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (!validateEmail(e.target.value)) {
            setEmailError('Please Enter Valid Email')

        }
        else {
            setEmailError('')
        }
    }
    const validateEmail = (email) => {
        const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (!validatePassword(e.target.value)) {
            setPasswordError('Password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')

        }
        else {
            setPasswordError('')
        }
    }
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
        return passwordRegex.test(password)
    }

    const handleFnameChange = (e) => {
        setfname(e.target.value)
        if (!validatename(e.target.value)) {
            setfnameError('Please Enter Valid First Name')

        }
        else {
            setfnameError('')
        }
    }
    const handleLnameChange = (e) => {
        setlname(e.target.value)
        if (!validatename(e.target.value)) {
            setlnameError('Please Enter Valid Last Name')

        }
        else {
            setlnameError('')
        }
    }
    const validatename = (name) => {
        const nameRegex = /^[a-zA-Z ]+$/i;
        return nameRegex.test(name)
    }
    const navigate= useNavigate();
    const goToSignin=()=>
    {
        navigate('/signin')
    }

    // const handleStreetChange = (e) => {
    //     setstreet(e.target.value)
    //     if (!validateAddress(e.target.value)) {
    //         setStreetError('Please Enter Valid Street Name')

    //     }
    //     else {
    //         setStreetError('')
    //     }
    // }
    // const validateAddress = (address) => {
    //     const streetRegex = /[\S\s]+[\S]+/;
    //     return streetRegex.test(address)

    // }

    // const handleStateChange = (e) => {
    //     setstate(e.target.value)
    //     if (!validateAddress(e.target.value)) {
    //         setStreetError('Please Enter Valid State Name')
    //     }
    //     else {
    //         setStateError('')
    //     }
    // }
    // const handleCityChange = (e) => {
    //     setcity(e.target.value)
    //     if (!validateAddress(e.target.value)) {
    //         setCityError('Please Enter Valid City Name')

    //     }
    //     else {
    //         setCityError('')
    //     }
    // }

    const handleZipChange = (e) => {
        setzip(e.target.value)
        if (!validateZip(e.target.value)) {
            setZipError('Please Enter Valid Zip')

        }
        else {
            setZipError('')
        }
    }
    const validateZip = (zip) => {
        const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

        return zipRegex.test(zip)
    }

    const handlePnoChange = (e) => {
        setpno(e.target.value)
        if (!validatePno(e.target.value)) {
            setPnoError('Please Enter Valid Phone')

        }
        else {
            setPnoError('')
        }
    }
    const validatePno = (pno) => {

        const pnoRegex = /^(\+\d{1,2}\s)\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

        return pnoRegex.test(pno)

    }

    const handleEinChange = (e) => {
        setein(e.target.value)
        if (!validateEin(e.target.value)) {
            setEinError('Please Enter Valid EIN')

        }
        else {
            setEinError('')
        }
    }
    const validateEin = (ein) => {
        const einRegex = /^\d+$/;
        return einRegex.test(ein)
    }



    const sendData = (event) => {
        event.preventDefault()
        if (lname != "" && fname != "" && email != "" && password != "" && pno != "" && ein != "" && st != "" && city != "" && street != "" && zip != "") {
            setEmptyfields(false);
            axios.post("http://localhost:2000/user/register", {
                "firstname": fname,
                "lastname": lname,
                "email": email,
                "password": password,
                "address": [{
                    "street": street,
                    "city": city,
                    "state": st,
                    "zipcode": zip
                }],
                "phone": pno,
                "ein": ein,
                "role": "seller",
            })
                .then((response) => {
                    if (response.status == 201) {
                        setSuccessmsg(true);
                        console.log("success")
                    }
                    else {
                        setErrmsg(true);
                    }
                })
                .catch((err) => console.log(err, "err"));
        }
        else {


            setEmptyfields(true);

        }
    }
    return (<Grid container direction="row" className="bgcolor" >
        <Grid item xs={8}  >
            <form autoComplete="off" onSubmit={sendData}>
                <div className="align">
                    <div >
                        <Typography align="center" className="sellerSignup_style" >
                            Register as a Seller
                        </Typography>
                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        <TextField  id="outlined-basic" value={fname} onChange={handleFnameChange} error={Boolean(fnameError)} helperText={fnameError} label="First Name" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                        <TextField id="outlined-basic" value={lname} label="Last Name" onChange={handleLnameChange} error={Boolean(lnameError)} helperText={lnameError} variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        <TextField id="outlined-basic" value={email} onChange={handleEmailChange} error={Boolean(emailError)} helperText={emailError} label="Email" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                        <TextField id="outlined-basic" value={password} onChange={handlePasswordChange} error={Boolean(passwordError)} helperText={passwordError} label="Password" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        <TextField id="outlined-basic" value={street} onChange={(e) => setstreet(e.target.value)} error={!street} helperText={!street ? "" : ""} label="Address" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                        <TextField id="outlined-basic" value={city} onChange={(e) => setcity(e.target.value)} error={!city} helperText={!city ? "" : ""} label="City" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        <TextField id="outlined-basic" value={st} onChange={(e) => setst(e.target.value)} error={!st} helperText={!st ? "" : ""} label="State" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                        <TextField id="outlined-basic" value={zip} label="ZipCode" onChange={handleZipChange} error={Boolean(zipError)} helperText={zipError} variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        <TextField id="outlined-basic" value={pno} onChange={handlePnoChange} error={Boolean(pnoError)} helperText={pnoError} label="Phone Number" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                        <TextField id="outlined-basic" value={ein} onChange={handleEinChange} error={Boolean(einError)} helperText={einError} label="EIN" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    </div>
                    <div className="buttonmargin style">
                        <Typography align='center'>
                            <Button variant="contained" size="large" type="submit" className="button" >Sign Up</Button>
                        </Typography>
                        {successmsg && !emptyfields && 
                        <div>
                            <Typography className="successmsg">
                            Account Created Succesfully!
                        </Typography>
                        <Button variant="contained" size="large"  onClick={goToSignin} className="button" >Click here to Sign In</Button>
                        </div>}
                        {
                            errmsg && <Typography className="errmsg">
                                Something went Wrong!! Please try again after sometime.
                            </Typography>

                        }
                        {
                            emptyfields && <div>
                                <Typography className="errmsg">
                                    Please fill all the required fields.
                                </Typography>
                            </div>
                        }
                    </div>
                </div>
            </form>
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