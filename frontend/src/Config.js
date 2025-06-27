import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ Storage
import { getFirestore } from "firebase/firestore"; // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCiHb_REEwtdXkqHxnr8DP6Fxlv8Sp-oqQ",
  authDomain: "fir-login-5efb8.firebaseapp.com",
  projectId: "fir-login-5efb8",
  storageBucket: "fir-login-5efb8.appspot.com",
  messagingSenderId: "583135682993",
  appId: "1:583135682993:web:d93c5aa6140c35ef8c1d90",
  measurementId: "G-FPKD5NF7SE",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Export essentials
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app); // ✅ Add this line
const googleProvider = new GoogleAuthProvider();

// Google login handler
const handleGoogleLogin = async (setError) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In:", result.user);
    setError("");
  } catch (error) {
    console.error("Google login error:", error);
    setError("Google Sign-In failed");
  }
};

// Email-password login handler
const handleEmailPasswordLogin = async (email, password, setError) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCred.user);
    setError("");
    return true;
  } catch (error) {
    console.error("Login error:", error.message);
    setError("Invalid email or password");
    return false;
  }
};

export {
  auth,
  db, // ✅ Export Firestore
  storage,
  googleProvider,
  handleGoogleLogin,
  handleEmailPasswordLogin,
};
