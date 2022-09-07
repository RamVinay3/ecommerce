import React, { Component, useState } from 'react'
import {TextField } from '@material-ui/core'
import styles from './signin.module.css'
import { Button } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from  '../firebase'
import { Link } from "react-router-dom";
import { doc,collection, addDoc,setDoc } from "firebase/firestore"; 
const Signup=()=> {
    // constructor(props) {
    //     super(props)
      
    //     this.state = {
    //        firstname:'',
    //        secondname:'',
    //        email:'',
    //        password:''
    //     }
    //   }

    const [firstname,setfirstname]=useState('')
    const [secondname,setsecondname]=useState('')
    const [email,setemail]=useState('')
    const [password,setPassword]=useState('')
     const createuser=()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
           
            const user = userCredential.user;
            user.displayName=firstname+" "+secondname
            try {
                const docRef =  setDoc(doc(db, "users",email+"personal"), {
                  cart:[],
                  favorites:[],
                  myorders:[],
                  myshop:[],
                  hadshop:false 
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }

            console.log(user.displayName)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });


      }
     const handlefirst=(e)=>{
          setfirstname(e.target.value)
  
      }
      const handlesecond=(e)=>{
          setsecondname(e.target.value)
  
      }
      const handleemail=(e)=>{
         setemail(e.target.value)
  
      }
     const  handlepassword=(e)=>{
          setPassword(e.target.value)
  
      }
   
    
      return (
        <div className={styles.whole}>
        <div>
          <h1>Signup</h1>
        <div className={styles.nameholder}>
        <TextField id="standard-basic" label="First name" value={firstname} className={styles.name} onChange={handlefirst}/>
         {/* <input value={this.state.firstname} onChange={this.handlefirst} placeholder='firstname' className={styles.name}></input> */}
         <TextField id="standard-basic" label="Second name" value={secondname} className={styles.name} onChange={handlesecond}/>
          {/* <input value={this.state.secondname} onChange={this.handlesecond} placeholder='second name' className={styles.name}></input> */}
         </div>
         <TextField id="standard-basic" label="Enter your email" value={email} className={styles.large} onChange={handleemail}/>
         {/* <div><input value={this.state.gmail} onChange={this.handleemail} placeholder='write your gmail' className={styles.large}></input></div>  */}
          <div>
          <TextField id="standard-basic" label="Enter password" value={password} className={styles.large} onChange={handlepassword}/>
         
          
            {/* <input value={this.state.password} onChange={this.handlepassword} placeholder='type your password' className={styles.large}></input> */}
          <p style={{margin:'10px 10px 10px 0px'}}>have an account? <Link to='/'>Login</Link> </p>
          </div>
          
        <div>  <Button  type="primary" className={styles.butt} onClick={createuser}>sign up</Button></div>
        </div>
        </div>
      )
    
  }

export default Signup