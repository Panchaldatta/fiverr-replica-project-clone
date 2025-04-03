
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { toast } from '@/hooks/use-toast';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAx5WBpnEsSnlgithEzFAwrk0FhMUumCyg",
  authDomain: "lovable-fiverr-clone-auth.firebaseapp.com",
  projectId: "lovable-fiverr-clone-auth",
  storageBucket: "lovable-fiverr-clone-auth.appspot.com",
  messagingSenderId: "955826394201",
  appId: "1:955826394201:web:dd7a19430c2cf4976356c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Return user info
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      }
    };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    toast({
      title: "Authentication Error",
      description: "Failed to sign in with Google. Please try again.",
      variant: "destructive",
    });
    return { success: false, error };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, error };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
