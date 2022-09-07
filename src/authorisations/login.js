import React, { Component, useState } from 'react'
import './login.css'
import {Button,TextField } from '@material-ui/core'
import {auth} from  '../firebase'
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom";


const Login=()=> {
  let navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const addmail=(res)=>{
    setEmail(res.target.value)
    console.log(res)
    console.log('iam called')
  }
  const addpassword=(res)=>{
    setPassword(res.target.value)
    console.log("iam password")
  }

  const verify=()=>{
            // const auth = getAuth(app);
       signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("signed in");
            navigate('/home ')
            // ...
          })
          .catch((error) => {
            console.log(error.message)
            const errorCode = error.code;
            const errorMessage = error.message;
          });
  }
  
    return (
      <div className='container'>

            <div className='input-container'>
                    <div>
                    <TextField id="standard-basic" label="enter your email" value={email} onChange={addmail}/>
                    
                     
                    </div>
                        <div> <TextField id="standard-basic" label="enter password" value={password} onChange={addpassword} /></div>
                        <p>Don't have account?<Link to='/signup'>signup</Link></p>
                    <div id='butt'> <Button variant="contained" color="primary" id='but' onClick={verify} >Login</Button> </div>
            </div>
       
      </div>
     
    )
  
}

export default Login
//name of the function=()=>{

// }