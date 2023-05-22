import React,{ useState ,useEffect}  from "react";
// import  "./DisplayPage.css"
// import bg from "../images/bg.jpg";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import {  CardMedia,Grid ,MenuItem} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";

const ViewProduct = () => {
const navigate= useNavigate();
const { id } = useParams();
const [productDetails, setProductDetails] = useState({});
const [size, setSize] = React.useState('');
const [quantity, setQuantity] = React.useState('');

const setSizeValue = (event) => {
  setSize(event.target.value);
}
const setQuantityValue = (event) => {
    setQuantity(event.target.value);
  }
useEffect(() => {
    
    axios
      .get(`http://localhost:2000/products/getProducts/${id}`)
      .then((res) => {
        setProductDetails(res.data);
      })
      .catch((err) => {
        console.log('Error from ViewProduct');
      });
  }, [id]);
    return( <div > 

        Product Details
<Grid container direction="row" spacing={4}>
    <Grid item xs={4}>
      <CardMedia  image={productDetails.image} alt ="product image" />
    </Grid>
    <Grid item xs={4}>
        <div>
            Product Title
        </div>
        <div>
            ProductDescription
        </div>
        <div>
        <Select
          labelId="product_size_label"
          id="product_size"
          value={size}
          label="Size"
          onChange={setSizeValue}
        >
          <MenuItem value={10}>S</MenuItem>
          <MenuItem value={20}>M</MenuItem>
          <MenuItem value={30}>L</MenuItem>
        </Select>
        <Select
          labelId="product_quantity_label"
          id="product_quantity"
          value={quantity}
          label="Quantity"
          onChange={setQuantityValue}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
        </div>
        <div>
            <Button > Add to Cart</Button>
        </div>
    </Grid>
</Grid>     
    </div>
 ) };
  
  export default ViewProduct;