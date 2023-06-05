// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // sameSite: "none"
    };
  
    const userDetails = {
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      phone:user.phone,
      EIN:user.EIN,
      dob:user.dob,
      role: user.role
    }

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      userDetails,
      token,
    });
  };
  
  module.exports = sendToken;