// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DisplayPage from "./component/DisplayPage.js";
import SignIn from './component/UserPages/signin.js';
import SignUp from './component/UserPages/signup.js';
import OrderSuccess from './component/UserPages/OrderSuccess.js';
import SellerSignUp from './component/SellerPages/signup.js'
import Address from './component/UserPages/address.js';
import ChangePassword from './component/UserPages/changePassword.js';
import Jewelry from "./component/UserPages/ProductPages/Jewelry.js";
import Clothing from "./component/UserPages/ProductPages/Clothing.js";
import Furniture from "./component/UserPages/ProductPages/Furniture.js";
import HomeDecor from "./component/UserPages/ProductPages/HomeDecor.js";
import Paintings from "./component/UserPages/ProductPages/Paintings.js";
import Toys from "./component/UserPages/ProductPages/Toys.js";
import HomePage from "./component/Homepage.js";
import Cart from "./component/UserPages/cart.js";
import Profile from "./component/UserPages/profile.js";
import ViewProduct from "./component/UserPages/ProductPages/ViewProduct.js";
// import Search from "./component/UserPages/ProductPages/searchResult.js";
// import Navigation from "./component/navigation.js"
import AddProduct from './component/SellerPages/addProduct.js'
import EditProduct from './component/SellerPages/editProduct.js'
import Dashboard from './component/SellerPages/dashboard.js'
import ViewSingleOrder from "./component/UserPages/viewOrder.js";
import ViewSellerOrder from "./component/SellerPages/viewSellerOrder.js";
import SellerOrders from './component/SellerPages/sellerOrders.js'
import SearchResults from "./component/UserPages/ProductPages/searchResult.js";
import Catalogue from './component/SellerPages/catalogue.js'
import AboutUs from './component/AboutUs.js'


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<DisplayPage />} />
          <Route path='/user-signup' element={<SignUp />} />
          <Route path='/ordersuccess' element={<OrderSuccess />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/seller-signup' element={<SellerSignUp />} />
          <Route path='/address' element={<Address />} />
          <Route path='/changePassword/:role' element={<ChangePassword />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/jewelry' element={<Jewelry />} />
          <Route path='/furniture' element={<Furniture />} />
          <Route path='/clothing' element={<Clothing />} />
          <Route path='/home-decor' element={<HomeDecor />} />
          <Route path='/paintings' element={<Paintings />} />
          <Route path='/toys' element={<Toys />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/footer' element={<Footer />} /> */}
          <Route path='/products/:id' element={<ViewProduct />} />
          <Route path='/products/:id/:keyword' element={<ViewProduct />} />
          <Route path='/search' element={<SearchResults />} />
          <Route path='/add-product' element={< AddProduct />} />
          <Route path='/edit-product/:id' element={< EditProduct />} />
          {/* <Route path ='/navigation' element ={<Navigation/>}/> */}
          <Route path='/seller-dashboard' element={< Dashboard />} />
          <Route path='/orders/:id' element={<ViewSingleOrder/>} />
          <Route path='/seller-orders' element={<SellerOrders/>} />
          <Route path='/seller-orders/:id' element={<ViewSellerOrder/>} />
          <Route path='/search/:keyword' element={<SearchResults />} />
          <Route path='/seller/catalogue' element={< Catalogue />} />
          <Route path='/aboutUs' element={<AboutUs />} />

        

        </Routes>
      </div>
    </Router>

  );
}

export default App;