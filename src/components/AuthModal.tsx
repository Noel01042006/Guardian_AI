import React, { useState } from 'react';
import { X, Mail, Eye, EyeOff, AlertCircle, UserX, Chrome, Shield } from 'lucide-react';
import AuthService from '../services/authService';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'anonymous'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPopupBlocked, setIsPopupBlocked] = useState(false);

  const authService = AuthService.getInstance();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    setIsPopupBlocked(false);
    try {
      await authService.signInWithGoogle();
      onSuccess();
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked' || error.message.includes('popup-blocked') || error.message.includes('Popup was blocked')) {
        setIsPopupBlocked(true);
        setError('Pop-up blocked by browser');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await authService.signInAnonymously();
      onSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (authMode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      if (authMode === 'signup') {
        await authService.signUpWithEmail(email, password, displayName);
      } else {
        await authService.signInWithEmail(email, password);
      }
      onSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (authMode) {
      case 'signup': return 'Create Account';
      case 'anonymous': return 'Try Guardian AI';
      default: return 'Welcome Back';
    }
  };

  const getModalSubtitle = () => {
    switch (authMode) {
      case 'signup': return 'Join Guardian AI to protect your family';
      case 'anonymous': return 'Explore Guardian AI without creating an account';
      default: return 'Sign in to your Guardian AI account';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {authMode === 'anonymous' ? (
              <UserX className="w-8 h-8 text-white" />
            ) : (
              <Mail className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {getModalTitle()}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {getModalSubtitle()}
          </p>
        </div>

        {error && (
          <div className="mb-6">
            {isPopupBlocked ? (
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                      Pop-up Blocked by Browser
                    </h3>
                    <p className="text-orange-700 dark:text-orange-300 text-sm mb-3">
                      Your browser blocked the Google sign-in window. To continue with Google sign-in:
                    </p>
                    <ol className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-3 ml-4">
                      <li>1. Look for a pop-up blocked icon in your address bar</li>
                      <li>2. Click it and select "Always allow pop-ups from this site"</li>
                      <li>3. Try signing in with Google again</li>
                    </ol>
                    <p className="text-orange-600 dark:text-orange-400 text-xs">
                      Or use email sign-in below as an alternative
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Auth Mode Selector */}
        <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              authMode === 'signin'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              authMode === 'signup'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setAuthMode('anonymous')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              authMode === 'anonymous'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Try Demo
          </button>
        </div>

        {authMode === 'anonymous' ? (
          /* Anonymous Sign In */
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Try Guardian AI Demo
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
                Explore Guardian AI's features without creating an account. Your data will not be saved permanently.
              </p>
              <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
                <li>• Access all AI assistants</li>
                <li>• Try family safety features</li>
                <li>• Experience the full interface</li>
                <li>• No personal data required</li>
              </ul>
            </div>
            
            <button
              onClick={handleAnonymousSignIn}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              <UserX className="w-5 h-5 mr-2" />
              {loading ? 'Starting Demo...' : 'Start Demo Experience'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Want to save your progress?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>
        ) : (
          /* Email/Password and Social Sign In */
          <>
            {/* Google Sign In */}
            <div className="mb-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <Chrome className="w-5 h-5 mr-3 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Continue with Google
                </span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {authMode === 'signup' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Please wait...' : (authMode === 'signup' ? 'Create Account' : 'Sign In')}
              </button>
            </form>
          </>
        )}

        {/* Footer Links */}
        {authMode !== 'anonymous' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                {authMode === 'signup' ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            By continuing, you agree to Guardian AI's Terms of Service and Privacy Policy.
            {authMode === 'anonymous' && ' Demo data is not permanently stored.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;