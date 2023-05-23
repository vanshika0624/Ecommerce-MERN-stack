import React,{ useState ,useEffect}  from "react";
// import  "./DisplayPage.css"
// import bg from "../images/bg.jpg";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import {  CardMedia,Grid ,MenuItem,TextField} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";
import Navigation from "../../navigation.js"
const ViewProduct = () => {
const navigate= useNavigate();
const { id } = useParams();
const [productDetails, setProductDetails] = useState({});
const [size, setSize] = React.useState('');
const [quantity, setQuantity] = React.useState(1);

const setSizeValue = (event) => {
  setSize(event.target.value);
}
const setQuantityValue = (event) => {
    setQuantity(event.target.value);
  }

// const renderQuantity =(value)=>
// {
//     {for(let i=1 ; i<= productDetails.Stock; i++)
//         <MenuItem value={i}>i</MenuItem>
// }

// }
// const increaseQuantity = () => {
//   if (productDetails.Stock <= quantity) return;
//   const qty = quantity + 1;
//   setQuantity(qty);
// };

// const decreaseQuantity = () => {
//   if (1 >= quantity) return;
//   const qty = quantity - 1;
//   setQuantity(qty);
// };
const handleInputChange = (event) => {
  const inputValue = Number(event.target.value);
  1>=inputValue?
  setQuantity(1):
  inputValue>productDetails.Stock?
   setQuantity(productDetails.Stock):setQuantity(inputValue)
    
};
useEffect(() => {

    axios
      .get(`http://localhost:2000/product/getProducts/${id}`)
      .then((res) => {
        setProductDetails(res.data.products[0]);
        console.log(res.data.products)
      })
      .catch((err) => {
        console.log('Error from ViewProduct');
      });
  }, [id]);

  const menuItems = Array.from(Array(productDetails.Stock), (_, index) => (
    <MenuItem key={index} value={index + 1}>
       {index + 1}
    </MenuItem>
  ));
    return( <div className="bg" > 
         <Navigation/>
<Grid container direction="row" spacing={2}>
    <Grid item xs={6}>
      <CardMedia  image={productDetails.image} alt ="product image" />
      Image
    </Grid>
    <Grid item xs={4}>
    <Typography variant="h4" component="h4">
          {productDetails.name}
        </Typography>
        <Typography variant="h6" component="h6">
          {productDetails.description}
        </Typography>
        <div>
        <Select
          labelId="product_size_label"
          id="product_size"
          value={size}
          defaultValue="OneSize"
          label="Size"
          onChange={setSizeValue}
        >
          <MenuItem value={"OneSize"}>OneSize</MenuItem>
        </Select>
        { productDetails && productDetails.Stock > 0 ?
        // <Select
        //   labelId="product_quantity_label"
        //   id="product_quantity"
        //   value={quantity}
        //   label="Quantity"
        //   onChange={setQuantityValue}
        // >
        //     {menuItems}
         
        //   {/* <MenuItem value={i}>i</MenuItem> */}

        // </Select>
        <div>
        {/* <Button onClick={decreaseQuantity}>-</Button> */}
                    <div>Quantity</div><TextField readOnly type="number"  value={quantity} onChange={handleInputChange} />
                    {/* <Button onClick={increaseQuantity}>+</Button> */}
                    </div>
        :
        <Typography variant="h4" component="h4">
         Out of Stock!
        </Typography>
}
        </div>

        <div>
            <Button  disabled={productDetails.Stock>0 ? false : true}> Add to Cart</Button>
        </div>
    </Grid>
</Grid>     
    </div>
 ) };
  
  export default ViewProduct;