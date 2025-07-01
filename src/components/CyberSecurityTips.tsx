import React, { useState } from 'react';
import { Shield, Lock, Eye, AlertTriangle, Smartphone, Wifi, Globe, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CyberSecurityTipsProps {
  onClose: () => void;
}

const CyberSecurityTips: React.FC<CyberSecurityTipsProps> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('basics');

  const securityTips = {
    basics: [
      {
        title: 'Use Strong, Unique Passwords',
        description: 'Create complex passwords with a mix of letters, numbers, and symbols. Use different passwords for each account.',
        icon: Lock,
        level: 'Essential',
        tips: [
          'Use at least 12 characters',
          'Include uppercase, lowercase, numbers, and symbols',
          'Avoid personal information like birthdays or names',
          'Consider using a password manager'
        ]
      },
      {
        title: 'Enable Two-Factor Authentication',
        description: 'Add an extra layer of security to your accounts with 2FA.',
        icon: UserCheck,
        level: 'Essential',
        tips: [
          'Use authenticator apps instead of SMS when possible',
          'Enable 2FA on all important accounts',
          'Keep backup codes in a safe place',
          'Use hardware security keys for maximum protection'
        ]
      },
      {
        title: 'Keep Software Updated',
        description: 'Regular updates patch security vulnerabilities and keep you protected.',
        icon: Shield,
        level: 'Essential',
        tips: [
          'Enable automatic updates when possible',
          'Update your operating system regularly',
          'Keep browsers and apps up to date',
          'Don\'t ignore security update notifications'
        ]
      }
    ],
    social: [
      {
        title: 'Privacy Settings Matter',
        description: 'Control who can see your information and posts on social media.',
        icon: Eye,
        level: 'Important',
        tips: [
          'Review privacy settings regularly',
          'Limit who can see your posts and personal info',
          'Be careful about location sharing',
          'Think before you post - it might be permanent'
        ]
      },
      {
        title: 'Verify Friend Requests',
        description: 'Be cautious about accepting friend requests from strangers.',
        icon: UserCheck,
        level: 'Important',
        tips: [
          'Only accept requests from people you know',
          'Check mutual friends and profile details',
          'Be wary of fake profiles',
          'Report suspicious accounts'
        ]
      },
      {
        title: 'Avoid Oversharing',
        description: 'Think twice before sharing personal information online.',
        icon: AlertTriangle,
        level: 'Important',
        tips: [
          'Don\'t share your full name, address, or phone number',
          'Avoid posting about vacations while you\'re away',
          'Be careful with photos that reveal personal information',
          'Don\'t share financial or sensitive personal details'
        ]
      }
    ],
    mobile: [
      {
        title: 'Secure Your Device',
        description: 'Use screen locks and keep your phone secure.',
        icon: Smartphone,
        level: 'Essential',
        tips: [
          'Use a strong PIN, password, or biometric lock',
          'Enable remote wipe capabilities',
          'Don\'t leave your phone unattended',
          'Use encrypted messaging apps for sensitive conversations'
        ]
      },
      {
        title: 'App Permissions',
        description: 'Be mindful of what permissions you grant to apps.',
        icon: Shield,
        level: 'Important',
        tips: [
          'Only grant necessary permissions',
          'Review app permissions regularly',
          'Download apps only from official stores',
          'Read app reviews and check developer reputation'
        ]
      },
      {
        title: 'Public Wi-Fi Safety',
        description: 'Be cautious when using public Wi-Fi networks.',
        icon: Wifi,
        level: 'Important',
        tips: [
          'Avoid accessing sensitive accounts on public Wi-Fi',
          'Use a VPN when possible',
          'Turn off auto-connect to Wi-Fi networks',
          'Verify network names with staff before connecting'
        ]
      }
    ],
    advanced: [
      {
        title: 'Recognize Phishing Attempts',
        description: 'Learn to identify and avoid phishing emails and websites.',
        icon: AlertTriangle,
        level: 'Advanced',
        tips: [
          'Check sender email addresses carefully',
          'Look for spelling and grammar errors',
          'Hover over links before clicking',
          'Verify requests through official channels'
        ]
      },
      {
        title: 'Secure Browsing Habits',
        description: 'Practice safe browsing to avoid malicious websites.',
        icon: Globe,
        level: 'Advanced',
        tips: [
          'Look for HTTPS (the lock icon) on websites',
          'Be cautious of pop-ups and ads',
          'Don\'t download software from untrusted sources',
          'Use reputable antivirus software'
        ]
      },
      {
        title: 'Digital Footprint Awareness',
        description: 'Understand and manage your online presence.',
        icon: Eye,
        level: 'Advanced',
        tips: [
          'Google yourself regularly to see what\'s public',
          'Use privacy-focused search engines',
          'Be mindful of what you share and where',
          'Consider using different email addresses for different purposes'
        ]
      }
    ]
  };

  const getLevelColor = (level: string) => {
    const colors = {
      Essential: 'text-red-600 bg-red-100 dark:bg-red-900/20',
      Important: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      Advanced: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
    };
    return colors[level as keyof typeof colors] || colors.Important;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Cybersecurity Tips</h2>
                <p className="text-purple-100">Stay safe and secure in the digital world</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'basics', name: 'Security Basics', icon: Shield },
              { id: 'social', name: 'Social Media', icon: UserCheck },
              { id: 'mobile', name: 'Mobile Security', icon: Smartphone },
              { id: 'advanced', name: 'Advanced Tips', icon: Lock }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {activeTab === 'basics' && 'Essential Security Practices'}
                {activeTab === 'social' && 'Social Media Safety'}
                {activeTab === 'mobile' && 'Mobile Device Security'}
                {activeTab === 'advanced' && 'Advanced Security Techniques'}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {securityTips[activeTab as keyof typeof securityTips].length} tips
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityTips[activeTab as keyof typeof securityTips].map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tip.level)}`}>
                        {tip.level}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {tip.title}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {tip.description}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Points:</p>
                      <ul className="space-y-1">
                        {tip.tips.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Security Checklist */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-500" />
                Quick Security Checklist
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Use strong, unique passwords for all accounts',
                  'Enable two-factor authentication where available',
                  'Keep all software and apps updated',
                  'Be cautious with public Wi-Fi networks',
                  'Review privacy settings on social media',
                  'Think before sharing personal information',
                  'Use reputable antivirus software',
                  'Regularly backup important data'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded text-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                If You Think You've Been Compromised
              </h4>
              <div className="space-y-3 text-sm text-red-700 dark:text-red-300">
                <p><strong>Immediate Steps:</strong></p>
                <ul className="space-y-1 ml-4">
                  <li>• Change passwords for affected accounts immediately</li>
                  <li>• Enable two-factor authentication if not already active</li>
                  <li>• Check account activity and unauthorized access</li>
                  <li>• Contact your bank if financial accounts are involved</li>
                  <li>• Report the incident to relevant authorities</li>
                  <li>• Monitor your accounts closely for unusual activity</li>
                </ul>
                <p className="mt-4"><strong>Get Help:</strong> Contact your school's IT department or a trusted adult for assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberSecurityTips;