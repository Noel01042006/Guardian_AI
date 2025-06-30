import React, { useState } from 'react';
import { Shield, User, Mail, Chrome, UserX, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import AuthService from '../services/authService';
import { useApp } from '../context/AppContext';

const AuthTestPanel: React.FC = () => {
  const { authUser, isAuthenticated, signOut } = useApp();
  const [testResults, setTestResults] = useState<Array<{
    test: string;
    status: 'pass' | 'fail' | 'pending';
    message: string;
  }>>([]);
  const [isRunning, setIsRunning] = useState(false);

  const authService = AuthService.getInstance();

  const runAuthTests = async () => {
    setIsRunning(true);
    const results = [];

    // Test 1: Firebase Configuration
    try {
      const hasConfig = !!(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);
      results.push({
        test: 'Firebase Configuration',
        status: hasConfig ? 'pass' : 'fail',
        message: hasConfig ? 'Firebase properly configured' : 'Missing Firebase environment variables'
      });
    } catch (error) {
      results.push({
        test: 'Firebase Configuration',
        status: 'fail',
        message: 'Error checking Firebase config'
      });
    }

    // Test 2: Authentication State
    results.push({
      test: 'Authentication State',
      status: isAuthenticated ? 'pass' : 'pending',
      message: isAuthenticated ? `Authenticated as ${authUser?.provider}` : 'Not authenticated'
    });

    // Test 3: Google Sign-in Capability
    try {
      // Just check if the method exists and doesn't throw immediately
      const canSignIn = typeof authService.signInWithGoogle === 'function';
      results.push({
        test: 'Google Sign-in Available',
        status: canSignIn ? 'pass' : 'fail',
        message: canSignIn ? 'Google sign-in method available' : 'Google sign-in not available'
      });
    } catch (error) {
      results.push({
        test: 'Google Sign-in Available',
        status: 'fail',
        message: 'Error checking Google sign-in'
      });
    }

    // Test 4: Email/Password Capability
    try {
      const canSignUp = typeof authService.signUpWithEmail === 'function';
      results.push({
        test: 'Email/Password Available',
        status: canSignUp ? 'pass' : 'fail',
        message: canSignUp ? 'Email/password authentication available' : 'Email/password not available'
      });
    } catch (error) {
      results.push({
        test: 'Email/Password Available',
        status: 'fail',
        message: 'Error checking email/password auth'
      });
    }

    // Test 5: Anonymous Sign-in Capability
    try {
      const canSignInAnon = typeof authService.signInAnonymously === 'function';
      results.push({
        test: 'Anonymous Sign-in Available',
        status: canSignInAnon ? 'pass' : 'fail',
        message: canSignInAnon ? 'Anonymous authentication available' : 'Anonymous auth not available'
      });
    } catch (error) {
      results.push({
        test: 'Anonymous Sign-in Available',
        status: 'fail',
        message: 'Error checking anonymous auth'
      });
    }

    // Test 6: Sign-out Capability
    if (isAuthenticated) {
      try {
        const canSignOut = typeof authService.signOut === 'function';
        results.push({
          test: 'Sign-out Available',
          status: canSignOut ? 'pass' : 'fail',
          message: canSignOut ? 'Sign-out functionality available' : 'Sign-out not available'
        });
      } catch (error) {
        results.push({
          test: 'Sign-out Available',
          status: 'fail',
          message: 'Error checking sign-out'
        });
      }
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const testGoogleSignIn = async () => {
    try {
      await authService.signInWithGoogle();
    } catch (error: any) {
      console.error('Google sign-in test failed:', error.message);
    }
  };

  const testAnonymousSignIn = async () => {
    try {
      await authService.signInAnonymously();
    } catch (error: any) {
      console.error('Anonymous sign-in test failed:', error.message);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Authentication Test Panel
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Test all authentication methods and features
            </p>
          </div>
        </div>
        <button
          onClick={runAuthTests}
          disabled={isRunning}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {isRunning ? 'Testing...' : 'Run Tests'}
        </button>
      </div>

      {/* Current Auth Status */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="font-medium text-gray-800 dark:text-white mb-2">Current Status</h3>
        {isAuthenticated && authUser ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Status:</strong> Authenticated
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Provider:</strong> {authUser.provider}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>User:</strong> {authUser.displayName || authUser.email || 'Anonymous'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Anonymous:</strong> {authUser.isAnonymous ? 'Yes' : 'No'}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">Not authenticated</p>
        )}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 dark:text-white mb-3">Test Results</h3>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {result.test}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {result.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Test Buttons */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800 dark:text-white">Manual Tests</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isAuthenticated && (
            <>
              <button
                onClick={testGoogleSignIn}
                className="flex items-center justify-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Chrome className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Test Google Sign-in</span>
              </button>

              <button
                onClick={testAnonymousSignIn}
                className="flex items-center justify-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <UserX className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Test Anonymous Sign-in</span>
              </button>
            </>
          )}

          {isAuthenticated && (
            <button
              onClick={signOut}
              className="flex items-center justify-center space-x-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Environment Info */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Environment Info</h3>
        <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
          <p><strong>Firebase API Key:</strong> {import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Not set'}</p>
          <p><strong>Firebase Project ID:</strong> {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Not set'}</p>
          <p><strong>Environment:</strong> {import.meta.env.DEV ? 'Development' : 'Production'}</p>
          <p><strong>Speech Recognition:</strong> {'webkitSpeechRecognition' in window ? 'Supported' : 'Not supported'}</p>
          <p><strong>Speech Synthesis:</strong> {'speechSynthesis' in window ? 'Supported' : 'Not supported'}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthTestPanel;