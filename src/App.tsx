import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './components/LandingPage';
import RoleSelector from './components/RoleSelector';
import Dashboard from './components/Dashboard';
import AccessibilityControls from './components/AccessibilityControls';
import AIAssistantSetup from './components/AIAssistantSetup';
import FeatureTestDashboard from './components/FeatureTestDashboard';
import AuthTestPanel from './components/AuthTestPanel';
import CustomBoltBadge from './components/BoltBadge';
import BackButton from './components/BackButton'; // ✅ Imported here
import { User, AIAssistant } from './types';

const AppContent: React.FC = () => {
  const { currentUser, setCurrentUser, updateUserAssistants, isAuthenticated, authUser } = useApp();
  const [showAssistantSetup, setShowAssistantSetup] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showTestDashboard, setShowTestDashboard] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'true') {
      setShowTestDashboard(true);
      setShowLanding(false);
    }
  }, []);

  if (showTestDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-4">
          <button
            onClick={() => {
              setShowTestDashboard(false);
              window.history.replaceState({}, '', window.location.pathname);
            }}
            className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to App
          </button>
        </div>
        <FeatureTestDashboard />
      </div>
    );
  }

  if (!isAuthenticated && showLanding) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowLanding(false)} />
        <CustomBoltBadge /> {/* ✅ Badge on the landing page only */}
      </>
    );
  }

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
    } else {
      setShowAssistantSetup(true);
    }
  };

  const handleAssistantSetup = (assistants: { [key: string]: AIAssistant }) => {
    updateUserAssistants(assistants);
    setShowAssistantSetup(false);
  };

  const handleSkipSetup = () => {
    const defaultAssistants: { [key: string]: AIAssistant } = {};

    if (currentUser?.role === 'teen') {
      defaultAssistants.tutor = {
        id: `tutor-${Date.now()}`,
        name: 'StudyBuddy',
        type: 'tutor',
        personality: 'Patient, encouraging, and knowledgeable. Loves helping students learn and grow academically.',
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
    setShowAssistantSetup(false);
  };

  const getDefaultWellbeingPersonality = (role: string): string => {
    const personalities = {
      elder: 'Wise, compassionate, and understanding. Provides gentle support and listens with empathy.',
      teen: 'Relatable, supportive, and non-judgmental. Understands the unique challenges of teenage life.',
      child: 'Kind, gentle, and nurturing. Uses simple language and provides comfort and reassurance.',
      parent: 'Understanding, practical, and supportive. Recognizes the challenges of parenting and family life.'
    };
    return personalities[role as keyof typeof personalities] || personalities.parent;
  };

  const getDefaultGeneralPersonality = (role: string): string => {
    const personalities = {
      elder: 'Helpful, patient, and security-focused. Prioritizes safety and clear communication.',
      teen: 'Friendly, knowledgeable, and encouraging. Supports personal growth and exploration.',
      child: 'Fun, educational, and safe. Makes learning enjoyable while ensuring child safety.',
      parent: 'Efficient, family-oriented, and practical. Helps manage family life and responsibilities.'
    };
    return personalities[role as keyof typeof personalities] || personalities.parent;
  };

  if (!currentUser) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  if (showAssistantSetup) {
    return (
      <AIAssistantSetup
        userRole={currentUser.role}
        onSetupComplete={handleAssistantSetup}
        onSkip={handleSkipSetup}
      />
    );
  }

  return (
    <>
      <Dashboard role={currentUser.role} userName={currentUser.name} />
      <AccessibilityControls />
      <BackButton /> {/* ✅ Back button added here */}

      {/* Test Dashboard Access Button (Development Only) */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            onClick={() => setShowTestDashboard(true)}
            className="bg-purple-500 text-white px-3 py-2 rounded-lg text-xs hover:bg-purple-600 transition-colors shadow-lg"
            title="Open Test Dashboard"
          >
            🧪 Tests
          </button>
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
