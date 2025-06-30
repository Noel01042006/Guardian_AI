import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AIAssistant, AuthUser } from '../types';
import AuthService from '../services/authService';

interface AppContextType {
  currentUser: User | null;
  authUser: AuthUser | null;
  setCurrentUser: (user: User) => void;
  updateUserAssistants: (assistants: { [key: string]: AIAssistant }) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  speechEnabled: boolean;
  toggleSpeech: () => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or default to system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [language, setLanguage] = useState('en');
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authService = AuthService.getInstance();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setAuthUser(user);
      setIsAuthenticated(!!user);
      
      // If user signs out, clear current user
      if (!user) {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  // Apply theme to document - high contrast overrides dark mode
  useEffect(() => {
    const shouldApplyDark = highContrast || darkMode;
    const htmlElement = document.documentElement;
    
    if (shouldApplyDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    
    // Save dark mode preference (but not high contrast as it's temporary)
    if (!highContrast) {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }

    // Force a repaint to ensure styles are applied
    htmlElement.style.display = 'none';
    htmlElement.offsetHeight; // Trigger reflow
    htmlElement.style.display = '';
  }, [darkMode, highContrast]);

  const updateUserAssistants = (assistants: { [key: string]: AIAssistant }) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        aiAssistants: assistants
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      setCurrentUser(null);
      setAuthUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleHighContrast = () => setHighContrast(!highContrast);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Immediately apply the change to ensure it's visible
    const htmlElement = document.documentElement;
    if (newDarkMode || highContrast) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  };
  
  const toggleSpeech = () => setSpeechEnabled(!speechEnabled);

  return (
    <AppContext.Provider value={{
      currentUser,
      authUser,
      setCurrentUser,
      updateUserAssistants,
      highContrast,
      toggleHighContrast,
      darkMode,
      toggleDarkMode,
      language,
      setLanguage,
      speechEnabled,
      toggleSpeech,
      signOut: handleSignOut,
      isAuthenticated
    }}>
      {children}
    </AppContext.Provider>
  );
};