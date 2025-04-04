
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { authService } from '../services/api';

// Define a user object type
export type MockUser = {
  displayName: string;
  photoURL: string | null;
  uid: string;
  email: string;
  username?: string;
};

type AuthContextType = {
  user: MockUser | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean }>;
  signUpWithEmail: (email: string, username: string, password: string) => Promise<{ success: boolean }>;
  signOut: () => Promise<{ success: boolean }>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signInWithEmail: async () => ({ success: false }),
  signUpWithEmail: async () => ({ success: false }),
  signOut: async () => ({ success: true }),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { user } = await authService.getCurrentUser();
        
        if (user) {
          setUser({
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user._id,
            email: user.email,
            username: user.username,
          });
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleSignInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      
      if (result.success && result.user) {
        setUser({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          uid: result.user.id,
          email: result.user.email,
          username: result.user.username,
        });
        
        setIsLoading(false);
        return { success: true };
      }
      
      setIsLoading(false);
      return { success: false };
    } catch (error) {
      console.error("Error signing in:", error);
      setIsLoading(false);
      return { success: false };
    }
  };

  const handleSignUpWithEmail = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.register(email, username, password);
      
      if (result.success && result.user) {
        setUser({
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          uid: result.user.id,
          email: result.user.email,
          username: result.user.username,
        });
        
        setIsLoading(false);
        return { success: true };
      }
      
      setIsLoading(false);
      return { success: false };
    } catch (error) {
      console.error("Error signing up:", error);
      setIsLoading(false);
      return { success: false };
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await authService.logout();
      setUser(null);
      return { success: result.success };
    } catch (error) {
      console.error("Error signing out:", error);
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithEmail: handleSignInWithEmail,
        signUpWithEmail: handleSignUpWithEmail,
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
