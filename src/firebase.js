import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSFnMCn9cUOHeUTip1HZJIUd3inkueScw",
  authDomain: "ecomerce-e63f1.firebaseapp.com",
  projectId: "ecomerce-e63f1",
  storageBucket: "ecomerce-e63f1.appspot.com",
  messagingSenderId: "894475740793",
  appId: "1:894475740793:web:10c118fe6f775a53c1d6a8",
  measurementId: "G-KEBJXWYNDS"
};


const application = initializeApp(firebaseConfig);

export const auth=getAuth(application)
export const db=getFirestore(application)
export default application