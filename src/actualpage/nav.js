import React, { Component, useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
// import {Button} from '@material-ui/core'

import { HomeOutlined,HeartOutlined,ShopOutlined,LogoutOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'favourites',
    key: 'favorites',
    icon: <HeartOutlined />,
    // disabled: true,
  },
  {
    label:'Myshop',
    key:'shop',
    icon:<ShopOutlined />
  },{
    label:'Logout',
    key:'logout',
    icon:<LogoutOutlined />,
  }
 
];
const Nav=(props)=> {
  let navigate = useNavigate();

    const [current,setcurrent]=useState('home')
    
  
    // return (
    //  <div style={{width:'100%',height:'auto',backgroundcolor:"red",textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>   
    //      <div >   
    //    <div><Button href="#text-buttons" color="primary"> profile </Button></div>  
    //      <div><Button href="#text-buttons" color="primary">favorites</Button></div>
    //      <div><Button href="#text-buttons" color="primary">my shop</Button></div>
    //       </div>
    // </div>
    // )
    const clickit = (e) => {
      if(e.key=="logout"){
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          navigate('/')
          console.log("signout")
          
        }).catch((error) => {
          // An error happened.
          console.log("error")
        });
        
      }
      else{
        console.log("had shop is",props.hadshop,props.path,props.addproduct)
        // navigate('/'+e.key,{state:{hadshop:props.hadshop,path:props.path,addproduct:props.addproduct}})
      const data={
        hadshop:props.hadshop,
        path:props.path,
        // addproduct:props.addproduct 
       }
        navigate('/'+e.key,{state:data})
      //  path:props.path,addproduct:props.addproduct
      }
      console.log('click ', e);

      
      setcurrent(e.key)
    };
    return <Menu  style={{width:'100%'}} onClick={clickit}  mode="vertical" selectedKeys={current}  items={items} />;
  }


export default Nav