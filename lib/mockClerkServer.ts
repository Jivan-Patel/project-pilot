export async function currentUser() {
  return {
    id: 'mock-developer-id',
    fullName: 'Yogender Verma',
    firstName: 'Yogender',
    lastName: 'Verma',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    emailAddresses: [{ emailAddress: 'yogendarverma0268@gmail.com' }]
  };
}

export async function auth() {
  return {
    userId: 'mock-developer-id',
    sessionClaims: {},
  };
}

export function clerkMiddleware() {
  return () => {};
}

export function createRouteMatcher() {
  return () => () => false;
}
