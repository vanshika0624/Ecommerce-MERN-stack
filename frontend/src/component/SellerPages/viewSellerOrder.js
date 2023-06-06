import React, {useState, useEffect} from "react";
import  "./viewSellerOrder.css"
import SellerNavBar from "./sellerNavBar.js";
import Typography from '@mui/material/Typography';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Footer from "../Footer.js";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Card, CardContent, Grid } from '@mui/material';
//import { DataGrid } from 'react';
import { DataGrid, GridActionsCellItem, GridColDef} from '@mui/x-data-grid';
import axios from "axios";
const ViewSellerOrder = () => {
    
    const { id } = useParams();
    const [shippingInfo, setShippingInfo] = useState({});
    const [buyerInfo, setBuyerInfo] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [orderNumber, setOrderNumber] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    const columns = [
        { field: "id", headerName: "", maxWidth: 30, flex: 1, sortable: false },
        { field: "refNum", headerName: "", maxWidth: 30, flex: 1, sortable: false},
        { field: "productID", headerName: "Product ID", maxWidth: 250, flex: 1, sortable: false },
        { field: "name", headerName: "Name", maxWidth: 300, flex: 1 },
        { field: "price", headerName: "Price", maxWidth: 150, flex: 1, type: "number", valueFormatter: ({ value }) => currencyFormatter.format(value)},
        { field: "quantity", headerName: "Quantity", maxWidth: 100, flex: 1, type: "number" },
        { field: "tPrice", headerName: "Total Price", maxWidth: 150, flex: 1, type: "number", valueFormatter: ({ value }) => currencyFormatter.format(value) },
        { field: "pStatus", headerName: "Status", maxWidth: 200, flex: 1, editable: true,
            type: "singleSelect",
            valueOptions: [
                { value: 'Processing', label: 'Processing' },
                { value: 'Shipped', label: 'Shipped' },
                { value: 'Delivered', label: 'Delivered' }
            ]
        },
        { field: "actions", headerName: "Actions", minWidth: 150, flex: 0.3, align: 'left', type: 'actions', 
        renderCell: (params) => {
            return (
                <Button size="small" style={{ color: "#3b2f28", fontWeight: 'bold'}} onClick={updateOrderStatus(params.row.productID, params.row.pStatus)}>Update<CheckCircleOutlineIcon fontSize="small"/></Button>
            );
          }
        }
    ];
 
    let totalPrice = 0;

    const rows = [];
    orderItems &&
    orderItems.forEach((item, index) => {
        let tPrice = item.price * item.quantity;
        totalPrice = totalPrice + tPrice;
        rows.push({
            id: index + 1,
            refNum: item.refNumber,
            productID: item.product,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            tPrice: tPrice,
            pStatus: item.orderStatus
        });
    }
    );

    const updateOrderStatus = (productID, status) => {
        axios
        .put(`http://localhost:2000/mart/seller/updateOrder/`, { 
            "orderId": id,
            "productId": productID,
            "status": status
        }, { withCredentials: true })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        axios
        .get(`http://localhost:2000/mart/seller/order/${id}`, { withCredentials: true })
        .then((res) => {
            setShippingInfo(res.data.order.shippingInfo);
            setBuyerInfo(res.data.order.user);
            setPaymentInfo(res.data.order.paymentInfo);
            setOrderItems(res.data.order.orderItems);
            setOrderNumber(res.data.order.orderNumber);
            const oDate = new Date(res.data.order.orderDate);
            setOrderDate(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(oDate));

            setErrorMsg('')
        })
        .catch((err) => {
            console.log('Error while fetching Orders');
            console.log(err);
          setErrorMsg('No Orders to Display!')
        });
    }, []);

    return <div className="imgstyle">
    <SellerNavBar/>
    <div>
        <Card variant="outlined" className="profileOuterCard" sx={{ minWidth: 450, minHeight: 585 }}>
            <CardContent className="cardPadding">
                <Typography fontSize="40px" color="black" align="left">
                    Order Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}  >
                        <Typography variant="h6" component="h6" color="#3b2f28" align="left">
                            Order Number: {orderNumber}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Ordered on: {orderDate}
                        </Typography> 
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Total Price: ${totalPrice}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Payment Status: {paymentInfo.status}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Payment ID: {paymentInfo.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}  >
                        <Typography variant="h6" component="h6" color="#3b2f28">
                            Shipping Address:
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {buyerInfo.firstname} {buyerInfo.lastname}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.address}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.zipCode}
                        </Typography>
                        <Typography variant="hbody25" component="p" color="#3b2f28" align="left">
                            Mobile: {shippingInfo.phoneNo}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent className="cardPadding">  
                <Typography fontSize="25px" color="black" align="left">
                    Ordered Items
                </Typography>
                <Card className="sellerOrderPage_card">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        disableRowSelectionOnClick
                        className="myOrdersGridView"
                        autoHeight
                        getRowId={(row) => row.productID}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    refNum: false
                                },
                            },
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[10, 25, 50]}
                    />
                </Card>
            </CardContent>
        {errorMsg !== "" &&
        <Typography fontSize="40px" color="black" align="center">
            {errorMsg}
        </Typography>
        }
        </Card>
    </div>
    <Footer/>
    </div>
};

export default ViewSellerOrder;