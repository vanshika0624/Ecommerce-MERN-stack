import React ,{ useState ,useEffect} from "react";
import Button from '@mui/material/Button';
import Navigation from "../../navigation.js"
import Typography from '@mui/material/Typography';
import { useNavigate,Link } from 'react-router-dom';
import { ButtonGroup } from "@mui/material";
import { Card, CardContent, CardMedia,Grid } from '@mui/material';
import axios from "axios";
const Furniture = () => {
const navigate= useNavigate();

const [furnitureProducts, setFurnitureProducts] = useState([]);


useEffect(() => {
    axios
      .get('http://localhost:2000/product/getProducts?category=Furniture')
      .then((res) => {
        setFurnitureProducts(res.data.products);
        console.log(res.data.products);
      })
      .catch((err) => {
        console.log('Error from GetProducts');
      });
  }, []);




const disaplyCards=(cards)=>
{ return(
  <Grid container direction="row" spacing={2}  >
  {cards.map((card) => (
   <Grid item xs={4} >
    <Card key={card._id} className="card"  >
      <CardMedia  image={card.image} alt ="product image" />
      <CardContent>
        <Typography variant="h6" component="h6">
          {card.name},
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ${card.price}
        </Typography>
        <Link to={`/products/${card._id}`}> Details</Link>
      </CardContent>
    </Card>
    </Grid>

  ))
}
  </Grid>
)
  
}


    return (
     <div className="bg">
         <Navigation/>
 <div>
        {disaplyCards(furnitureProducts)}
        </div>
       
         </div>
    //  <div>Home</div>
      
  )};
  
  export default Furniture;