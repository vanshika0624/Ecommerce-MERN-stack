import React from "react";
import  "./profile.css"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
const Profile = () => {
    const navigate = useNavigate();

    const logOut=()=>
    {
        axios
        .get(`http://localhost:2000/user/logout/`,{ withCredentials: true })
        .then((res) => {
            // console.log(res)
        })
        .catch((err) => {
            console.log('Error while logging out');
        });
        navigate('/')
    }

    const goToAddress = () => {
        navigate('/address')
    }

    const goToPassword = () => {
        navigate('/changePassword')
    }
    
    return <div className="imgstyle">
    
    <div>
        
        <div className="buttonmargin">
            <Typography align="right"  >
                <Button className="buttonStyle" variant="outlined" size="large" color="inherit" onClick={logOut}> Sign Out </Button>
            </Typography>
        </div>

         {/* need to remove this later */}
        Profile
        <Link to="/seller-dashboard">Go to Seller Dashboard</Link>

        <div className="profileOuterCard">
        <Grid container direction="row">
            <Grid item xs={8}  >
                <Card variant="outlined" className="profileInnerCard" sx={{ minWidth: 450, minHeight: 550 }}>
                    <CardContent>
                        <Typography fontSize="40px" color="black" align="center">
                            Orders
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <div>
                <Grid item xs={4}>
                    <Card variant="outlined" className="profileInnerCard" sx={{ minWidth: 450, minHeight: 550 }}>
                        <CardContent>
                            <Typography color="black" align="center">
                                <Button size="large" className="buttonstyleP" >Orders</Button><br/>
                                <Button size="large" className="buttonstyleP" onClick={goToAddress}>User Details</Button><br/>
                                <Button size="large" className="buttonstyleP" onClick={goToPassword}>Password</Button><br/>
                            </Typography>
                        </CardContent>
                        
                       
                    </Card>
                </Grid>
            </div>

        </Grid>
        </div>
        
    </div>
   


    </div>
};

export default Profile;