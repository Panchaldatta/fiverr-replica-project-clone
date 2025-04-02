
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { toast } from '@/hooks/use-toast';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUq9LK5vLdArwON1G6h1-ApcRwXt2g72o",
  authDomain: "lovable-fiverr-clone.firebaseapp.com",
  projectId: "lovable-fiverr-clone",
  storageBucket: "lovable-fiverr-clone.appspot.com",
  messagingSenderId: "882350598440",
  appId: "1:882350598440:web:8a3db726ecc0b2fa7fccf1"
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
