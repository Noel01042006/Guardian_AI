import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Clock, 
  Activity, 
  AlertTriangle, 
  Eye, 
  Calendar,
  TrendingUp,
  Heart,
  BookOpen,
  MessageCircle,
  Settings,
  Filter,
  Download,
  Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Avatar from './Avatar';

interface ChildActivity {
  id: string;
  childId: string;
  childName: string;
  type: 'ai_chat' | 'study_session' | 'safety_alert' | 'wellbeing_check';
  description: string;
  timestamp: Date;
  duration?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  subject?: string;
  mood?: string;
}

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  role: 'child' | 'teen';
  avatar: string;
  lastActive: Date;
  todayStats: {
    aiInteractions: number;
    studyTime: number;
    wellbeingScore: number;
    safetyAlerts: number;
  };
  weeklyTrends: {
    engagement: number;
    learning: number;
    safety: number;
    wellbeing: number;
  };
}

interface ChildMonitoringProps {
  onClose: () => void;
}

const ChildMonitoring: React.FC<ChildMonitoringProps> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('today');
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [activities, setActivities] = useState<ChildActivity[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadChildrenData();
    loadActivities();
  }, []);

  const loadChildrenData = () => {
    // Mock data - in production, this would come from the family service
    const mockChildren: ChildProfile[] = [
      {
        id: 'child-1',
        name: 'Emma',
        age: 8,
        role: 'child',
        avatar: 'child',
        lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        todayStats: {
          aiInteractions: 12,
          studyTime: 45,
          wellbeingScore: 92,
          safetyAlerts: 0
        },
        weeklyTrends: {
          engagement: 85,
          learning: 78,
          safety: 98,
          wellbeing: 88
        }
      },
      {
        id: 'teen-1',
        name: 'Alex',
        age: 15,
        role: 'teen',
        avatar: 'teen',
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        todayStats: {
          aiInteractions: 28,
          studyTime: 120,
          wellbeingScore: 76,
          safetyAlerts: 1
        },
        weeklyTrends: {
          engagement: 92,
          learning: 85,
          safety: 94,
          wellbeing: 72
        }
      }
    ];
    setChildren(mockChildren);
    if (mockChildren.length > 0) {
      setSelectedChild(mockChildren[0].id);
    }
  };

  const loadActivities = () => {
    // Mock activity data
    const mockActivities: ChildActivity[] = [
      {
        id: '1',
        childId: 'child-1',
        childName: 'Emma',
        type: 'ai_chat',
        description: 'Asked about dinosaurs and prehistoric animals',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        duration: 8,
        subject: 'Science'
      },
      {
        id: '2',
        childId: 'teen-1',
        childName: 'Alex',
        type: 'study_session',
        description: 'Completed algebra homework with AI tutor',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        duration: 35,
        subject: 'Mathematics'
      },
      {
        id: '3',
        childId: 'teen-1',
        childName: 'Alex',
        type: 'safety_alert',
        description: 'Attempted to share personal information in chat',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        riskLevel: 'medium'
      },
      {
        id: '4',
        childId: 'child-1',
        childName: 'Emma',
        type: 'wellbeing_check',
        description: 'Expressed feeling happy after completing art project',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        mood: 'happy'
      },
      {
        id: '5',
        childId: 'teen-1',
        childName: 'Alex',
        type: 'ai_chat',
        description: 'Discussed career options in technology field',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        duration: 15
      }
    ];
    setActivities(mockActivities);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ai_chat':
        return MessageCircle;
      case 'study_session':
        return BookOpen;
      case 'safety_alert':
        return AlertTriangle;
      case 'wellbeing_check':
        return Heart;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string, riskLevel?: string) => {
    if (type === 'safety_alert') {
      switch (riskLevel) {
        case 'high':
          return 'text-red-600 bg-red-100 dark:bg-red-900/20';
        case 'medium':
          return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
        default:
          return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      }
    }
    
    const colors = {
      ai_chat: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      study_session: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      wellbeing_check: 'text-pink-600 bg-pink-100 dark:bg-pink-900/20'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (selectedChild && activity.childId !== selectedChild) return false;
    if (activityFilter !== 'all' && activity.type !== activityFilter) return false;
    
    const now = new Date();
    const activityDate = activity.timestamp;
    
    switch (timeFilter) {
      case 'today':
        return activityDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return activityDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return activityDate >= monthAgo;
      default:
        return true;
    }
  });

  const selectedChildData = children.find(child => child.id === selectedChild);

  const generateReport = () => {
    const reportData = {
      child: selectedChildData,
      activities: filteredActivities,
      timeRange: timeFilter,
      generatedAt: new Date()
    };
    
    // In a real app, this would generate and download a PDF report
    console.log('Generating report:', reportData);
    alert('Report generation feature would be implemented here');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Child Monitoring Dashboard</h2>
                <p className="text-blue-100">Keep your children safe and support their digital learning</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={generateReport}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(95vh-120px)]">
          {/* Sidebar - Children List */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Your Children
            </h3>
            <div className="space-y-4">
              {children.map((child) => (
                <div
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedChild === child.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar role={child.role} size="sm" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {child.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Age {child.age} • {getTimeAgo(child.lastActive)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {child.todayStats.aiInteractions}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">Interactions</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {child.todayStats.studyTime}m
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">Study Time</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-green-600">
                        {child.todayStats.wellbeingScore}%
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">Wellbeing</p>
                    </div>
                    <div className="text-center">
                      <p className={`font-medium ${
                        child.todayStats.safetyAlerts > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {child.todayStats.safetyAlerts}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">Alerts</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedChildData && (
              <>
                {/* Child Overview */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar role={selectedChildData.role} size="lg" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {selectedChildData.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {selectedChildData.age} years old • Last active {getTimeAgo(selectedChildData.lastActive)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value as any)}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                      </select>
                      
                      <select
                        value={activityFilter}
                        onChange={(e) => setActivityFilter(e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <option value="all">All Activities</option>
                        <option value="ai_chat">AI Conversations</option>
                        <option value="study_session">Study Sessions</option>
                        <option value="safety_alert">Safety Alerts</option>
                        <option value="wellbeing_check">Wellbeing Checks</option>
                      </select>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 dark:text-blue-400">AI Interactions</p>
                          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                            {selectedChildData.todayStats.aiInteractions}
                          </p>
                        </div>
                        <MessageCircle className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 dark:text-green-400">Study Time</p>
                          <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                            {selectedChildData.todayStats.studyTime}m
                          </p>
                        </div>
                        <Clock className="w-8 h-8 text-green-500" />
                      </div>
                    </div>

                    <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-pink-600 dark:text-pink-400">Wellbeing Score</p>
                          <p className="text-2xl font-bold text-pink-800 dark:text-pink-200">
                            {selectedChildData.todayStats.wellbeingScore}%
                          </p>
                        </div>
                        <Heart className="w-8 h-8 text-pink-500" />
                      </div>
                    </div>

                    <div className={`${
                      selectedChildData.todayStats.safetyAlerts > 0 
                        ? 'bg-red-50 dark:bg-red-900/20' 
                        : 'bg-green-50 dark:bg-green-900/20'
                    } rounded-lg p-4`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm ${
                            selectedChildData.todayStats.safetyAlerts > 0 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-green-600 dark:text-green-400'
                          }`}>
                            Safety Alerts
                          </p>
                          <p className={`text-2xl font-bold ${
                            selectedChildData.todayStats.safetyAlerts > 0 
                              ? 'text-red-800 dark:text-red-200' 
                              : 'text-green-800 dark:text-green-200'
                          }`}>
                            {selectedChildData.todayStats.safetyAlerts}
                          </p>
                        </div>
                        <Shield className={`w-8 h-8 ${
                          selectedChildData.todayStats.safetyAlerts > 0 ? 'text-red-500' : 'text-green-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500" />
                    Activity Timeline ({filteredActivities.length} activities)
                  </h3>
                  
                  {filteredActivities.length === 0 ? (
                    <div className="text-center py-8">
                      <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No activities found for the selected filters
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredActivities.map((activity) => {
                        const IconComponent = getActivityIcon(activity.type);
                        return (
                          <div
                            key={activity.id}
                            className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                          >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type, activity.riskLevel)}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {activity.description}
                                </p>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {getTimeAgo(activity.timestamp)}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="capitalize">
                                  {activity.type.replace('_', ' ')}
                                </span>
                                
                                {activity.duration && (
                                  <span className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {activity.duration}m
                                  </span>
                                )}
                                
                                {activity.subject && (
                                  <span className="flex items-center">
                                    <BookOpen className="w-3 h-3 mr-1" />
                                    {activity.subject}
                                  </span>
                                )}
                                
                                {activity.mood && (
                                  <span className="flex items-center">
                                    <Heart className="w-3 h-3 mr-1" />
                                    {activity.mood}
                                  </span>
                                )}
                                
                                {activity.riskLevel && (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    activity.riskLevel === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                                    activity.riskLevel === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' :
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                  }`}>
                                    {activity.riskLevel} risk
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Monitoring Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Real-time Alerts</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Daily Reports</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Safety Notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Study Progress Updates</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildMonitoring;