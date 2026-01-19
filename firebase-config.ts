
// This section connects your site to the Netlify variables you just added
// Using (import.meta as any).env for TypeScript compatibility with Netlify's environment
const firebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || "AIzaSyCyfoxTtg6COqtxwX_B13EfeOgw35BN6bo",
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || "shahhub-7510.firebaseapp.com",
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || "shahhub-7510",
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || "1:843624030906:web:aed6f0b2d90c0773395883"
};

// These lines "import" the Firebase tools from the internet
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

// Initialize the "Apps"
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Logic for your Google Sign-In Button
const provider = new GoogleAuthProvider();

/**
 * Handles Google Sign-In with specific alerting logic.
 * Note: Logging in as shahhtetnaing@gmail.com grants Admin status, 
 * which includes full Pro Lifetime access to all modules and editing features.
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    
    // Check if the person logging in is YOU (Shah - Admin)
    if (result.user.email === "shahhtetnaing@gmail.com") {
      alert("Hello Shah! You are logged in as Admin.");
      // Admin automatically inherits all Pro-level abilities in the application logic.
      document.body.classList.add('is-admin');
    } else {
      alert("Welcome to the site!");
      document.body.classList.remove('is-admin');
    }
    
    return result.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

/**
 * Signs the user out of Firebase.
 */
export const logoutFromFirebase = async () => {
  try {
    await signOut(auth);
    document.body.classList.remove('is-admin');
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

/**
 * Subscribes to authentication state changes to keep the UI in sync.
 * Re-validates Admin status on every session change.
 */
export const subscribeToAuthChanges = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    if (user && user.email === "shahhtetnaing@gmail.com") {
      document.body.classList.add('is-admin');
    } else {
      document.body.classList.remove('is-admin');
    }
    callback(user);
  });
};
