import React, {useState, useEffect} from "react";
import  "./profile.css"
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import Pagination from "react-js-pagination";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import axios from "axios";
const Profile = () => {
    const navigate = useNavigate();
    
    const [role, setRole] = useState('');
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumOrders, setTotalNumofOrders] = useState();
    const [resultsPerPage, setResultsPerPage] = useState(2);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:2000/user/getMyDetails',{ withCredentials: true })
            .then((res) => {
                setRole(res.data.user.role);
                setErrorMessage('');
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    }, []);

    useEffect(() => {
        getOrders(currentPage);
    }, []);

    const getOrders = (page) => {
        setCurrentPage(page);
        axios
        .get('http://localhost:2000/mart/getAllMyOrders?page='+ page, { withCredentials: true })
        .then((res) => {
            if(res.data.orders.length > 0) {
                setOrders(res.data.orders);
                setTotalNumofOrders(res.data.ordersCount);
                setResultsPerPage(res.data.resultsPerPage);
                setErrorMessage('')
            }
            else {
                setErrorMessage('No Orders to Display!')
            }
        })
        .catch((err) => {
          console.log('Error while fetching Orders');
          setErrorMessage('No Orders to Display!')
        });
        
    };

    const goToUserDetails = () => {
        navigate('/address')
    }
    
    const goToOrders = () => {
        navigate('/profile')
    }
    
    const goToCart = () => {
        navigate('/cart')
    }
    
    const goToHome=()=> {
        navigate('/home')
    }

    return <div className="imgstyle">
    <div>
        <Grid container direction="row">
            <Grid item xs={8}  > 
                <Typography fontSize="40px" color="black" marginLeft={3}>
                </Typography>
            </Grid>
            <Grid item xs={4}  > 
                <div className="buttonmargin">
                    <Typography align="right">
                        <Tooltip title="Home"><HomeIcon fontSize="large" onClick={goToHome}/></Tooltip>
                        <Tooltip title="Orders"><InventoryIcon fontSize="large" onClick={goToOrders}/></Tooltip>
                        <Tooltip title="Cart"><ShoppingCartIcon fontSize="large" onClick={goToCart}/></Tooltip>
                        <Tooltip title="Account"><PersonIcon fontSize="large" onClick={goToUserDetails}/></Tooltip>
                    </Typography>
                </div>
            </Grid>
        </Grid>

        <Card variant="outlined" className="profileOuterCard" sx={{ minWidth: 450, minHeight: 585 }}>
            <CardContent>
                <Typography fontSize="40px" color="black" align="left">
                    Orders
                </Typography>
            </CardContent>

        {orders.map((card) => (
            <Card key={card._id} className="profilePage_card"  >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}  >
                            <Typography variant="h5" component="h5" color="#3b2f28">
                                {card.orderItems.length === 1 && card.orderItems[0].name}
                                {card.orderItems.length > 1 && card.orderItems[0].name + " and " + (card.orderItems.length - 1) + " more.."}
                            </Typography>
                            <Typography variant="body2"component="p" color="#3b2f28">
                                Order Number: {card._id}
                            </Typography>
                            <Typography variant="body2"component="p" color="#3b2f28">
                                Price: ${card.totalPrice}
                            </Typography>
                            <Typography variant="body2"component="p" color="#3b2f28">
                                Status: {card.orderStatus}
                            </Typography>
                            <Typography variant="h6"component="h6" color="#3b2f28">
                                <Link style={{ color: "#3b2f28", fontSize: 15 }} to={`/orders/${card._id}`}>View Details</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className="imgContainer">
                            <CardMedia alt="Order Image">
                                <img src={card.orderItems[0].image} alt="Order Image Preview" />
                            </CardMedia>
                        </Grid>
                    </Grid>
                </CardContent> 
            </Card>
        ))
        }
        {totalNumOrders > resultsPerPage && (
        <div className="paginationBox">
            <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={totalNumOrders}
            onChange={getOrders}
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
            />
        </div>
        )}
        {errorMessage !== "" &&
        <Typography fontSize="40px" color="black" align="center">
            {errorMessage}
        </Typography>
        }
        </Card>
               
    </div>
    </div>
};

export default Profile;