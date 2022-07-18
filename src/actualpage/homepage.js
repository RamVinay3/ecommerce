import React, { Component } from 'react'
import Nav from './nav'
import Cart from './cart'
import Product from './product'
import './homepage.css'
import { collection, addDoc } from "firebase/firestore"; 
import Modal from '@material-ui/core/Modal';
import {auth} from '../firebase'
import {  onAuthStateChanged ,signOut} from "firebase/auth";
import { doc, getDocs,setDoc,deleteDoc,updateDoc } from "firebase/firestore";
// import {db} from '../firebase'

// import { TextFields } from '@mui/icons-material'
// import { async } from '@firebase/util'
import{db} from '../firebase'
import { async } from '@firebase/util'
// const uid=""
export class homepage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name:'',
       cost:0,
       uri:'',
       user:'',
       cart:[],
        count:[],
       open:'false'
    }
  }
  handleClose = () => {
    this.setState({open:false})
  };
    
   handleOpen = () => {
    this.setState({open:true})
  };
  show=()=>{
      this.setState({open:true})
      
  }
  async componentDidMount(){


    onAuthStateChanged(auth, (user) => {

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        this.setState({user:user})
        this.state.user=user
       
        
        console.log(this.state.user)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  
    const path="users/"+this.state.user.email+"personal"+"/cart"
     console.log(path)
    var a=[];
    const querySnapshot=await getDocs(collection(db,path))
    querySnapshot.forEach((doc)=>{
      a.push(doc)
    })
    this.setState({cart:a})
  }
  launch=async()=>{
    
    console.log(this.state.name,this.state.uri,this.state.cost)
    try{
      const docRef = await addDoc(collection(db, "products"), {
      name:this.state.name,
      cost:Number(this.state.cost),
      url:String(this.state.uri),
      delivarable:'yes'

      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    this.setState({open:false})
    
    // document.getElementById('addproduct').style.display='none';
    // document.getElementById('magic').style.display='block';+

    // console.log(document.getElementById('addproduct').style.display)

  }
  namechange=(event)=>{
    this.setState({name:event.target.value})
  }
  costchange=(event)=>{
    this.setState({cost:event.target.value})
  }
  urichange=(event)=>{
    this.setState({uri:event.target.value})
  }
  // setTimeout(addcart,3000);
  increment=async (index,id)=>{
    var x=this.state.count;
    x[index]+=1;
    this.setState({count:x});
    const path="users/"+this.state.user.email+"personal"+"/cart"
    const docref = doc(db, path, id);
    
      console.log(path);
      await updateDoc(docref, {
        count: x[index]
      });

  }
  decrement=async(index,id)=>{
    const path="users/"+this.state.user.email+"personal"+"/cart"
    var x=this.state.count;
    var y=this.state.cart;
    if(x[index]==1){
      await deleteDoc(doc(db, path, id));
      delete y[index]
      
      delete x[index]
      this.setState({cart:y})
 
      return
    }
    else{
      x[index]-=1;
      const docref = doc(db, path, id);
      console.log(path);
      await updateDoc(docref, {
        count: x[index]
      });
      
    }
   
    this.setState({count:x});
    
  }
  addcart=async(id)=>{
    console.log("hello",id,this.state.user)
    //this.is.how you add doc in nested loop of firestore
    const path="users/"+this.state.user.email+"personal"+"/cart"
    const docref=await setDoc(doc(db,path,id.id),{
      name:id.data().name,
      count:1,
      cost:id.data().cost,
      url:id.data().url
      

    });
    var a=[];
    var k=[];
    const querySnapshot=await getDocs(collection(db,path))
    querySnapshot.forEach((doc)=>{
      k.push(doc.data().count)

      a.push(doc)
    })
    this.setState({cart:a})
    this.setState({count:k})
    // console.log(docref)
  }
  // async componentDidMount(){
  //   const path="users/"+this.state.user.uid+"/cart"
  //   var a=[];
  //   const querySnapshot=await getDocs(collection(db,path))
  //   querySnapshot.forEach((doc)=>{
  //     a.push(doc)
  //   })
  //   this.setState({cart:a})

  // }
  
  render() {
    return (
        <div style={{height:'100%',width:'100%'}}>
     
          <div>
            
          <div style={{backgroundColor:'black',width:'100%',height:'auto',color:'white',textAlign:'center',padding:'5 0 5 0'}}>
            
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h1>One store</h1>
            <button style={{borderRadius:'50%',height:'5%',width:'3%',padding:'5 0 5 0',marginBottom:'10px'}} onClick={this.show}>+</button>
           
            <p id="email" >{this.state.user.email}</p>
            <button onClick={()=>{signOut(auth).then(() => {
  // Sign-out successful
              console.log("succcessfull")
              }).catch((error) => {
                // An error happened.
                console.log(error)
              });
}} id="signout">signout</button>
            
            </div>
            
            </div>
           <div id="magic" style={{display:'flex'}}>
         <div style={{width:'20%'}}>
         <Nav></Nav>
         </div>
         <div style={{width:'50%'}}>
         <Product   addcart={this.addcart}></Product>
            </div>
         <div style={{width:'20%'}}>
            <Cart cart={this.state.cart} increment={this.increment}  decrement={this.decrement} count={this.state.count} ></Cart>
            </div>
           </div>
          </div>
          <Modal
        onClose={this.handleClose}
        open={this.state.open}
        style={{
          position: 'absolute',
          border: '2px solid #000',
          backgroundColor: 'white',
          // boxShadow: '2px solid black',
          height:300,
          width: 500,
          margin: 'auto'
        }}
      >
        <div  id='addproduct'>
      
            <input placeholder='name' value={this.state.name} onChange={this.namechange}></input>
            <div>
              <input  value={this.state.cost} onChange={this.costchange} placeholder='enter cost'></input>
            </div>
            <div>
              <input value={this.state.uri} onChange={this.urichange} placeholder='paste uri'></input>
            </div>
            <div>
              <button onClick={this.launch}>Launch Product</button>
            </div>
          </div>
      </Modal>
         
          
        </div>
    )
  }
}

export default homepage