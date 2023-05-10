import React, { useState } from "react";
import "./address.css";
import adimg from "../images/address.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
const Address = () => {
    const [value, setValue] = useState("");
    return (<div className="imgstyle">
        {/* <img src={adimg} alt="Background" className="imgstyle" /> */}
        <Grid container direction="row" >
            <Grid item xs={4}  >
                <div className="align">
                    <div >
                        <Typography align="center" className="style" >
                            Fill in Your Address
                        </Typography>
                    </div>
                </div>

            </Grid>
            <div>
                <Grid item xs={8} style={{ margin: '50px 100px 0px 400px' }} >
                    <Card variant="outlined" className="cardStyle" sx={{ minWidth: 450 }}>
                        <CardContent>
                            <Typography fontSize="40px" color="black" align="center">
                                Address
                            </Typography>
                        </CardContent>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" value={value} onChange={(e) => setValue(e.target.value)} error={!value} helperText={!value ? "Require" : ""} label="Street" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" label="Apt/Building No." variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" value={value} onChange={(e) => setValue(e.target.value)} error={!value} helperText={!value ? "Require" : ""} label="City" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" value={value} onChange={(e) => setValue(e.target.value)} error={!value} helperText={!value ? "Require" : ""} label="State" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" value={value} onChange={(e) => setValue(e.target.value)} error={!value} helperText={!value ? "Require" : ""} label="Zip-Code" variant="filled" className=" textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div className="buttonmargin">
                            <Typography align='center'>
                                <Button variant="contained" size="large" className="button" >Add</Button>
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            </div>

        </Grid>
    </div>)
};

export default Address;