import React, { useState } from "react";
import "./address";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from "axios";
const ChangePassword = () => {
    const [oPsw, setOldPsw] = useState('');
    const [nPsw, setNewPsw] = useState('');
    const [cPsw, setConfPsw] = useState('');
    const [opswError, setOPswError] = useState('Required');
    const [npswError, setNPswError] = useState('Required');
    const [cpswError, setCPswError] = useState('Required');
    const [successMsgFlag, setSuccessMsgFlag] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsgFlag, setErrorMsgFlag] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const validateSamePassword = (newP, confirm) => {
        return (newP == confirm);
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
        return passwordRegex.test(password)
    }
    
    const handleOPswChange = (e) => {
        setOldPsw(e.target.value)
        console.log(e.target.value)
        if(e.target.value.length == 0) {
            setOPswError('Required')
        }
        else {
            setOPswError('')
        }
    }

    const handleNPswChange = (e) => {
        setNewPsw(e.target.value)
        if(e.target.value.length == 0) {
            setNPswError('Required')
        }
        else if (!validatePassword(e.target.value)) {
            setCPswError('Password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
        }
        else {
            setNPswError('')
            setCPswError('')
        }
    }

    const handleCPswChange = (e) => {
        setConfPsw(e.target.value)
        if(e.target.value.length == 0) {
            setCPswError('Required')
        }
        else if (!validateSamePassword(nPsw, e.target.value)) {
            setCPswError('Passwords doesn\'t match!')
        }
        else {
            setCPswError('')
        }
    }

    const updatePassword = (event) => {
        event.preventDefault()
        {
            if(Boolean(opswError == "") && Boolean(npswError == "") && Boolean(cpswError == "")) {
                axios.put("http://localhost:2000/user/updateMyPassword", {
                        "oldPassword": oPsw,
                        "newPassword": nPsw,
                        "confirmPassword": cPsw,
                    }, { withCredentials: true })
                        .then((response) => {
                        setSuccessMsgFlag(true);
                        setErrorMsgFlag(false);
                        setSuccessMsg('Password Updated Succesfully!');
                        })
                        .catch((err) => {
                            setErrorMsgFlag(true);
                            setSuccessMsgFlag(false);
                            setErrorMsg(err.response.data.message);
                        })
            }
        }
        
    }

  
    return (<div className="add_imgstyle">
        <Grid container direction="row" >
            <Grid item xs={4}  >
                <div className="add_align">
                    <div >
                        <Typography align="center" className="add_style" >
                            Change Password
                        </Typography>
                    </div>
                </div>

            </Grid>
            <div>
                <Grid item xs={8} style={{ margin: '50px 100px 0px 400px' }} >
                    <Card variant="outlined" className="add_cardStyle" sx={{ minWidth: 450 }}>
                        <CardContent>
                            <Typography fontSize="40px" color="black" align="center">
                                Password
                            </Typography>
                        </CardContent>
                        
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField type='password' required id="id-oPsw" value={oPsw} onChange={handleOPswChange} error={Boolean(opswError != "")} helperText={Boolean(opswError != "") ? opswError : ""} label="Old Password" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField type='password' required id="id-nPsw" value={nPsw} onChange={handleNPswChange} error={Boolean(npswError != "")} helperText={Boolean(npswError != "") ? npswError : ""} label="New Password" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField type='password' required id="id-cPsw" value={cPsw} onChange={handleCPswChange} error={Boolean(cpswError != "")} helperText={Boolean(cpswError != "") ? cpswError : ""} label="Confirm Password" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        { successMsgFlag && <div className="address_SuccessMsg"><Typography>
                            {successMsg}
                            </Typography></div>
                        }
                        { errorMsgFlag && <div className="address_ErrorMsg"><Typography>
                            {errorMsg}
                            </Typography></div>
                        }
                        <div className="psw_buttonmargin">
                            <Typography align='center'>
                                <Button  variant="contained" size="large" className="add_button" onClick={updatePassword}>Submit</Button>
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            </div>

        </Grid>
    </div>)
};

export default ChangePassword;