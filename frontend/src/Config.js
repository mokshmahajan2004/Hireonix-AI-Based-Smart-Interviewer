import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiHb_REEwtdXkqHxnr8DP6Fxlv8Sp-oqQ",
  authDomain: "fir-login-5efb8.firebaseapp.com",
  projectId: "fir-login-5efb8",
  storageBucket: "fir-login-5efb8.firebasestorage.app",
  messagingSenderId: "583135682993",
  appId: "1:583135682993:web:d93c5aa6140c35ef8c1d90",
  measurementId: "G-FPKD5NF7SE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {auth, googleProvider}