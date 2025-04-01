
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { toast } from '@/hooks/use-toast';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgDZ-leKmFy2fxRSD3xvjAzpLTintk8kI",
  authDomain: "fiverr-clone-lovable.firebaseapp.com",
  projectId: "fiverr-clone-lovable",
  storageBucket: "fiverr-clone-lovable.appspot.com",
  messagingSenderId: "667364694733",
  appId: "1:667364694733:web:d9054015d2a4b14fc9669e"
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
