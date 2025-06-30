import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './components/LandingPage';
import RoleSelector from './components/RoleSelector';
import Dashboard from './components/Dashboard';
import AccessibilityControls from './components/AccessibilityControls';
import AIAssistantSetup from './components/AIAssistantSetup';
import FeatureTestDashboard from './components/FeatureTestDashboard';
import CustomBoltBadge from './components/BoltBadge';
import BackButton from './components/BackButton';
import { User, AIAssistant } from './types';

const AppContent: React.FC = () => {
  const { currentUser, setCurrentUser, updateUserAssistants, isAuthenticated, authUser } = useApp();
  const [viewStack, setViewStack] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState("landing");

  // Dev-only test dashboard
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'true') {
      setCurrentView("testDashboard");
    }
  }, []);

  const navigateTo = (view: string) => {
    setViewStack((prev) => [...prev, currentView]);
    setCurrentView(view);
  };

  const goBack = () => {
    setViewStack((prev) => {
      const newStack = [...prev];
      const previous = newStack.pop() || "dashboard";
      setCurrentView(previous);
      return newStack;
    });
  };

  const handleRoleSelect = (role: User['role'], name: string) => {
    const newUser: User = {
      id: authUser?.uid || Date.now().toString(),
      name: name || authUser?.displayName || 'User',
      email: authUser?.email || '',
      role,
      avatar: '',
      authProvider: authUser?.provider || 'email',
      preferences: {
        language: 'en',
        highContrast: false,
        speechEnabled: true,
        fontSize: 'medium'
      },
      aiAssistants: {}
    };
    setCurrentUser(newUser);

    if (authUser?.isAnonymous) {
      handleSkipSetup();
      setCurrentView("dashboard");
    } else {
      navigateTo("assistantSetup");
    }
  };

  const handleAssistantSetup = (assistants: { [key: string]: AIAssistant }) => {
    updateUserAssistants(assistants);
    setCurrentView("dashboard");
  };

  const handleSkipSetup = () => {
    const defaultAssistants: { [key: string]: AIAssistant } = {};

    if (currentUser?.role === 'teen') {
      defaultAssistants.tutor = {
        id: `tutor-${Date.now()}`,
        name: 'StudyBuddy',
        type: 'tutor',
        personality: 'Patient, encouraging, and knowledgeable.',
        avatar: 'tutor',
        isActive: true
      };
    }

    defaultAssistants.wellbeing = {
      id: `wellbeing-${Date.now()}`,
      name: 'Harmony',
      type: 'wellbeing',
      personality: getDefaultWellbeingPersonality(currentUser?.role || 'parent'),
      avatar: 'wellbeing',
      isActive: true
    };

    defaultAssistants.general = {
      id: `general-${Date.now()}`,
      name: 'Guardian',
      type: 'general',
      personality: getDefaultGeneralPersonality(currentUser?.role || 'parent'),
      avatar: 'general',
      isActive: true
    };

    updateUserAssistants(defaultAssistants);
  };

  const getDefaultWellbeingPersonality = (role: string): string => {
    const personalities = {
      elder: 'Wise and compassionate.',
      teen: 'Relatable and supportive.',
      child: 'Gentle and comforting.',
      parent: 'Understanding and practical.'
    };
    return personalities[role as keyof typeof personalities] || personalities.parent;
  };

  const getDefaultGeneralPersonality = (role: string): string => {
    const personalities = {
      elder: 'Helpful and patient.',
      teen: 'Friendly and encouraging.',
      child: 'Fun and safe.',
      parent: 'Efficient and family-focused.'
    };
    return personalities[role as keyof typeof personalities] || personalities.parent;
  };

  return (
    <>
      {/* Back button visible on all views except landing */}
      {currentView !== "landing" && <BackButton onClick={goBack} />}

      {currentView === "landing" && (
        <>
          <LandingPage onGetStarted={() => navigateTo("roleSelector")} />
          <CustomBoltBadge />
        </>
      )}

      {currentView === "roleSelector" && (
        <RoleSelector onRoleSelect={handleRoleSelect} />
      )}

      {currentView === "assistantSetup" && currentUser && (
        <AIAssistantSetup
          userRole={currentUser.role}
          onSetupComplete={handleAssistantSetup}
          onSkip={() => {
            handleSkipSetup();
            setCurrentView("dashboard");
          }}
        />
      )}

      {currentView === "dashboard" && currentUser && (
        <>
          <Dashboard role={currentUser.role} userName={currentUser.name} />
          <AccessibilityControls />
        </>
      )}

      {currentView === "testDashboard" && (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="p-4">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to App
            </button>
          </div>
          <FeatureTestDashboard />
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="font-sans antialiased">
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;
