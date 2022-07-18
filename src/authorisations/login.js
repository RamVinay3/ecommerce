import React, { Component } from 'react'
import './login.css'
import {Button,TextField } from '@material-ui/core'
import {auth} from  '../firebase'

import { signInWithEmailAndPassword } from 'firebase/auth'

export class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email:'',
       password:''
    }
  }
  email=(res)=>{
   
    this.setState({email:res.target.value})
  }
password=(res)=>{
  
    this.setState({password:res.target.value})
  }
  verify=()=>{
            // const auth = getAuth(app);
       signInWithEmailAndPassword(auth, this.state.email, this.state.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("signed in");
            // ...
          })
          .catch((error) => {
            console.log(error.message)
            const errorCode = error.code;
            const errorMessage = error.message;
          });
  }
  render() {
    return (
      <div className='container'>

            <div className='input-container'>
                    <div>
                    <TextField id="standard-basic" label="enter your email" value={this.state.email} onChange={this.email}/>
                    
                     
                    </div>
                        <div> <TextField id="standard-basic" label="enter password" value={this.state.password} onChange={this.password} /></div>

                    <div id='butt'> <Button variant="contained" color="primary" id='but' onClick={this.verify}>Login</Button> </div>
            </div>
       
      </div>
    )
  }
}

export default Login