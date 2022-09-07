
import './App.css';
import Login from '../src/authorisations/login'
import Home from './actualpage/homepage'
import Signup from './authorisations/signup';
import Shop from './actualpage/shop';
import Nav from '../src/actualpage/nav'
import Cart from './actualpage/cart'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
  
  <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/shop' element={<Shop/>}></Route>
    <Route path='/cart' element={<Cart></Cart>}></Route>

  </Routes>
   
  

 
  
  );
}

export default App;
