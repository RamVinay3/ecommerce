import React, { Component, useEffect, useState } from 'react'
import { PlusSquareOutlined} from '@ant-design/icons';
import Modal from '@material-ui/core/Modal';
import {Button} from 'antd'
// import { collection, doc, setDoc } from "firebase/firestore"; 
import { doc, updateDoc,getDoc  } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { Input,TextField } from '@material-ui/core';
import { db } from '../firebase';
// import Modal from '@material-ui/core/Modal';
import Add from './modal';

const Shop =(props)=> {
 
    const [open,setopen]=useState(false)
    const [modal,setmodal]=useState(false)
    const [myproducts,setproducts]=useState('')
    let location = useLocation();
    const [shopname,setshopname]=useState('')
   
    useEffect(()=>{
       (async ()=>{
            const myproref=doc(db,"users",location.state.path);
            const myproducts=await getDoc(myproref)
            setproducts(myproducts.data())
            // console.log("helllo ",myproducts.data())

       })();
    })
    useEffect(()=>{
      console.log("heloooo")
    })
    // const myproducts=await getDoc(myproref);
    // console.log(myproducts)
    console.log("location state is",location.state)
    const [hadshop,setshop]=useState(location.state.hadshop )
    const openit=()=>{
      setmodal(true)
    }
    
   const  handleClose = () => {
        setopen(false)
        setmodal(false)
      };
        
   const  handleOpen = () => {
       setopen(true)
      };
  const Create=async()=>{
    setopen(false);
    setshop(true);
    
    const path=location.state.path;
    console.log(path)
    console.log('hello how are you  ')
    const Ref = doc(db, "users", path);
   
    // console.log(myproducts,"hello iam my products")
// Set the 'capital' field of the city
await updateDoc(Ref, {hadshop: true,shopname:shopname,orders:[]});
// const res = await Ref.update();
  }
  const namechange=(e)=>{
    setshopname(e.target.value)
  }
    return (
      <div style={{marginLeft:'10px'}}>
        <Modal
        onClose={handleClose}
        open={open}
        path={location.state.path}
        
        >
          
        <div style={{backgroundColor:'white',position:'absolute',top:'40%',left:'35%' ,width:500,padding:'10px'}}>
        <TextField id="standard-basic" label="enter shop name" value={shopname}  style={{marginBottom:'10px'}} onChange={namechange}/>
   
         <div style={{display:'flex'}}>
         <Button  style={{marginRight:'10px'}} type="primary" onClick={Create}>Create</Button>
           <Button   type="primary" onClick={handleClose}>Cancel</Button>
         </div>
        </div>
        </Modal>
        
          
   
       {
         !hadshop&&(
          <div  id='addproduct'>
     
      <p>do you wanna create a new shop?</p>
      <Button  style={{marginRight:'10px',marginTop:'10px'}} type="primary" onClick={handleOpen}>yes</Button>

    </div>
        )
       }
   
 
  

   <div style={{display:'flex'}}>
   { hadshop&&(<button onClick={openit}  style={{height:'200px',width:'180px',margin:'30px 30px'}}><PlusSquareOutlined  />Add Product</button>)}
    <Add open={modal} handleClose={handleClose}  path={location.state.path} ></Add>
    {
          myproducts&&(
          <div style={{display:'flex',marginRight:'30px',marginTop:'10px'}} >
          {
          
          myproducts['myshop'].map((l,i)=>{
            console.log(l);
            return (
              <div style={{backgroundColor:'skyblue'}}> 
                    <img src={l.url} width="180" height="200"></img>
                    <p>{l.productname}</p>
                    <p>Price:${l.price}</p>
                    <p>Sold:{l.sold}</p>
                    <p>Type:{l.type}</p>
              </div> 
            )
          })
          }
          </div>)
    }
    </div>
     

   
    
    </div>
   
     
    )
  
}

export default Shop