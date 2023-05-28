import React, { useState } from "react";
import "./signup.css";
import signupimg from "../../images/soap.png";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [fnameError, setfnameError] = useState('');
    const [lnameError, setlnameError] = useState('');
    const [successmsg, setSuccessmsg] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [emptyfields, setEmptyfields] = useState(false);
    const navigate= useNavigate();

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

    const sendData= (event)=>{
        event.preventDefault()      
    if(lname!="" && fname!="" && email!="" && password!="" ) {       
        setEmptyfields(false);    
     axios.post("http://localhost:2000/user/register",  {
            "firstname": fname,
            "lastname": lname,
            "email":email,
            "password":password,
            "role":"buyer",
                    },{ withCredentials: true })
        .then((response) => {if (response.status == 201)
        {
           setSuccessmsg(true);
           
           console.log(response)
        }
        else
        {
            setErrmsg(true);
        }
    })
        .catch((err) => console.log(err,"err"));    
}
else{
   
   
    setEmptyfields(true);
    
    }
  }

  const goToSignin=()=>
  {
      navigate('/signin')
  }
  const goToSellerSignup=()=>
  {
      navigate('/seller-signup')
  }

    return (
        
            <Grid container direction="row" className="userSignup_bgcolor">
                
        <Grid item xs={8}  >
        <form autoComplete="off" onSubmit={sendData}>
            <div className="userSignup_align">
                <div >
                    <Typography align="left" className="userSignup_style" >
                        Create an Account
                    </Typography>
                </div>
                <div style={{ margin: "5px", textAlign: "left" }}>
                    <TextField id="outlined-basic" value={fname} onChange={handleFnameChange} error={Boolean(fnameError)} helperText={fnameError} label="First Name" variant="outlined" className="userSignup_textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    <TextField id="outlined-basic" value={lname} onChange={handleLnameChange} error={Boolean(lnameError)} helperText={lnameError} label="Last Name" variant="outlined" className="userSignup_textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                <div style={{ margin: "5px", textAlign: "left" }}>
                    <TextField id="outlined-basic" value={email} onChange={handleEmailChange} error={Boolean(emailError)} helperText={emailError} label="Email" variant="outlined" className="userSignup_textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                    <TextField id="outlined-basic" value={password} onChange={handlePasswordChange} error={Boolean(passwordError)} helperText={passwordError} label="Password" variant="outlined" className="userSignup_textbox" InputLabelProps={{ style: { color: 'grey' } }} />
                </div>
                {/* <div style={{ margin: "5px", textAlign: "left" }}>
                    
                </div> */}

                <div className="userSignup_buttonmargin ">
                    <Typography  align='left'>
                        <Button variant="contained" size="large" type="submit" className="userSignup_button" >Sign Up</Button>
                    </Typography>
                   { successmsg && !emptyfields && <div><Typography className="userSignup_successmsg">
    Account Created Succesfully!
  </Typography>
  
   <Button variant="contained" size="large"  onClick={goToSignin} className="userSignup_button" >Click here to Sign In</Button>
   </div>
  }
                   {
                    errmsg &&  <Typography className="userSignup_errmsg">
                    Something went Wrong!! Please try again after sometime.
                  </Typography>
                   
                   }
                   {
                    emptyfields && <div>
                    <Typography className="userSignup_errmsg">
                    Please fill all the required fields.
                    </Typography>
                    </div>
                   }

                    <div className="userSignup_link" >
                        <Link color="inherit"  onClick={goToSellerSignup} >
                            Interested in selling?<br />
                            Click here to join !
                        </Link>
                    </div>
                </div>
            </div>
            </form>
        </Grid>
       
        <Grid item xs={4} className="userSignup_hide">
            <img src={signupimg} alt="Background" className="userSignup_size" />
        </Grid>
       
    </Grid>
    )
};

export default SignUp;