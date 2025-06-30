import { 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';
import { AuthUser } from '../types';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Google Sign In
  async signInWithGoogle(): Promise<AuthUser> {
    if (!isFirebaseConfigured) {
      return this.createMockUser('google');
    }

    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    
    // Add custom parameters to reduce popup blocking
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      const result = await signInWithPopup(auth, provider);
      return this.mapFirebaseUser(result.user, 'google');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign in was cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        // Create a new error that preserves the original code for the AuthModal to detect
        const popupBlockedError = new Error('Popup was blocked by browser. Please allow popups and try again.');
        (popupBlockedError as any).code = 'auth/popup-blocked';
        throw popupBlockedError;
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('Sign in was cancelled');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error('Failed to sign in with Google. Please try again.');
      }
    }
  }

  // Email/Password Sign Up
  async signUpWithEmail(email: string, password: string, displayName: string): Promise<AuthUser> {
    if (!isFirebaseConfigured) {
      return this.createMockUser('email', email, displayName);
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      return this.mapFirebaseUser(result.user, 'email');
    } catch (error: any) {
      console.error('Email sign up error:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Email/password authentication is not enabled. Please contact support.');
      } else {
        throw new Error('Failed to create account. Please try again.');
      }
    }
  }

  // Email/Password Sign In
  async signInWithEmail(email: string, password: string): Promise<AuthUser> {
    if (!isFirebaseConfigured) {
      return this.createMockUser('email', email);
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return this.mapFirebaseUser(result.user, 'email');
    } catch (error: any) {
      console.error('Email sign in error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please sign up first.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('This account has been disabled. Please contact support.');
      } else {
        throw new Error('Failed to sign in. Please check your credentials and try again.');
      }
    }
  }

  // Anonymous Sign In
  async signInAnonymously(): Promise<AuthUser> {
    if (!isFirebaseConfigured) {
      return this.createMockUser('anonymous');
    }

    try {
      const result = await signInAnonymously(auth);
      return this.mapFirebaseUser(result.user, 'anonymous');
    } catch (error: any) {
      console.error('Anonymous sign in error:', error);
      
      if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Anonymous sign in is not enabled. Please contact support.');
      } else {
        throw new Error('Failed to sign in anonymously. Please try again.');
      }
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    if (!isFirebaseConfigured) {
      console.log('Mock sign out');
      return;
    }

    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw new Error('Failed to sign out. Please try again.');
    }
  }

  // Auth State Observer
  onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    if (!isFirebaseConfigured) {
      // Mock auth state - no user initially
      callback(null);
      return () => {};
    }

    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Determine provider from providerData
        let provider: 'google' | 'email' | 'anonymous' = 'email';
        
        if (firebaseUser.isAnonymous) {
          provider = 'anonymous';
        } else if (firebaseUser.providerData.length > 0) {
          const providerId = firebaseUser.providerData[0].providerId;
          if (providerId === 'google.com') provider = 'google';
          else if (providerId === 'password') provider = 'email';
        }
        
        callback(this.mapFirebaseUser(firebaseUser, provider));
      } else {
        callback(null);
      }
    });
  }

  // Check if user can upgrade from anonymous
  canUpgradeAnonymousAccount(): boolean {
    if (!isFirebaseConfigured) return false;
    return auth.currentUser?.isAnonymous || false;
  }

  // Link anonymous account with email/password
  async linkAnonymousWithEmail(email: string, password: string, displayName: string): Promise<AuthUser> {
    if (!isFirebaseConfigured || !auth.currentUser?.isAnonymous) {
      throw new Error('Cannot link account: not an anonymous user');
    }

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(credential.user, { displayName });
      }
      
      return this.mapFirebaseUser(credential.user, 'email');
    } catch (error: any) {
      console.error('Link anonymous account error:', error);
      throw new Error('Failed to link account. Please try again.');
    }
  }

  private mapFirebaseUser(firebaseUser: FirebaseUser, provider: 'google' | 'email' | 'anonymous'): AuthUser {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || (provider === 'anonymous' ? 'Anonymous User' : ''),
      photoURL: firebaseUser.photoURL || undefined,
      provider,
      isAnonymous: firebaseUser.isAnonymous
    };
  }

  private createMockUser(provider: 'google' | 'email' | 'anonymous', email?: string, displayName?: string): AuthUser {
    const mockUsers = {
      google: {
        uid: 'mock-google-user',
        email: email || 'user@gmail.com',
        displayName: displayName || 'Google User',
        photoURL: 'https://via.placeholder.com/150',
        provider: 'google' as const,
        isAnonymous: false
      },
      email: {
        uid: 'mock-email-user',
        email: email || 'user@example.com',
        displayName: displayName || 'Email User',
        provider: 'email' as const,
        isAnonymous: false
      },
      anonymous: {
        uid: 'mock-anonymous-user',
        email: '',
        displayName: 'Anonymous User',
        provider: 'anonymous' as const,
        isAnonymous: true
      }
    };

    return mockUsers[provider];
  }
}

export default AuthService;