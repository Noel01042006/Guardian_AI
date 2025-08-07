import React, { useState } from 'react';
import { Shield, MessageCircle, BookOpen, Heart, AlertTriangle, TrendingUp, GraduationCap, Bot, Users, Eye, Lightbulb, Clock, Briefcase, Lock, Activity, Timer } from 'lucide-react';
import { UserRole, ScamAlert, JournalEntry, AIAssistant } from '../types';
import Avatar from './Avatar';
import ChatInterface from './ChatInterface';
import FamilyDashboard from './FamilyDashboard';
import FamilyManagement from './FamilyManagement';
import ChildMonitoring from './ChildMonitoring';
import EducationalResources from './EducationalResources';
import ParentingTips from './ParentingTips';
import ScamProtection from './ScamProtection';
import HealthReminders from './HealthReminders';
import StudyHelper from './StudyHelper';
import CyberSecurityTips from './CyberSecurityTips';
import CareerGuidance from './CareerGuidance';
import PomodoroTimer from './PomodoroTimer';
import { useApp } from '../context/AppContext';

interface DashboardProps {
  role: UserRole;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ role, userName }) => {
  const { currentUser } = useApp();
  const [selectedAssistant, setSelectedAssistant] = useState<AIAssistant | undefined>();
  const [showFamilyDashboard, setShowFamilyDashboard] = useState(false);
  const [showFamilyManagement, setShowFamilyManagement] = useState(false);
  const [showChildMonitoring, setShowChildMonitoring] = useState(false);
  const [showEducationalResources, setShowEducationalResources] = useState(false);
  const [showParentingTips, setShowParentingTips] = useState(false);
  const [showScamProtection, setShowScamProtection] = useState(false);
  const [showHealthReminders, setShowHealthReminders] = useState(false);
  const [showStudyHelper, setShowStudyHelper] = useState(false);
  const [showCyberSecurityTips, setShowCyberSecurityTips] = useState(false);
  const [showCareerGuidance, setShowCareerGuidance] = useState(false);
  const [showPomodoroTimer, setShowPomodoroTimer] = useState(false);

  // Get available assistants for the current user
  const availableAssistants = currentUser?.aiAssistants ? Object.values(currentUser.aiAssistants) : [];

  // Set default assistant if none selected
  React.useEffect(() => {
    if (availableAssistants.length > 0 && !selectedAssistant) {
      // Prefer tutor for teens, wellbeing for others, then general
      const preferredAssistant = 
        availableAssistants.find(a => a.type === 'tutor' && role === 'teen') ||
        availableAssistants.find(a => a.type === 'wellbeing') ||
        availableAssistants.find(a => a.type === 'general') ||
        availableAssistants[0];
      
      setSelectedAssistant(preferredAssistant);
    }
  }, [availableAssistants, selectedAssistant, role]);

  const roleConfig = {
    elder: {
      title: 'Elder Guardian Dashboard',
      color: 'from-amber-400 to-orange-500',
      features: [
        { name: 'Scam Protection', icon: Shield, action: () => setShowScamProtection(true) },
        { name: 'Health Reminders', icon: Heart, action: () => setShowHealthReminders(true) },
        { name: 'Family Chat', icon: MessageCircle, action: () => {} },
        { name: 'Emergency Contacts', icon: AlertTriangle, action: () => {} }
      ],
      recentAlerts: [
        { id: '1', content: 'Suspicious email detected', riskLevel: 'high' as const, type: 'Email Scam', timestamp: new Date() },
        { id: '2', content: 'Unusual phone call pattern', riskLevel: 'medium' as const, type: 'Phone Scam', timestamp: new Date() }
      ]
    },
    teen: {
      title: 'Teen Explorer Dashboard',
      color: 'from-purple-400 to-blue-500',
      features: [
        { name: 'Study Helper', icon: GraduationCap, action: () => setShowStudyHelper(true) },
        { name: 'Focus Timer', icon: Timer, action: () => setShowPomodoroTimer(true) },
        { name: 'Cybersecurity Tips', icon: Lock, action: () => setShowCyberSecurityTips(true) },
        { name: 'Career Guidance', icon: Briefcase, action: () => setShowCareerGuidance(true) }
      ],
      recentAlerts: [
        { id: '1', content: 'Social media privacy check', riskLevel: 'medium' as const, type: 'Privacy', timestamp: new Date() }
      ]
    },
    child: {
      title: 'Young Learner Dashboard',
      color: 'from-pink-400 to-yellow-400',
      features: [
        { name: 'Safe Learning', icon: BookOpen, action: () => {} },
        { name: 'Study Timer', icon: Timer, action: () => setShowPomodoroTimer(true) },
        { name: 'Fun Activities', icon: Heart, action: () => {} },
        { name: 'Ask Questions', icon: MessageCircle, action: () => {} }
      ],
      recentAlerts: []
    },
    parent: {
      title: 'Parent Command Center',
      color: 'from-teal-400 to-blue-600',
      features: [
        { name: 'Family Safety', icon: Shield, action: () => setShowFamilyDashboard(true) },
        { name: 'Child Monitoring', icon: Eye, action: () => setShowChildMonitoring(true) },
        { name: 'Educational Resources', icon: BookOpen, action: () => setShowEducationalResources(true) },
        { name: 'Parenting Tips', icon: Lightbulb, action: () => setShowParentingTips(true) }
      ],
      recentAlerts: [
        { id: '1', content: 'Child safety check completed', riskLevel: 'low' as const, type: 'Safety', timestamp: new Date() }
      ]
    }
  };

  const config = roleConfig[role];

  const handleFeatureClick = (feature: any) => {
    if (feature.action) {
      feature.action();
    }
  };

  const getAssistantSummary = () => {
    if (!availableAssistants.length) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <Bot className="w-5 h-5 mr-2 text-blue-500" />
          Your AI Assistants
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {availableAssistants.map((assistant) => {
            const Icon = assistant.type === 'tutor' ? GraduationCap : 
                        assistant.type === 'wellbeing' ? Heart : Bot;
            return (
              <div
                key={assistant.id}
                onClick={() => setSelectedAssistant(assistant)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedAssistant?.id === assistant.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    assistant.type === 'tutor' ? 'bg-blue-500' :
                    assistant.type === 'wellbeing' ? 'bg-pink-500' :
                    'bg-teal-500'
                  }`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{assistant.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      {assistant.type} Assistant
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Show Family Dashboard for parents
  if (showFamilyDashboard && role === 'parent') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.color} p-6 text-white`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar role={role} size="lg" />
              <div>
                <h1 className="text-2xl font-bold">Family Management Center</h1>
                <p className="text-white/90">Monitor and protect your family's digital wellbeing</p>
              </div>
            </div>
            <button
              onClick={() => setShowFamilyDashboard(false)}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <FamilyDashboard onManageFamily={() => setShowFamilyManagement(true)} />
        </div>

        {/* Family Management Modal */}
        {showFamilyManagement && (
          <FamilyManagement onClose={() => setShowFamilyManagement(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.color} p-6 text-white`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar role={role} size="lg" />
            <div>
              <h1 className="text-2xl font-bold">{config.title}</h1>
              <p className="text-white/90">Welcome back, {userName}!</p>
              {selectedAssistant && (
                <p className="text-white/80 text-sm">
                  Currently chatting with {selectedAssistant.name}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Today's Date</p>
            <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {config.features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <button
                      key={feature.name}
                      onClick={() => handleFeatureClick(feature)}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center group"
                    >
                      <div className="w-8 h-8 mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Chat Interface */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg" style={{ height: '500px' }}>
              <ChatInterface 
                title="Chat with your AI Assistant"
                placeholder={
                  selectedAssistant?.type === 'tutor' ? "Ask about homework, study tips, or any subject..." :
                  selectedAssistant?.type === 'wellbeing' ? "Share your feelings or ask for emotional support..." :
                  "Ask me anything or start a conversation..."
                }
                selectedAssistant={selectedAssistant}
                availableAssistants={availableAssistants}
                onAssistantChange={setSelectedAssistant}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistants Summary */}
            {getAssistantSummary()}

            {/* Recent Alerts */}
            {config.recentAlerts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  Recent Alerts
                </h3>
                <div className="space-y-3">
                  {config.recentAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                      alert.riskLevel === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                      alert.riskLevel === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                      'border-green-500 bg-green-50 dark:bg-green-900/20'
                    }`}>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {alert.content}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {alert.type} • {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Today's Activity
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Conversations</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">AI Interactions</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Safety Score</span>
                  <span className="text-sm font-semibold text-green-600">98%</span>
                </div>
                {role === 'parent' && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Family Members</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">4</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Daily Tip
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {role === 'elder' && "Never give personal information over the phone unless you initiated the call."}
                  {role === 'teen' && "Use your AI tutor to break down complex assignments into manageable steps."}
                  {role === 'child' && "Always ask an adult before clicking on links or downloading anything."}
                  {role === 'parent' && "Regularly check your family dashboard to monitor everyone's digital wellbeing and safety."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showFamilyManagement && (
        <FamilyManagement onClose={() => setShowFamilyManagement(false)} />
      )}
      
      {showChildMonitoring && (
        <ChildMonitoring onClose={() => setShowChildMonitoring(false)} />
      )}
      
      {showEducationalResources && (
        <EducationalResources onClose={() => setShowEducationalResources(false)} />
      )}
      
      {showParentingTips && (
        <ParentingTips onClose={() => setShowParentingTips(false)} />
      )}

      {showScamProtection && (
        <ScamProtection onClose={() => setShowScamProtection(false)} />
      )}

      {showHealthReminders && (
        <HealthReminders onClose={() => setShowHealthReminders(false)} />
      )}

      {showStudyHelper && (
        <StudyHelper onClose={() => setShowStudyHelper(false)} />
      )}

      {showCyberSecurityTips && (
        <CyberSecurityTips onClose={() => setShowCyberSecurityTips(false)} />
      )}

      {showCareerGuidance && (
        <CareerGuidance onClose={() => setShowCareerGuidance(false)} />
      )}

      {showPomodoroTimer && (
        <PomodoroTimer onClose={() => setShowPomodoroTimer(false)} />
      )}
    </div>
  );
};

export default Dashboard;