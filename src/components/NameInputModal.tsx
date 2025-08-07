import React, { useState } from 'react';
import { User, Sparkles, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';
import Avatar from './Avatar';

interface NameInputModalProps {
  role: UserRole;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

const NameInputModal: React.FC<NameInputModalProps> = ({ role, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit(name.trim());
  };

  const getRoleWelcomeMessage = (role: UserRole) => {
    const messages = {
      elder: "Welcome to your safe digital companion! Let's get you set up with personalized protection and assistance.",
      teen: "Ready to explore, learn, and stay safe online? Let's personalize your Guardian AI experience!",
      child: "Hi there! Let's set up your safe learning space where you can explore and have fun!",
      parent: "Welcome to your family command center! Let's get you set up to protect and guide your loved ones."
    };
    return messages[role];
  };

  const getRoleFeatureHighlight = (role: UserRole) => {
    const features = {
      elder: ["🛡️ Advanced scam protection", "💊 Health reminders", "👨‍👩‍👧‍👦 Family communication"],
      teen: ["📚 AI tutoring assistance", "🎯 Study focus tools", "🔒 Privacy & safety tips"],
      child: ["🎮 Safe learning games", "🤖 Friendly AI helpers", "👨‍👩‍👧‍👦 Parent connection"],
      parent: ["👁️ Family monitoring", "📊 Safety reports", "🎓 Educational resources"]
    };
    return features[role];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all">
        {/* Animated Header */}
        <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <div className="relative inline-block">
                <Avatar role={role} size="xl" className="mx-auto shadow-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-3">
              Welcome, Future {role.charAt(0).toUpperCase() + role.slice(1)}!
            </h2>
            
            <p className="text-blue-100 text-lg leading-relaxed">
              {getRoleWelcomeMessage(role)}
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Features Preview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
              What's waiting for you:
            </h3>
            <div className="space-y-3">
              {getRoleFeatureHighlight(role).map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Name Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 dark:text-white mb-3 text-center">
                What should we call you?
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                  autoFocus
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                This helps us personalize your Guardian AI experience
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={!name.trim() || isSubmitting}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Let's Go!</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Encouragement Message */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🌟 You're about to join thousands of families staying safe and learning together with Guardian AI!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameInputModal;