import React, { useState } from 'react';
import { UserRole } from '../types';
import Avatar from './Avatar';
import NameInputModal from './NameInputModal';
import { useApp } from '../context/AppContext';
import { LogOut, UserX } from 'lucide-react';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole, name: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const { authUser, signOut } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);

  const roles = [
    {
      role: 'elder' as UserRole,
      title: 'Elder',
      description: 'Stay safe and connected with family',
      features: ['Scam Protection', 'Health Reminders', 'Easy Communication']
    },
    {
      role: 'teen' as UserRole,
      title: 'Teen',
      description: 'Navigate digital life safely',
      features: ['Privacy Tips', 'Study Help', 'Career Guidance']
    },
    {
      role: 'child' as UserRole,
      title: 'Child',
      description: 'Learn and explore safely',
      features: ['Safe Learning', 'Fun Activities', 'Parent Connection']
    },
    {
      role: 'parent' as UserRole,
      title: 'Parent',
      description: 'Protect and guide your family',
      features: ['Family Safety', 'Child Monitoring', 'Educational Resources']
    }
  ];

  const handleRoleClick = (role: UserRole) => {
    let name = authUser?.displayName;
    
    // For anonymous users, use a default name
    if (authUser?.isAnonymous) {
      onRoleSelect(role, 'Demo User');
      return;
    }
    
    // If user has a display name, use it directly
    if (name && name.trim()) {
      onRoleSelect(role, name.trim());
    } else {
      // Show styled name input modal
      setSelectedRole(role);
      setShowNameInput(true);
    }
  };

  const handleNameSubmit = (name: string) => {
    if (selectedRole) {
      onRoleSelect(selectedRole, name);
    }
    setShowNameInput(false);
    setSelectedRole(null);
  };

  const handleNameCancel = () => {
    setShowNameInput(false);
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      {/* Header with user info and sign out */}
      {authUser && (
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {authUser.isAnonymous ? 'Demo Mode' : 'Signed in as'}
            </p>
            <p className="font-medium text-gray-800 dark:text-white">
              {authUser.isAnonymous ? 'Anonymous User' : (authUser.displayName || authUser.email)}
            </p>
          </div>
          <button
            onClick={signOut}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            title={authUser.isAnonymous ? 'Exit demo' : 'Sign out'}
          >
            {authUser.isAnonymous ? <UserX className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
          </button>
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Choose Your Role
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select your role to get started with personalized AI assistance tailored to your needs.
        </p>
        {authUser && (
          <div className="mt-4">
            {authUser.isAnonymous ? (
              <div className="bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 inline-block">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  🎭 Demo Mode - Explore all features without saving data
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome, {authUser.displayName || authUser.email}!
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {roles.map((roleInfo) => (
          <div
            key={roleInfo.role}
            onClick={() => handleRoleClick(roleInfo.role)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer p-6 text-center"
          >
            <div className="mb-6">
              <Avatar role={roleInfo.role} size="xl" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {roleInfo.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {roleInfo.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Key Features:
              </h3>
              {roleInfo.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
              Select {roleInfo.title}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Guardian AI uses advanced AI to provide personalized assistance based on your role and needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          <span>🛡️ Privacy Protected</span>
          <span>🎯 Personalized AI</span>
          <span>🗣️ Voice Enabled</span>
          <span>♿ Accessibility Ready</span>
          {authUser?.isAnonymous && <span>🎭 Demo Mode Active</span>}
        </div>
      </div>

      {/* Name Input Modal */}
      {showNameInput && selectedRole && (
        <NameInputModal
          role={selectedRole}
          onSubmit={handleNameSubmit}
          onCancel={handleNameCancel}
        />
      )}
    </div>
  );
};

export default RoleSelector;