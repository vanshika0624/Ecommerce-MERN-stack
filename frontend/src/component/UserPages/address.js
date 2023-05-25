import React, { useState } from "react";
import "./address.css";
// import adimg from "../images/address.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
const Address = () => {
    const [value0, setValue0] = useState("");
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    return (<div className="add_imgstyle">
        {/* <img src={adimg} alt="Background" className="add_imgstyle" /> */}
        <Grid container direction="row" >
            <Grid item xs={4}  >
                <div className="add_align">
                    <div >
                        <Typography align="center" className="add_style" >
                            Fill in Your Address
                        </Typography>
                    </div>
                </div>

            </Grid>
            <div>
                <Grid item xs={8} style={{ margin: '50px 100px 0px 400px' }} >
                    <Card variant="outlined" className="add_cardStyle" sx={{ minWidth: 450 }}>
                        <CardContent>
                            <Typography fontSize="40px" color="black" align="center">
                                Address
                            </Typography>
                        </CardContent>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" value={value0} onChange={(e) => setValue0(e.target.value)} error={!value0} helperText={!value0 ? "Require" : ""} label="Street" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" label="Apt/Building No." variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" value={value1} onChange={(e) => setValue1(e.target.value)} error={!value1} helperText={!value1 ? "Require" : ""} label="City" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" value={value2} onChange={(e) => setValue2(e.target.value)} error={!value2} helperText={!value2 ? "Require" : ""} label="State" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div style={{ margin: "10px", textAlign: "center" }}>
                            <TextField required id="outlined-required" value={value3} onChange={(e) => setValue3(e.target.value)} error={!value3} helperText={!value3 ? "Require" : ""} label="Zip-Code" variant="filled" className="add_textbox" InputLabelProps={{ style: { color: 'black' } }} />
                        </div>
                        <div className="add_buttonmargin">
                            <Typography align='center'>
                                <Button  variant="contained" size="large" className="add_button" >Add</Button>
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            </div>

        </Grid>
    </div>)
};

export default Address;