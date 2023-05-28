import React, { useState, useEffect } from "react";
import "./address.css";
// import adimg from "../images/address.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";
const Address = () => {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [fnameError, setFNameError] = useState('');
    const [lnameError, setLNameError] = useState('');
    const [streetError, setStreetError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [zipError, setZipError] = useState('');
    const [successMsgFlag, setSuccessMsgFlag] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsgFlag, setErrorMsgFlag] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z ]+$/i;
        return nameRegex.test(name)
    }

    const validateZip = (zipCode) => {
        var zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
        return zipRegex.test(zipCode);
    }

    const handleFNameChange = (e) => {
        setFName(e.target.value)
        if(e.target.value.length == 0) {
            setFNameError('Required')
        }
        else if (!validateName(e.target.value)) {
            setFNameError('Please Enter Valid First Name')
        }
        else {
            setFNameError('')
        }
    }
    
    const handleLNameChange = (e) => {
        setLName(e.target.value)
        if(e.target.value.length == 0) {
            setLNameError('Required')
        }
        else if (!validateName(e.target.value)) {
            setLNameError('Please Enter Valid First Name')
        }
        else {
            setLNameError('')
        }
    }

    const handleStreetChange = (e) => {
        setStreet(e.target.value)
        if(e.target.value.length == 0) {
            setStreetError('Required')
        }
        else if (e.target.value.length > 50) {
            setStreetError('Address cannot contain more than 50 characters')
        }
        else {
            setStreetError('')
        }
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
        if(e.target.value.length == 0) {
            setCityError('Required')
        }
        else if (e.target.value.length > 20) {
            setCityError('City cannot be more than 20 characters.')
        }
        else {
            setCityError('')
        }
    }

    const handleStateChange = (e) => {
        setState(e.target.value)
        if(e.target.value.length == 0) {
            setStateError('Required')
        }
        else {
            setStateError('')
        }
    }

    const handleZipChange = (e) => {
        setZip(e.target.value)
        if(e.target.value.length == 0) {
            setZipError('Required')
        }
        else if (!validateZip(e.target.value)) {
            setZipError('Enter Correct Zip Code')
        }
        else {
            setZipError('')
        }
    }

    useEffect(() => {
        axios
            .get('http://localhost:2000/user/getMyDetails',{ withCredentials: true })
            .then((res) => {
                if(res.data.user.address.length > 0) {
                    setFName(res.data.user.firstname)
                    setLName(res.data.user.lastname)
                    setStreet(res.data.user.address[0].street);
                    setCity(res.data.user.address[0].city);
                    setState(res.data.user.address[0].state);
                    setZip(res.data.user.address[0].zipcode);
                }
                setSuccessMsgFlag(true);
                setErrorMsgFlag(false);
                setSuccessMsg('');
            })
            .catch((err) => {
                setErrorMsgFlag(true);
                setSuccessMsgFlag(false);
                setErrorMsg(err.response.data.message);
            });
    }, []);


    const updateAddress = (event) => {
        event.preventDefault()
        {
            if(Boolean(fnameError == "") && Boolean(lnameError == "") &&
            Boolean(stateError == "") && Boolean(zipError == "") &&
            Boolean(stateError == "") && Boolean(zipError == "")) {
                axios.put("http://localhost:2000/user/updateMyDetails", {
                    "firstname": fname,
                    "lastname": lname,
                    "address": [{
                            "street": street,
                            "city": city,
                            "state": state,
                            "zipcode": zip
                        }]
                    }, { withCredentials: true })
                        .then((response) => {
                        setSuccessMsgFlag(true);
                        setErrorMsgFlag(false);
                        setSuccessMsg('Address Updated Succesfully!');
                        })
                        .catch((err) => {
                            setErrorMsgFlag(true);
                            setSuccessMsgFlag(false);
                            setErrorMsg('Error occured while updating the Address!');
                        })
            }
        }
        
    }

  
    return (<div className="add_imgstyle">
        <Grid container direction="row" >
            <Grid item xs={2}  >
                <div className="add_align">
                    <div >
                        <Typography align="center" className="add_style" >
                            Update User Details
                        </Typography>
                    </div>
                </div>

            </Grid>
            <div>
                <Grid item xs={10} style={{ margin: '100px 50px 0px 375px' }} >
                    <Card variant="outlined" className="add_cardStyle" sx={{ minWidth: 650 }}>
                        <CardContent>
                            <Typography fontSize="40px" color="black" align="center">
                                User Deatils
                            </Typography>
                        </CardContent>
                        
                        <div style={{ margin: "20px", textAlign: "left" }}>
                            <TextField required id="id-fname" value={fname} onChange={handleFNameChange} error={Boolean(fnameError != "")} helperText={Boolean(fnameError != "") ? fnameError : ""} label="First Name" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                            <TextField required id="id-lname" value={lname} onChange={handleLNameChange} error={Boolean(lnameError != "")} helperText={Boolean(lnameError != "") ? lnameError : ""} label="Last Name" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "20px", textAlign: "left" }}>
                            <TextField required id="id-street" value={street} onChange={handleStreetChange} error={Boolean(streetError != "")} helperText={Boolean(streetError != "") ? streetError : ""} label="Address" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                            <TextField required id="id-city" value={city} onChange={handleCityChange} error={Boolean(cityError != "")} helperText={Boolean(cityError != "") ? cityError : ""} label="City" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "20px", textAlign: "left" }}>
                            <FormControl required sx={{minWidth: 380, marginLeft: 1.25 }} variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} >
                                <InputLabel id="id-state-label">State</InputLabel>
                                <Select labelId="state-label" id="id-state-dd" value={state} label="State" onChange={handleStateChange} error={Boolean(stateError != "")} helperText={Boolean(stateError != "") ? stateError : ""} >
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
                            <TextField required id="id-zip" value={zip} onChange={handleZipChange} error={Boolean(zipError != "")} helperText={Boolean(zipError != "") ? zipError : ""} label="ZipCode" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        { successMsgFlag && <div className="address_SuccessMsg"><Typography>
                            {successMsg}
                            </Typography></div>
                        }
                        { errorMsgFlag && <div className="address_ErrorMsg"><Typography>
                            {errorMsg}
                            </Typography></div>
                        }
                        <div className="add_buttonmargin">
                            <Typography align='center'>
                                <Button  variant="contained" size="large" className="add_button" onClick={updateAddress}>Submit</Button>
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            </div>

        </Grid>
    </div>)
};

export default Address;