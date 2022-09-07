import React, {  useEffect, useState } from 'react'
import Nav from './nav'
import Cart from './cart'
import Product from './product'
import styles from './homepage.module.css'
import { collection, addDoc } from "firebase/firestore"; 

import Add from './modal.js'

import {auth} from '../firebase'
import {  onAuthStateChanged ,signOut} from "firebase/auth";
import { doc, getDoc,setDoc,deleteDoc,updateDoc } from "firebase/firestore";
// import {db} from '../firebase'

// import { TextFields } from '@mui/icons-material'
import { async } from '@firebase/util'
import{db} from '../firebase'
// import { async } from '@firebase/util'
// const uid=""
 const Homepage=()=> {


  const [user,setuser]=useState('')
 
  const [cart,setcart]=useState([])
  const [count,setcount]=useState([])
  const [open,setopen]=useState(false)
  const [hadshop,setshop]=useState(false)
  const [display,setdisplay]=useState('')
 
 
    
  
  const show=()=>{
      setopen(true)
      
  }
  const handleClose=()=>{
    setopen(false)
  }

  const launch=async()=>{
    //it will add a product to the database
   console.log("launch")
    // setopen(false)
   
  }
  
  
 
  const increment=async (index,id)=>{
    //it will increment count of total objects
    var x=count;
    x[index]+=1;
    setcount(x)
    const path="users/"+user.email+"personal"+"/cart"
    const docref = doc(db, path, id);
    
      console.log(path);
      await updateDoc(docref, {
        count: x[index]
      });

  }
  const decrement=async(index,id)=>{
    //it will decrement count of products in a cart
    const path="users/"+user.email+"personal"
    var x=count;
    var y=cart;
    
   
    setcount(x)
    
  }
  const addcart=async(id)=>{
    //adding items to the cart
    console.log("hello",id,user)
    //this.is.how you add doc in nested loop of firestore
    const path="users/"+user.email+"personal"+"/cart"
    
    var a=[];
    var k=[];
 
    setcart(a)
    setcount(k)
    // console.log(docref)
  }
 
  useEffect(()=>{
    (async()=>{
      var ref1=doc(db,'products','products')
      var docsnap1=await getDoc(ref1)
      setdisplay(docsnap1.data())

         onAuthStateChanged(auth, (user) => {

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        
         setuser(user)

      } else {
        // User is signed out
        // ...
      }
    });
  
    const path=user.email+"personal"
     console.log(path)
     const docRef = doc(db, "users", path);
      const docSnap = await getDoc(docRef);
      
   
      const access=docSnap.data()
      if(user){
        setshop(access.hadshop)
      }
      console.log(docSnap.data())

    // var a=[];
    // const querySnapshot=await getDocs(collection(db,path))
    // querySnapshot.forEach((doc)=>{
    //   a.push(doc)
    // })
    // setcart({cart:a})
    })();
      

  },[])

 
    return (
        <div style={{height:'100%',width:'100%'}}>
     
          <div>
            
          <div style={{backgroundColor:'black',width:'100%',height:'auto',color:'white',textAlign:'center',padding:'5 0 5 0'}}>
            
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h1 style={{color:'white'}}>One store</h1>

            <button style={{borderRadius:'50%',height:'5%',width:'3%',padding:'5 0 3 0',margin:'0 0px 10px 5px',color:'black'}} onClick={show}>+</button>
           
            {/* <p id="email"  style={{marginLeft:'80px'}}>{user.email}</p> */}

            
            </div>
            
            </div>
           <div id={styles.magic} style={{display:'flex'}}>
         <div style={{width:'20%'}}>
         <Nav hadshop={hadshop} path={user.email+"personal"} ></Nav>
         </div>
         <div style={{width:'50%'}}>
          {
            user&&<div>hello user</div>
          }
         {user&&(<Product   display={display}></Product>)}
            </div>
         <div style={{width:'20%'}}>
            <Cart cart={cart} increment={increment}  decrement={decrement} count={count} ></Cart>
            </div>
           </div>
          </div>
         
         {open&&(<Add open={open} handleClose={handleClose} path={user.email+"personal"}launch={launch} ></Add>)}
          
        </div>
    )
  
}

export default Homepage