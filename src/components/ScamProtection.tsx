import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Clock, TrendingUp, Phone, Mail, Globe, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ScamProtectionProps {
  onClose: () => void;
}

interface ScamAlert {
  id: string;
  type: 'email' | 'phone' | 'text' | 'website';
  title: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  status: 'active' | 'resolved' | 'dismissed';
  source: string;
}

const ScamProtection: React.FC<ScamProtectionProps> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scamAlerts, setScamAlerts] = useState<ScamAlert[]>([]);
  const [protectionScore, setProtectionScore] = useState(92);

  useEffect(() => {
    // Load mock scam alerts
    const mockAlerts: ScamAlert[] = [
      {
        id: '1',
        type: 'email',
        title: 'Suspicious Bank Email Detected',
        description: 'Email claiming to be from your bank asking for account verification. Contains urgent language and suspicious links.',
        riskLevel: 'high',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'active',
        source: 'fake-bank@suspicious-domain.com'
      },
      {
        id: '2',
        type: 'phone',
        title: 'Tech Support Scam Call',
        description: 'Caller claimed to be from Microsoft support saying your computer is infected. Requested remote access.',
        riskLevel: 'critical',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'resolved',
        source: '+1-800-FAKE-NUM'
      },
      {
        id: '3',
        type: 'text',
        title: 'Prize Notification Scam',
        description: 'Text message claiming you won a lottery you never entered. Asks for personal information to claim prize.',
        riskLevel: 'medium',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'dismissed',
        source: 'Unknown Number'
      }
    ];
    setScamAlerts(mockAlerts);
  }, []);

  const getRiskColor = (level: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      high: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      critical: 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[level as keyof typeof colors] || colors.low;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      email: Mail,
      phone: Phone,
      text: Phone,
      website: Globe
    };
    return icons[type as keyof typeof icons] || AlertTriangle;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'dismissed':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    }
  };

  const activeAlerts = scamAlerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = scamAlerts.filter(alert => alert.status === 'resolved');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Scam Protection Center</h2>
                <p className="text-red-100">Stay safe from online threats and fraudulent activities</p>
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
              { id: 'dashboard', name: 'Protection Dashboard', icon: Shield },
              { id: 'alerts', name: 'Active Alerts', icon: AlertTriangle },
              { id: 'education', name: 'Scam Education', icon: Eye },
              { id: 'settings', name: 'Protection Settings', icon: CheckCircle }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600 dark:text-red-400'
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
          {/* Protection Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Protection Score */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Protection Score</h3>
                    <p className="text-gray-600 dark:text-gray-300">Your current safety level</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-green-600">{protectionScore}%</div>
                    <p className="text-sm text-gray-500">Excellent Protection</p>
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${protectionScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Threats Blocked</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">47</p>
                    </div>
                    <Shield className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Alerts</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeAlerts.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Requires attention</p>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last Scan</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">2h ago</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-xs text-blue-600 mt-2">All systems secure</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Protection Activity</h3>
                <div className="space-y-4">
                  {scamAlerts.slice(0, 3).map((alert) => {
                    const TypeIcon = getTypeIcon(alert.type);
                    return (
                      <div key={alert.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRiskColor(alert.riskLevel)}`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white">{alert.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{alert.timestamp.toLocaleString()}</p>
                        </div>
                        {getStatusIcon(alert.status)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Active Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Active Security Alerts ({activeAlerts.length})
                </h3>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Run Security Scan
                </button>
              </div>

              {activeAlerts.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    No Active Threats
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Your protection systems are working well. Stay vigilant!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeAlerts.map((alert) => {
                    const TypeIcon = getTypeIcon(alert.type);
                    return (
                      <div key={alert.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRiskColor(alert.riskLevel)}`}>
                              <TypeIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-gray-800 dark:text-white">{alert.title}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(alert.riskLevel)}`}>
                                  {alert.riskLevel.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-2">{alert.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>Source: {alert.source}</span>
                                <span>•</span>
                                <span>{alert.timestamp.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
                              Mark Safe
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">
                              Block
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Scam Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Scam Education Center</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Email Phishing',
                    description: 'Learn to identify suspicious emails and protect your personal information.',
                    icon: Mail,
                    color: 'from-blue-500 to-purple-600',
                    tips: [
                      'Check sender email address carefully',
                      'Look for spelling and grammar errors',
                      'Hover over links before clicking',
                      'Never provide personal info via email'
                    ]
                  },
                  {
                    title: 'Phone Scams',
                    description: 'Recognize and avoid fraudulent phone calls and voice messages.',
                    icon: Phone,
                    color: 'from-green-500 to-teal-600',
                    tips: [
                      'Never give personal info over the phone',
                      'Hang up on high-pressure tactics',
                      'Verify caller through official channels',
                      'Be wary of urgent requests'
                    ]
                  },
                  {
                    title: 'Online Shopping',
                    description: 'Shop safely online and avoid fraudulent websites and sellers.',
                    icon: CreditCard,
                    color: 'from-orange-500 to-red-600',
                    tips: [
                      'Use secure payment methods',
                      'Check website security certificates',
                      'Read reviews and ratings',
                      'Avoid deals that seem too good to be true'
                    ]
                  },
                  {
                    title: 'Social Media',
                    description: 'Protect yourself from social media scams and fake profiles.',
                    icon: Globe,
                    color: 'from-pink-500 to-purple-600',
                    tips: [
                      'Verify friend requests carefully',
                      'Don\'t click suspicious links',
                      'Keep personal information private',
                      'Report suspicious accounts'
                    ]
                  }
                ].map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{category.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                      <ul className="space-y-2">
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Protection Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Protection Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Email Protection</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Phishing Detection</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Suspicious Link Blocking</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Attachment Scanning</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Call Protection</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Robocall Blocking</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Caller ID Verification</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Scam Call Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Web Protection</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Malicious Site Blocking</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Download Protection</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Safe Browsing Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Notification Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Real-time Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Weekly Reports</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Family Notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScamProtection;