import React, { Component } from 'react'
import { collection, doc, getDocs } from "firebase/firestore"; 
import {db} from '../firebase'
import './product.css'
// import FavoriteIcon from '@mui/icons-material';

export class Product extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       y:[]
    }
  }
  async componentDidMount(){
    document.getElementById('display').innerHTML=""
    const querySnapshot = await getDocs(collection(db, "products"));
    var x=[]
    querySnapshot.forEach((doc) => {
      x.push(doc)
      // this.state.y=this.state.y.concat({data:doc.data(),id:doc.id})
      // this.setState({y:this.state.y})
      // this.setState(this.state.y.concat(doc.data()))
      // console.log(this.state.y)
      // console.log(this.state.x);

   

    });

    this.setState({y:x})
  
  }
  render() {
    return (
      <div id="display" style={{width:'100%',display:'flex',flexWrap:'wrap'}}>
      {
        this.state.y.map((l,i)=>{
          return(
            <div id="product">
              <img src={l.data().url}></img>
              
              <p>{l.data().name}</p>
              <p>${l.data().cost}</p>
              <p>delivarable:{l.data().delivarable}</p>
              <button onClick={()=>{
                this.props.addcart(l)
              }}>  Add to cart </button>
            </div>
          )
        })
      }
          
         
   
    
      
      </div>
    )
  }
}

export default Product