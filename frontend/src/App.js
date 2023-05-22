// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DisplayPage from "./component/DisplayPage.js";
import SignIn from './component/UserPages/signin.js';
import SignUp from './component/UserPages/signup.js';
import SellerSignUp from './component/SellerPages/signup.js'
import Address  from './component/UserPages/address.js';
import Jewelry from "./component/UserPages/ProductPages/Jewelry.js";
import Clothing from "./component/UserPages/ProductPages/Clothing.js";
import Furniture from "./component/UserPages/ProductPages/Furniture.js";
import HomeDecor from "./component/UserPages/ProductPages/HomeDecor.js";
import Paintings from "./component/UserPages/ProductPages/Paintings.js";
import Toys from "./component/UserPages/ProductPages/Toys.js";
import HomePage from "./component/Homepage.js";
import ViewProduct from "./component/UserPages/ProductPages/ViewProduct.js";

// import Navigation from "./component/navigation.js"
function App() {
  return (
    <Router>
    <div>  
      <Routes>
      <Route exact path='/' element={<DisplayPage/>} />    
      <Route  path='/user-signup' element={<SignUp />} />     
      <Route  path='/signin' element={<SignIn />} />   
      <Route  path='/seller-signup' element={<SellerSignUp />} />
      <Route  path='/address' element={<Address />} />
      <Route  path='/home' element={<HomePage />} />
      <Route  path='/jewelry' element={<Jewelry />} />
      <Route  path='/furniture' element={<Furniture />} />
      <Route  path='/clothing' element={<Clothing />} />
      <Route  path='/home-decor' element={<HomeDecor />} />
      <Route  path='/paintings' element={<Paintings />} />
      <Route  path='/toys' element={<Toys />} />
      <Route  path='/products/:id' element={<ViewProduct />} />
      {/* <Route path ='/navigation' element ={<Navigation/>}/> */}
     </Routes>
     </div>
     </Router>

  );
}

export default App;