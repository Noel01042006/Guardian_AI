import React from 'react';
import { Contrast, Volume2, VolumeX, Globe, Type, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AccessibilityControls: React.FC = () => {
  const { 
    highContrast, 
    toggleHighContrast,
    darkMode,
    toggleDarkMode,
    language, 
    setLanguage, 
    speechEnabled, 
    toggleSpeech 
  } = useApp();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-3 min-w-[200px] border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Accessibility & Theme
        </h3>
        
        <button
          onClick={toggleDarkMode}
          className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
            darkMode 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          <span className="text-sm">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        <button
          onClick={toggleHighContrast}
          className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
            highContrast 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label="Toggle high contrast mode"
        >
          <Contrast className="w-4 h-4" />
          <span className="text-sm">High Contrast</span>
        </button>

        <button
          onClick={toggleSpeech}
          className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
            speechEnabled 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
          aria-label="Toggle speech features"
        >
          {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-sm">Speech {speechEnabled ? 'On' : 'Off'}</span>
        </button>

        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            aria-label="Select language"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityControls;