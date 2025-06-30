import React, { useState, useEffect } from 'react';
import { Users, Shield, TrendingUp, AlertTriangle, Calendar, Activity, Heart, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FamilyMember, ActivityReport, SafetyAlert } from '../types';
import Avatar from './Avatar';

interface FamilyDashboardProps {
  onManageFamily: () => void;
}

const FamilyDashboard: React.FC<FamilyDashboardProps> = ({ onManageFamily }) => {
  const { currentUser } = useApp();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [activityReports, setActivityReports] = useState<ActivityReport[]>([]);
  const [safetyAlerts, setSafetyAlerts] = useState<SafetyAlert[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  useEffect(() => {
    loadFamilyData();
  }, [currentUser]);

  const loadFamilyData = () => {
    // Load family members
    const savedMembers = localStorage.getItem(`family_${currentUser?.id}`);
    if (savedMembers) {
      setFamilyMembers(JSON.parse(savedMembers));
    }

    // Generate mock activity reports
    const mockReports: ActivityReport[] = [
      {
        id: '1',
        userId: 'teen-1',
        date: new Date(),
        aiInteractions: 15,
        safetyAlerts: 1,
        studyTime: 120,
        wellbeingScore: 85,
        summary: 'Good study session with math tutor, one minor privacy alert resolved'
      },
      {
        id: '2',
        userId: 'child-1',
        date: new Date(),
        aiInteractions: 8,
        safetyAlerts: 0,
        studyTime: 45,
        wellbeingScore: 92,
        summary: 'Safe learning activities, positive emotional wellbeing'
      }
    ];
    setActivityReports(mockReports);

    // Generate mock safety alerts
    const mockAlerts: SafetyAlert[] = [
      {
        id: '1',
        userId: 'teen-1',
        type: 'privacy_risk',
        severity: 'medium',
        description: 'Attempted to share personal information in chat',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        resolved: true,
        parentNotified: true
      },
      {
        id: '2',
        userId: 'elder-1',
        type: 'scam',
        severity: 'high',
        description: 'Suspicious email detected with phishing indicators',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        resolved: false,
        parentNotified: true
      }
    ];
    setSafetyAlerts(mockAlerts);
  };

  const getActiveMembers = () => familyMembers.filter(member => member.status === 'active');
  const getPendingInvitations = () => familyMembers.filter(member => member.status === 'invited');
  const getUnresolvedAlerts = () => safetyAlerts.filter(alert => !alert.resolved);

  const getSeverityColor = (severity: SafetyAlert['severity']) => {
    const colors = {
      low: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-300',
      medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300',
      high: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300',
      critical: 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-300'
    };
    return colors[severity];
  };

  const getAlertTypeIcon = (type: SafetyAlert['type']) => {
    const icons = {
      scam: Shield,
      inappropriate_content: AlertTriangle,
      cyberbullying: Heart,
      privacy_risk: Users
    };
    return icons[type] || AlertTriangle;
  };

  const calculateFamilySafetyScore = () => {
    const totalMembers = getActiveMembers().length;
    const unresolvedAlerts = getUnresolvedAlerts().length;
    const criticalAlerts = safetyAlerts.filter(alert => alert.severity === 'critical' && !alert.resolved).length;
    
    let score = 100;
    score -= unresolvedAlerts * 5;
    score -= criticalAlerts * 15;
    
    return Math.max(score, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Family Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300">Monitor your family's digital safety and wellbeing</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month')}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button
            onClick={onManageFamily}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Manage Family</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Members</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{getActiveMembers().length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          {getPendingInvitations().length > 0 && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
              {getPendingInvitations().length} pending invitation(s)
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Safety Score</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{calculateFamilySafetyScore()}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Based on recent activity
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{getUnresolvedAlerts().length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Require attention
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI Interactions</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {activityReports.reduce((sum, report) => sum + report.aiInteractions, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            This {selectedPeriod}
          </p>
        </div>
      </div>

      {/* Family Members Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Family Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getActiveMembers().map((member) => {
            const memberReport = activityReports.find(report => report.userId === member.id);
            const memberAlerts = safetyAlerts.filter(alert => alert.userId === member.id && !alert.resolved);
            
            return (
              <div key={member.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar role={member.role} size="sm" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{member.role}</p>
                  </div>
                </div>
                
                {memberReport && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">AI Interactions:</span>
                      <span className="text-gray-800 dark:text-white">{memberReport.aiInteractions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Wellbeing Score:</span>
                      <span className="text-gray-800 dark:text-white">{memberReport.wellbeingScore}%</span>
                    </div>
                    {memberReport.studyTime > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Study Time:</span>
                        <span className="text-gray-800 dark:text-white">{memberReport.studyTime}min</span>
                      </div>
                    )}
                  </div>
                )}
                
                {memberAlerts.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-orange-600 dark:text-orange-400">
                      {memberAlerts.length} active alert(s)
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Safety Alerts */}
      {safetyAlerts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Safety Alerts</h3>
          <div className="space-y-4">
            {safetyAlerts.slice(0, 5).map((alert) => {
              const member = familyMembers.find(m => m.id === alert.userId);
              const AlertIcon = getAlertTypeIcon(alert.type);
              
              return (
                <div key={alert.id} className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                    <AlertIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {member?.name || 'Unknown Member'}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        {alert.resolved ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full text-xs font-medium">
                            Resolved
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-full text-xs font-medium">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{alert.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {alert.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Activity Summary</h3>
        <div className="space-y-4">
          {activityReports.map((report) => {
            const member = familyMembers.find(m => m.id === report.userId);
            return (
              <div key={report.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Avatar role={member?.role || 'child'} size="sm" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white">{member?.name || 'Unknown Member'}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{report.summary}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    Wellbeing: {report.wellbeingScore}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {report.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboard;