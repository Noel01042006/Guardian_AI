import React, { useState, useEffect } from 'react';
import { Heart, Clock, Calendar, Pill, Activity, Plus, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HealthReminderProps {
  onClose: () => void;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'medication' | 'appointment' | 'exercise' | 'checkup' | 'other';
  time: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'once';
  nextDue: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface HealthMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  lastUpdated: Date;
  target?: string;
}

const HealthReminders: React.FC<HealthReminderProps> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('reminders');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [showAddReminder, setShowAddReminder] = useState(false);

  useEffect(() => {
    // Load mock health reminders
    const mockReminders: Reminder[] = [
      {
        id: '1',
        title: 'Take Blood Pressure Medication',
        description: 'Lisinopril 10mg - Take with breakfast',
        type: 'medication',
        time: '08:00',
        frequency: 'daily',
        nextDue: new Date(Date.now() + 2 * 60 * 60 * 1000),
        completed: false,
        priority: 'high'
      },
      {
        id: '2',
        title: 'Doctor Appointment',
        description: 'Annual checkup with Dr. Smith',
        type: 'appointment',
        time: '14:30',
        frequency: 'once',
        nextDue: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        completed: false,
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Morning Walk',
        description: '30-minute walk around the neighborhood',
        type: 'exercise',
        time: '07:00',
        frequency: 'daily',
        nextDue: new Date(Date.now() + 18 * 60 * 60 * 1000),
        completed: true,
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Vitamin D Supplement',
        description: 'Take 1000 IU with lunch',
        type: 'medication',
        time: '12:00',
        frequency: 'daily',
        nextDue: new Date(Date.now() + 6 * 60 * 60 * 1000),
        completed: false,
        priority: 'low'
      }
    ];

    const mockMetrics: HealthMetric[] = [
      {
        id: '1',
        name: 'Blood Pressure',
        value: '128/82',
        unit: 'mmHg',
        status: 'warning',
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
        target: '<120/80'
      },
      {
        id: '2',
        name: 'Heart Rate',
        value: '72',
        unit: 'bpm',
        status: 'good',
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
        target: '60-100'
      },
      {
        id: '3',
        name: 'Weight',
        value: '165',
        unit: 'lbs',
        status: 'good',
        lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000),
        target: '160-170'
      },
      {
        id: '4',
        name: 'Blood Sugar',
        value: '95',
        unit: 'mg/dL',
        status: 'good',
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),
        target: '<100'
      }
    ];

    setReminders(mockReminders);
    setHealthMetrics(mockMetrics);
  }, []);

  const getTypeIcon = (type: string) => {
    const icons = {
      medication: Pill,
      appointment: Calendar,
      exercise: Activity,
      checkup: Heart,
      other: Clock
    };
    return icons[type as keyof typeof icons] || Clock;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      high: 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getMetricStatusColor = (status: string) => {
    const colors = {
      good: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      warning: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      critical: 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[status as keyof typeof colors] || colors.good;
  };

  const toggleReminderComplete = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const upcomingReminders = reminders.filter(r => !r.completed && r.nextDue > new Date());
  const overdueReminders = reminders.filter(r => !r.completed && r.nextDue <= new Date());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Health & Wellness Center</h2>
                <p className="text-green-100">Stay on top of your health with smart reminders and tracking</p>
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
              { id: 'reminders', name: 'Reminders', icon: Bell },
              { id: 'metrics', name: 'Health Metrics', icon: Activity },
              { id: 'calendar', name: 'Health Calendar', icon: Calendar },
              { id: 'settings', name: 'Settings', icon: CheckCircle }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
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
          {/* Reminders Tab */}
          {activeTab === 'reminders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Your Health Reminders</h3>
                <button
                  onClick={() => setShowAddReminder(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Reminder</span>
                </button>
              </div>

              {/* Overdue Reminders */}
              {overdueReminders.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Overdue Reminders ({overdueReminders.length})
                  </h4>
                  <div className="space-y-3">
                    {overdueReminders.map((reminder) => {
                      const TypeIcon = getTypeIcon(reminder.type);
                      return (
                        <div key={reminder.id} className="flex items-center space-x-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPriorityColor(reminder.priority)}`}>
                            <TypeIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 dark:text-white">{reminder.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.description}</p>
                            <p className="text-xs text-red-600">Overdue by {Math.floor((Date.now() - reminder.nextDue.getTime()) / (1000 * 60 * 60))} hours</p>
                          </div>
                          <button
                            onClick={() => toggleReminderComplete(reminder.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                          >
                            Complete
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Upcoming Reminders */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Upcoming Reminders</h4>
                <div className="space-y-4">
                  {upcomingReminders.map((reminder) => {
                    const TypeIcon = getTypeIcon(reminder.type);
                    const timeUntil = Math.floor((reminder.nextDue.getTime() - Date.now()) / (1000 * 60 * 60));
                    return (
                      <div key={reminder.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPriorityColor(reminder.priority)}`}>
                          <TypeIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <p className="font-medium text-gray-800 dark:text-white">{reminder.title}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                              {reminder.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{reminder.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>Due: {reminder.nextDue.toLocaleString()}</span>
                            <span>•</span>
                            <span>In {timeUntil} hours</span>
                            <span>•</span>
                            <span className="capitalize">{reminder.frequency}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleReminderComplete(reminder.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          Mark Done
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Completed Today */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Completed Today</h4>
                <div className="space-y-3">
                  {reminders.filter(r => r.completed).map((reminder) => {
                    const TypeIcon = getTypeIcon(reminder.type);
                    return (
                      <div key={reminder.id} className="flex items-center space-x-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white">{reminder.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.description}</p>
                        </div>
                        <span className="text-sm text-green-600">Completed</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Health Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Health Metrics Dashboard</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric) => (
                  <div key={metric.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-800 dark:text-white">{metric.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMetricStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                        {metric.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{metric.unit}</p>
                      {metric.target && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Target: {metric.target}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Updated {Math.floor((Date.now() - metric.lastUpdated.getTime()) / (1000 * 60 * 60))}h ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-center">
                    <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Log Blood Pressure</span>
                  </button>
                  <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-center">
                    <Activity className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Record Weight</span>
                  </button>
                  <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-center">
                    <Pill className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Log Medication</span>
                  </button>
                  <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Schedule Appointment</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Health Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Health Calendar</h3>
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Calendar View Coming Soon
                  </h4>
                  <p className="text-gray-500 dark:text-gray-500">
                    View all your health appointments and reminders in a calendar format.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Health Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Notification Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Medication Reminders</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Appointment Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Exercise Reminders</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Health Metric Alerts</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Emergency Contacts</h4>
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <p className="font-medium text-gray-800 dark:text-white">Dr. Sarah Johnson</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Primary Care Physician</p>
                      <p className="text-sm text-gray-500">(555) 123-4567</p>
                    </div>
                    <div className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <p className="font-medium text-gray-800 dark:text-white">Emergency Contact</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">John Smith (Son)</p>
                      <p className="text-sm text-gray-500">(555) 987-6543</p>
                    </div>
                    <button className="w-full p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-gray-400 transition-colors">
                      + Add Emergency Contact
                    </button>
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

export default HealthReminders;