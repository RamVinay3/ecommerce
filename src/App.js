
import './App.css';
import Login from '../src/authorisations/login'
import Home from './actualpage/homepage'
import Signup from './authorisations/signup';
import Shop from './actualpage/shop';
import Nav from '../src/actualpage/nav'
import Cart from './actualpage/cart';
import Favorites from './actualpage/favorites';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate
} from "react-router-dom";
import { useState } from 'react';
const auth = getAuth();

// console.log(u)
function App() {
  const [user,setuser]=useState();
  onAuthStateChanged(auth, (user) => {
    if(user){
      setuser(true);
    }else{
      setuser(false)
    }
    // setuser(user);
});
console.log(user);
  return (
  <div>
    {
      user==null?<div>Loading...</div>:<div>
        {user?<div>

      <Routes>

    <Route path='/' element={<Home/>}></Route>
    <Route path='/shop' element={<Shop/>}></Route>
    <Route path='/cart' element={<Cart></Cart>}></Route>
    <Route path='/favorites' element={<Favorites></Favorites>}></Route>
    <Route path='*'  element={<Navigate to="/" />} ></Route>
  </Routes>
   
    </div>:<div>
    <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
  </Routes>
   </div>}
      </div>
    }

  </div>

 
  
  );
}

export default App;
