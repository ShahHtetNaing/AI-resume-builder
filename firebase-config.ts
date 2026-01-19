
// 1. Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyfoxTtg6COqtxwX_B13EfeOgw35BN6bo",
  authDomain: "shahhub-7510.firebaseapp.com",
  projectId: "shahhub-7510",
  storageBucket: "shahhub-7510.firebasestorage.app",
  messagingSenderId: "843624030906",
  appId: "1:843624030906:web:aed6f0b2d90c0773395883",
  measurementId: "G-X6D8JS33B0"
};

// 2. Import the required SDKs from the Google CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged,
  signOut,
  User as FirebaseUser
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 4. Function to Handle Google Login
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

// 5. Function to Handle Logout
export const logoutFromFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout Error:", error.message);
  }
};

// 6. Listener for Auth State
export const subscribeToAuthChanges = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
