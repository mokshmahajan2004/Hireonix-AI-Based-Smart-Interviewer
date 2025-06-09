import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,onAuthStateChanged} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app); // 🟩 added
const googleProvider = new GoogleAuthProvider();

// Handle GOOGLE LOGIN
const handleGoogleLogin = async (setError) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google Sign-In:', result.user);
    setError('');
    // Do something with result.user (like saving user info, navigating, etc.)
  } catch (error) {
    console.error('Google login error:', error);
    setError('Google Sign-In failed');
  }
};

// Handle Login Using Email and Password
const handleEmailPasswordLogin = async (email, password, setError) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCred.user);
    setError('');
    // Additional actions here (e.g., redirecting, saving session info)
    return true;
  } catch (error) {
    console.error('Login error:', error.message);
    setError('Invalid email or password');
    return false;
  }
};

export {auth,db ,// added 
googleProvider, handleGoogleLogin, handleEmailPasswordLogin ,
onAuthStateChanged // 🟩 added
};
