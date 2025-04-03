
import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define a mock user object type
export type MockUser = {
  displayName: string;
  photoURL: string | null;
  uid: string;
  email: string;
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
  const [isLoading, setIsLoading] = useState(false);

  // Mock user for demo purposes
  const mockUser: MockUser = {
    displayName: 'Demo User',
    photoURL: 'https://randomuser.me/api/portraits/men/32.jpg',
    uid: 'demo-user-123',
    email: 'demo@example.com',
  };

  const handleSignInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log(`Sign in with email: ${email} and password: ${password}`);
      
      // This is where you would normally authenticate with a backend service
      // For demo purposes, let's simulate a successful login with any email/password
      setUser(mockUser);
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Error signing in:", error);
      setIsLoading(false);
      return { success: false };
    }
  };

  const handleSignUpWithEmail = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    try {
      console.log(`Sign up with email: ${email}, username: ${username}, and password: ${password}`);
      
      // This is where you would normally register with a backend service
      // For demo purposes, let's simulate a successful registration
      
      // Create a new user with the provided information
      const newUser: MockUser = {
        displayName: username,
        photoURL: null, // No photo for new users
        uid: `user-${Date.now()}`, // Generate a unique ID
        email: email,
      };
      
      setUser(newUser);
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Error signing up:", error);
      setIsLoading(false);
      return { success: false };
    }
  };

  const handleSignOut = async () => {
    console.log("Sign out clicked");
    setUser(null);
    return { success: true };
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
