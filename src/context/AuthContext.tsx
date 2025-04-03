
import React, { createContext, useContext, ReactNode } from 'react';

// Define a mock user object type
export type MockUser = {
  displayName: string;
  photoURL: string | null;
  uid: string;
};

type AuthContextType = {
  user: MockUser | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signInWithGoogle: async () => ({ success: false }),
  signOut: async () => ({ success: true }),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Mock user for demo purposes
  const mockUser: MockUser = {
    displayName: 'Demo User',
    photoURL: 'https://randomuser.me/api/portraits/men/32.jpg',
    uid: 'demo-user-123',
  };

  const handleSignInWithGoogle = async () => {
    console.log("Sign in with Google clicked (authentication removed)");
    return { success: false };
  };

  const handleSignOut = async () => {
    console.log("Sign out clicked (authentication removed)");
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user: null, // Set to mockUser if you want to simulate a logged-in state
        isLoading: false,
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
