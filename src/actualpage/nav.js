import React, { Component } from 'react'
import {Button} from '@material-ui/core'
export class Nav extends Component {
  render() {
    return (
     <div style={{width:'100%',height:'auto',backgroundcolor:"red",textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center'}}>   
         <div >   
       <div><Button href="#text-buttons" color="primary"> profile </Button></div>  
         <div><Button href="#text-buttons" color="primary">favorites</Button></div>
         <div><Button href="#text-buttons" color="primary">my shop</Button></div>
          </div>
    </div>
    )
  }
}

export default Nav