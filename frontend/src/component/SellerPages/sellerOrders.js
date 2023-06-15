import React, {useState, useEffect} from "react";
import  "./sellerOrders.css"
import SellerNavBar from "./sellerNavBar.js";
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import Footer from "../Footer.js";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';
import axios from "axios";
const SellerOrders = () => {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const columns = [
        { field: "id", headerName: "", maxWidth: 30, flex: 1, sortable: false },
        { field: "orderId", headerName: "", maxWidth: 30, flex: 1, sortable: false},
        { field: "orderNumber", headerName: "Order Number", maxWidth: 300, flex: 1 },
        { field: "orderDate", headerName: "Order Date", maxWidth: 100, flex: 1 },
        { field: "buyer", headerName: "Buyer Details", maxWidth: 150, flex: 1},
        { field: "shippingDetails", headerName: "Shipping Details", maxWidth: 500, flex: 1 },
        { field: "paymentStatus", headerName: "Payment", maxWidth: 100, flex: 1 },
       // { field: "paymentID", headerName: "Payment ID", maxWidth: 100, flex: 1 },
        { field: "numProducts", headerName: "Products ordered", maxWidth: 125, flex: 1, align: 'right', type: "number" },
        { field: "orderStatus", headerName: "Overall Status", maxWidth: 125, flex: 1 },
        { field: "actions", headerName: "Actions", minWidth: 150, flex: 0.3, align: 'left', type: 'actions',
        renderCell: (params) => {
            return (
              <Link to={`/seller-orders/${params.row.orderId}`}>
                <Button size="large" style={{ color: "#3b2f28", fontWeight: 'bold'}}>Update<LaunchIcon fontSize="small"/></Button>
              </Link>
            );
          },
          
        }
    ]

    
    const rows = [];
    orders &&
    orders.forEach((item, index) => {
        let buyer = item.user.firstname + " " + item.user.lastname;
        let shipAddress = item.shippingInfo.address + ", " + item.shippingInfo.city + ", " + item.shippingInfo.state + ", " + item.shippingInfo.zipCode + ", Mobile: " + item.shippingInfo.phoneNo;
        
        let dCount = 0;
        let sCount = 0;
        let oStatus = "Processing";
        item.orderItems.forEach((prod) => {
            if(prod.orderStatus === "Delivered") {
                dCount++;
            }
            else if(prod.orderStatus === "Shipped") {
                sCount++;
            }
        })

        if(dCount === item.orderItems.length) {
            oStatus = "Delivered"
        }

        else if(sCount === item.orderItems.length) {
            oStatus = "Shipped"
        }

        rows.push({
            id: index + 1,
            orderId: item._id,
            orderNumber: item.orderNumber,
            orderDate: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(item.orderDate)),
            buyer: buyer,
            shippingDetails: shipAddress,
            paymentStatus: item.paymentInfo.status,
            //paymentID: item.paymentInfo.id,
            numProducts: item.orderItems.length,
            orderStatus: oStatus
        });
    });

    useEffect(() => {
        getOrders(currentPage);
    }, []);

    const getOrders = (page) => {
        setCurrentPage(page);
        axios
        .get('http://localhost:2000/mart/seller/getAllMyOrders?page='+ page, { withCredentials: true })
        .then((res) => {
            if(res.data.orders.length > 0) {
                setOrders(res.data.orders);
            }
        })
        .catch((err) => {
            console.log(err)
            console.log('Error while fetching Orders');
        });
        
    };

    return (<div >

    <SellerNavBar/>
    <div className="heading">  Orders <br /> </div>
    <Divider className="divider" />
    <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        disableRowSelectionOnClick
        className="myOrdersGrid"
        autoHeight
        getRowId={(row) => row.orderNumber}
        initialState={{
            columns: {
                columnVisibilityModel: {
                    orderId: false
                },
            },
            pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
    />
    <Footer/>
    </div>
    )
};

export default SellerOrders;