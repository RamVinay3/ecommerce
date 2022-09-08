import React, { Component, useEffect, useState } from 'react'
import { collection, doc, getDoc } from "firebase/firestore"; 
import {db} from '../firebase'
import './product.css'
// import FavoriteIcon from '@mui/icons-material';

const Product=(props)=> { 
   console.log("props of display is",props.display)
  const [sports,setsports]=useState([])
  const [drynuts,setdrynuts]=useState([])
  const [fruits,setfruits]=useState([])
  const [groceries,setgroceries]=useState([])
  const [kitchendevices,setkitchendevices]=useState([])
  const [teapowders,setteapowders]=useState([])
 
  useEffect(()=>{
    if(props.display)
    {
      setsports(props.display.sports)
      setdrynuts(props.display.drynuts)
      setfruits(props.display.fruits)
      setgroceries(props.display.groceries)
      setkitchendevices(props.display.kitchendevices)
      setteapowders(props.display.setteapowders)
    }

   
  })
  return(
    <div>
      <div>
        {
          Object.keys(props.display).map((key,index)=>{
            if(props.display[key].length>0){
              return(
                   <div>

                    <h1>{key}</h1>
                    <div>
                      {
                        props.display[key].map((l,index1)=>{
                          return(
                            <div>
                                                  
                            <div id="product" style={{marginLeft:'10px'}}>
                                  <img src={l.url}></img>
                                  
                                  <p>{l.productname}</p>
                                  <p>${l.price}</p>
                                  <p>delivarable:{l.delivarable}</p>
                                  <button onClick={()=>{
                                    props.addcart(l)
                                  }}>  Add to cart </button>
                                </div>

                            </div>
                          )
                        })
                      }
                    </div>
                   </div>
              )
            }
            return(
              <div></div>
            )
          })
        }
      </div>
    
     
    </div>
  )
    
  
}

export default Product