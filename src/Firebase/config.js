import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
const firebaseConfig = {
    
        apiKey: "AIzaSyBx6nQWzHLKrRsD0DFtetBfDu_1svKQB3c",
        authDomain: "geekchat1-a9521.firebaseapp.com",
        projectId: "geekchat1-a9521",
        storageBucket: "geekchat1-a9521.appspot.com",
        messagingSenderId: "633507960636",
        appId: "1:633507960636:web:e09666fb98efc40090b039"
      
};
if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
// Initialize Firebase
export {firebase} ;