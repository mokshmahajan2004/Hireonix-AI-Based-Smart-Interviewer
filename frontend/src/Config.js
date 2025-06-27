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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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
    localStorage.setItem("email", result.user.email);  // ✅ Store email
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
    localStorage.setItem("email", userCred.user.email);  // ✅ Store email
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
