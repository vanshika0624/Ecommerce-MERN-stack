import React, { useEffect } from "react";
import Navigation from "./navigation.js"
import SellerNavBar from "./SellerPages/sellerNavBar.js";
import  "./AboutUs.css"
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import Footer from "./Footer.js";
import Typography from '@mui/material/Typography';

const AboutUs = () => {
    const role = localStorage.getItem("userRole");
 
    useEffect(() => {
        
    });

    return <div className="bg">
            { 
            role !== 'seller' &&
            <Navigation/>
            }
            { 
            role === 'seller' && 
            <SellerNavBar/>
            }
            <div>
            <div className="aboutus">
        <Card
            style={{
                width: 950,
                backgroundColor: "#C4AD88" ,
                borderRadius : 10 ,
                
            }}
        >
            <CardContent sx={{width:900}} >
            <Typography variant="h3" component="h2" align="center" fontWeight={'bold'}>
                    About Us 
                    
                </Typography>
                <Typography
                    style={{
                        marginBottom: 12,
                    }}
                    color="textSecondary"
                >
               <p> Welcome to Maker's Mart, your premier destination for handcrafted goods! We are an online e-commerce website that is passionate about showcasing and offering unique, artisanal products. 
                Our dedicated team consists of Anusha K, Vanshika S, Vyshnavi K, and M Sripaad, who embarked on the journey of creating Maker's Mart as part of our master's degree project at the esteemed University of California, Irvine (UCI). Located in the vibrant city of Irvine, California, 
                we draw inspiration from the diverse creative community that surrounds us.</p>
                <p>At Maker's Mart, we firmly believe in the artistry and craftsmanship that goes into handmade products. We take great pride in curating a collection of exceptional items crafted by talented artisans from all over the world. Our goal is to provide a platform that not only supports these skilled individuals but also offers customers the opportunity to discover and acquire truly one-of-a-kind treasures.

By prioritizing handmade products, we aim to foster traditional craftsmanship, support local artisans, and promote sustainable and ethical practices. With our carefully selected range of jewelry, home decor, fashion accessories, and more, we strive to offer our customers a unique shopping experience that celebrates quality, authenticity, and the stories behind each creation.</p>
<p>
Thank you for joining us on this exciting journey at Maker's Mart. By supporting our platform, you are not only investing in exquisite handmade products but also empowering a community of artisans and making a positive impact on the world of commerce. Together, let's celebrate the beauty of handmade goods and discover the magic they hold.
</p>
<p style={{ fontWeight: 'bold' }}>
Happy shopping!
</p><p style={{ fontWeight: 'bold' }}>
    
The Maker's Mart Team </p>
                </Typography>
                </CardContent>
        </Card>
        </div>
            </div>
        <Footer />
    </div>;
  };
  
export default AboutUs;