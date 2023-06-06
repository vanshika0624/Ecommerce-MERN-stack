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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

// const axios = require('axios');




const SellerSignUp = () => {

    const [USstate, setUSstate] = React.useState('');

    const handleUSstateChange = (event) => {
        setUSstate(event.target.value);
    };
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
    const [streetError, setStreetError] = useState('');
    const [cityError, setCityError] = useState('');
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
            // setPasswordError('Password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
setPasswordError("Format Error! Check the tooltip for details");
        }
        else {
            setPasswordError('')
        }
    }
    const validatePassword = (password) => {
        const passwordRegex = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/;
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
    const navigate = useNavigate();
    const goToSignin = () => {
        navigate('/signin')
    }

    const handleStreetChange = (e) => {
        setstreet(e.target.value)
        if ( (e.target.value.length)===0) {
            setStreetError('Please Enter Street Name')

        }
        else if(e.target.value.length>50) {
            setStreetError('Please enter less than 50 characters')
        }
        
    }


   
    const validateAddress = (address) => {
        const cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        return cityRegex.test(address)

    }

    // const handleStateChange = (e) => {
    //     setstate(e.target.value)
    //     if (!validateAddress(e.target.value)) {
    //         setStreetError('Please Enter Valid State Name')
    //     }
    //     else {
    //         setStateError('')
    //     }
    // }
    const handleCityChange = (e) => {
        setcity(e.target.value)
        if (!validateAddress(e.target.value)) {
            setCityError('Please Enter Valid City Name')

        }
        else {
            setCityError('')
        }
    }

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
            setPnoError('Format: +1 (111)-(222)-(3333)')

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
            }, { withCredentials: true })
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
                        <TextField id="outlined-basic" value={fname} onChange={handleFnameChange} error={Boolean(fnameError)} helperText={fnameError} label="First Name" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                        <TextField id="outlined-basic" value={lname} label="Last Name" onChange={handleLnameChange} error={Boolean(lnameError)} helperText={lnameError} variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        <TextField id="outlined-basic" value={email} onChange={handleEmailChange} error={Boolean(emailError)} helperText={emailError} label="Email" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                        <TextField id="outlined-basic" value={password} onChange={handlePasswordChange} error={Boolean(passwordError)} helperText={passwordError} label="Password" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} type="password" />
                        <Tooltip title="Password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character">
                             <InfoIcon fontSize="small" /> 
                             </Tooltip>
                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        <TextField required id="outlined-basic" value={street} onChange={handleStreetChange} error={Boolean(streetError)} helperText={streetError} label="Address" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                        <TextField required id="outlined-required" value={city} onChange={handleCityChange} error={Boolean(cityError)} helperText={ cityError } label="City" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        {/* <TextField id="outlined-basic" value={st} onChange={(e) => setst(e.target.value)} error={!st} helperText={!st ? "" : ""} label="State" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} /> */}
                        <FormControl required sx={{ m: 0, minWidth: 280 }}>
                            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={USstate}
                                label="State"
                                onChange={handleUSstateChange}
                            >

                                <MenuItem value={"AL"}>Alabama</MenuItem>
                                <MenuItem value={"AK"}>Alaska</MenuItem>
                                <MenuItem value={"AZ"}>Arizona</MenuItem>
                                <MenuItem value={"AR"}>Arkansas</MenuItem>
                                <MenuItem value={"CA"}>California</MenuItem>
                                <MenuItem value={"CO"}>Colorado</MenuItem>
                                <MenuItem value={"CT"}>Connecticut</MenuItem>
                                <MenuItem value={"DE"}>Delaware</MenuItem>
                                <MenuItem value={"FL"}>Florida</MenuItem>
                                <MenuItem value={"GA"}>Georgia</MenuItem>
                                <MenuItem value={"HI"}>Hawaii</MenuItem>
                                <MenuItem value={"ID"}>Idaho</MenuItem>
                                <MenuItem value={"IL"}>Illinois</MenuItem>
                                <MenuItem value={"IN"}>Indiana</MenuItem>
                                <MenuItem value={"IA"}>Iowa</MenuItem>
                                <MenuItem value={"KS"}>Kansas</MenuItem>
                                <MenuItem value={"KY"}>Kentucky</MenuItem>
                                <MenuItem value={"LA"}>Louisiana</MenuItem>
                                <MenuItem value={"ME"}>Maine</MenuItem>
                                <MenuItem value={"MD"}>Maryland</MenuItem>
                                <MenuItem value={"MA"}>Massachusetts</MenuItem>
                                <MenuItem value={"MI"}>Michigan</MenuItem>
                                <MenuItem value={"MN"}>Minnesota</MenuItem>
                                <MenuItem value={"MS"}>Mississippi</MenuItem>
                                <MenuItem value={"MO"}>Missouri</MenuItem>
                                <MenuItem value={"MT"}>Montana</MenuItem>
                                <MenuItem value={"NE"}>Nebraska</MenuItem>
                                <MenuItem value={"NV"}>Nevada</MenuItem>
                                <MenuItem value={"NH"}>New Hampshire</MenuItem>
                                <MenuItem value={"NJ"}>New Jersey</MenuItem>
                                <MenuItem value={"NM"}>New Mexico</MenuItem>
                                <MenuItem value={"NY"}>New York</MenuItem>
                                <MenuItem value={"NC"}>North Carolina</MenuItem>
                                <MenuItem value={"ND"}>North Dakota</MenuItem>
                                <MenuItem value={"OH"}>Ohio</MenuItem>
                                <MenuItem value={"OK"}>Oklahoma</MenuItem>
                                <MenuItem value={"OR"}>Oregon</MenuItem>
                                <MenuItem value={"PA"}>Pennsylvania</MenuItem>
                                <MenuItem value={"RI"}>Rhode Island</MenuItem>
                                <MenuItem value={"SC"}>South Carolina</MenuItem>
                                <MenuItem value={"SD"}>South Dakota</MenuItem>
                                <MenuItem value={"TN"}>Tennessee</MenuItem>
                                <MenuItem value={"TX"}>Texas</MenuItem>
                                <MenuItem value={"UT"}>Utah</MenuItem>
                                <MenuItem value={"VT"}>Vermont</MenuItem>
                                <MenuItem value={"VA"}>Virginia</MenuItem>
                                <MenuItem value={"WA"}>Washington</MenuItem>
                                <MenuItem value={"WV"}>West Virginia</MenuItem>
                                <MenuItem value={"WI"}>Wisconsin</MenuItem>
                                <MenuItem value={"WY"}>Wyoming</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField id="outlined-basic" value={zip} label="ZipCode" onChange={handleZipChange} error={Boolean(zipError)} helperText={zipError} variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />

                    </div>
                    <div style={{ margin: "5px", textAlign: "center" }}>
                        <TextField required id="outlined-required" value={pno} onChange={handlePnoChange} error={Boolean(pnoError)} helperText={pnoError} label="Phone Number" variant="outlined" className=" textbox" InputLabelProps={{ style: { color: 'grey' } }} />
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
                                <Button variant="contained" size="large" onClick={goToSignin} className="button" >Click here to Sign In</Button>
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