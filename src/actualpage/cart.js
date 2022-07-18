import React, { Component } from 'react'
import './cart.css'

export class Cart extends Component {
 

  render() {
    return (
      <div style={{height:'auto',widht:'100%'}} id="cart"> 
      <div style={{backgroundColor:'brown',color:'white',fontSize:'large'}}>cart</div>
      <div>
        {
        
          this.props.cart.map((l,i)=>{
            
            // this.setState({count:l.data().count})
            return(
              <div className="cart"  id={i}>
               <img src={l.data().url}></img>
              <div>
              <p>{l.data().name}</p>
               <p>price:{l.data().cost}</p>
              <div id="modify">
              <button onClick={()=>{this.props.decrement(i,l.id)}} id='minus'>-</button>
             
               <span>{this.props.count[i]}</span>
               <button  onClick={()=>{this.props.increment(i,l.id)}} id="plus" >+</button>
              
              </div>
              </div>
              </div>
            )
          })
        }
      </div>
      </div>
    )
  }
}

export default Cart