// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGqszcHfPJowei-L2E9G5Aunb8pvSNo3M",
  authDomain: "fir-auth-97890.firebaseapp.com",
  projectId: "fir-auth-97890",
  storageBucket: "fir-auth-97890.appspot.com",
  messagingSenderId: "958638818681",
  appId: "1:958638818681:web:b025dffc40bcc8f3005ba8"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
} 

const auth = firebase.auth()

export {auth};