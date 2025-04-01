
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getCurrentUser, signInWithGoogle, signOut } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      toast({
        title: "Welcome!",
        description: `Successfully signed in as ${result.user?.displayName || "a user"}`,
      });
    }
    return result;
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      setUser(null);
    }
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithGoogle: handleSignInWithGoogle,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
