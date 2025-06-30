import React, { useState } from 'react';
import { Bot, GraduationCap, Heart, User, Check, X } from 'lucide-react';
import { AIAssistant, UserRole } from '../types';

interface AIAssistantSetupProps {
  userRole: UserRole;
  onSetupComplete: (assistants: { [key: string]: AIAssistant }) => void;
  onSkip: () => void;
}

const AIAssistantSetup: React.FC<AIAssistantSetupProps> = ({ userRole, onSetupComplete, onSkip }) => {
  const [tutorName, setTutorName] = useState('');
  const [wellbeingName, setWellbeingName] = useState('');
  const [generalName, setGeneralName] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const assistantTypes = [
    ...(userRole === 'teen' ? [{
      type: 'tutor' as const,
      icon: GraduationCap,
      title: 'Educational Tutor',
      description: 'Your personal study companion for homework, assignments, and learning new concepts',
      defaultName: 'StudyBuddy',
      color: 'from-blue-500 to-purple-600'
    }] : []),
    {
      type: 'wellbeing' as const,
      icon: Heart,
      title: 'Emotional Wellbeing Companion',
      description: 'A caring AI friend to support your mental health and emotional needs',
      defaultName: 'Harmony',
      color: 'from-pink-500 to-rose-600'
    },
    {
      type: 'general' as const,
      icon: Bot,
      title: 'General AI Assistant',
      description: 'Your versatile AI helper for daily tasks, questions, and conversations',
      defaultName: 'Guardian',
      color: 'from-teal-500 to-blue-600'
    }
  ];

  const handleNameChange = (type: string, name: string) => {
    switch (type) {
      case 'tutor':
        setTutorName(name);
        break;
      case 'wellbeing':
        setWellbeingName(name);
        break;
      case 'general':
        setGeneralName(name);
        break;
    }
  };

  const getName = (type: string) => {
    switch (type) {
      case 'tutor':
        return tutorName;
      case 'wellbeing':
        return wellbeingName;
      case 'general':
        return generalName;
      default:
        return '';
    }
  };

  const handleComplete = () => {
    const assistants: { [key: string]: AIAssistant } = {};

    assistantTypes.forEach((assistant) => {
      const name = getName(assistant.type) || assistant.defaultName;
      assistants[assistant.type] = {
        id: `${assistant.type}-${Date.now()}`,
        name,
        type: assistant.type,
        personality: getPersonality(assistant.type, userRole),
        avatar: assistant.type,
        isActive: true
      };
    });

    onSetupComplete(assistants);
  };

  const getPersonality = (type: string, role: UserRole): string => {
    const personalities = {
      tutor: 'Patient, encouraging, and knowledgeable. Loves helping students learn and grow academically.',
      wellbeing: {
        elder: 'Wise, compassionate, and understanding. Provides gentle support and listens with empathy.',
        teen: 'Relatable, supportive, and non-judgmental. Understands the unique challenges of teenage life.',
        child: 'Kind, gentle, and nurturing. Uses simple language and provides comfort and reassurance.',
        parent: 'Understanding, practical, and supportive. Recognizes the challenges of parenting and family life.'
      },
      general: {
        elder: 'Helpful, patient, and security-focused. Prioritizes safety and clear communication.',
        teen: 'Friendly, knowledgeable, and encouraging. Supports personal growth and exploration.',
        child: 'Fun, educational, and safe. Makes learning enjoyable while ensuring child safety.',
        parent: 'Efficient, family-oriented, and practical. Helps manage family life and responsibilities.'
      }
    };

    if (type === 'tutor') return personalities.tutor;
    if (type === 'wellbeing') return personalities.wellbeing[role];
    return personalities.general[role];
  };

  const currentAssistant = assistantTypes[currentStep];
  const IconComponent = currentAssistant?.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Set Up Your AI Assistants
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Customize your AI companions with personal names
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            {assistantTypes.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-blue-500' : 
                  index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {currentAssistant && (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${currentAssistant.color} flex items-center justify-center`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {currentAssistant.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {currentAssistant.description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose a name for your {currentAssistant.title.toLowerCase()}:
              </label>
              <input
                type="text"
                value={getName(currentAssistant.type)}
                onChange={(e) => handleNameChange(currentAssistant.type, e.target.value)}
                placeholder={`e.g., ${currentAssistant.defaultName}`}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave blank to use default name: {currentAssistant.defaultName}
              </p>
            </div>

            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
              )}
              
              {currentStep < assistantTypes.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  Next
                  <Check className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  Complete Setup
                  <Check className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>

            <button
              onClick={onSkip}
              className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-1" />
              Skip setup (use default names)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantSetup;