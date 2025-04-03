
import React, { createContext, useContext, ReactNode } from 'react';

type AuthContextType = {
  user: null;
  isLoading: false;
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
        user: null,
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
