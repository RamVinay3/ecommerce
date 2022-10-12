import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { storage } from '../firebase';
import { Button, TextField } from '@material-ui/core';  
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc,getDoc } from "firebase/firestore";
import { db } from '../firebase';

function Add(props) {
  const [productname,setproductname]=useState('')
  const [price,setprice]=useState(0)
  const [url,seturl]=useState('')
  const [percent, setPercent] = useState(0);
  const addproduct=async()=>{
   
   
    console.log(props)
    const ref=doc(db,'users',props.path)
    const docSnap = await getDoc(ref);
    const ref1=doc(db,'products','products')
    const docsnap1=await getDoc(ref1)
    const access1=docsnap1.data()
    const access=docSnap.data()
    console.log("hello access",access)
    var a=access.myshop;
    var b;
    var select = document.getElementById('type');
var value = select.options[select.selectedIndex].value;
    
    console.log(typeof a,access.myshop)
    // a.push(1)
    // console.log(a)
  //   console.log(access)
    var shop={
      productname:productname,
      price:Number(price),
      url:url,
      delivarable:'yes',
      shopname:access.shopname,
      type:value,
      sold:0
    }
   a.push(shop)
   props.handleClose()
   if(value=="fruits"){
    b=access1.fruits
    b.push(shop)
    await updateDoc(ref1,{fruits:b})


  }
  else if(value=="books"){
    b=access1.books
    b.push(shop)
    await updateDoc(ref1,{books:b})

  }
  else if(value=="drynuts"){
    b=access1.drynuts
    b.push(shop)
    await updateDoc(ref1,{drynuts:b})
  }
  else if(value=="sports"){
    b=access1.sports
    b.push(shop)
    await updateDoc(ref1,{sports:b})
  }
  else if(value=="groceries") {

    b=access1.groceries
    b.push(shop)
    await updateDoc(ref1,{groceries:b})
  }
  else{
    b=access1.teapowders
    b.push(shop)
    await updateDoc(ref1,{teapowders:b})

  }
  
      await updateDoc(ref,{
       myshop: a

      })

  }

  const upload=(e)=>{
    console.log(e.target.files[0].name)
    const k=e.target.files[0];
    const storageRef = ref(storage, `/files/${productname}`);
     // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, k);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
              const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              // update progress
              setPercent(percent);
          },
          (err) => console.log(err),
          () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  console.log(url);
                  seturl(url)
              });
            });


  }
  const handleprice=(e)=>{
    setprice(e.target.value)
  }
  const handleproduct=(e)=>{
    setproductname(e.target.value)
  }
  
  return (
    <Modal
    onClose={props.handleClose}
    open={props.open}
    >
      <div
      style={{backgroundColor:'white', margin: '15% auto',width:'25%',height:'auto',padding:'10px 20px 20px 20px'}}
      >
           <div style={{marginBottom:'10px'}}> <TextField label="enter product name" value={productname} onChange={handleproduct} ></TextField></div>
            <div style={{marginBottom:'10px'}}><TextField label="enter price of product" value={price} onChange={handleprice}></TextField></div>
            <select  style ={{marginBottom:'10px'}}name="type" id="type">
            <option value="books">Books</option>
            <option value="drynuts">drynuts</option>
            <option value="fruits ">fruits</option>
            <option value="sports">sports</option>
            <option value="teapowders">teapowders</option>
            <option value="groceries">groceries</option>
          </select>
            <input type="file" accept="image/*" onChange={upload} style={{marginBottom:'10px'}}></input>
           {
            url&&(<div style={{marginBottom:"10px"}}><img src={url} height={100} width={70} ></img></div>)
           }
            <div >
              <Button  variant="contained" onClick={props.handleClose}style={{border:'1px solid grey',marginRight:'10px'}}>cancel</Button>
              <Button color="primary" variant="contained" onClick={addproduct}>add product</Button>
          
      </div>
      </div>
      
    </Modal>
  )
}

export default Add