import React from 'react';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useUser() {
  return {
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: 'mock-developer-id',
      fullName: 'Yogender Verma',
      firstName: 'Yogender',
      lastName: 'Verma',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      emailAddresses: [{ emailAddress: 'yogendarverma0268@gmail.com' }]
    }
  };
}

export function useClerk() {
  return {
    signOut: async () => {},
  };
}

export function useSignIn() {
  return {
    isLoaded: true,
    signIn: {
      authenticateWithRedirect: async () => {},
      create: async () => ({ status: 'complete', createdSessionId: 'mock-session' }),
    },
    setActive: async () => {},
  };
}

export function useSignUp() {
  return {
    isLoaded: true,
    signUp: {
      create: async () => ({ status: 'complete', createdSessionId: 'mock-session' }),
    },
    setActive: async () => {},
  };
}
