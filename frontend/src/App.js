// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DisplayPage from "./component/DisplayPage.js";
import SignIn from './component/UserPages/signin.js';
import SignUp from './component/UserPages/signup.js';
import SellerSignUp from './component/SellerPages/signup.js'
import Address  from './component/UserPages/address.js';
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
     </Routes>
     </div>
     </Router>

  );
}

export default App;