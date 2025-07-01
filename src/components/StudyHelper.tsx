import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Calculator, Beaker, PenTool, Globe, Clock, Target, Award, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StudyHelperProps {
  onClose: () => void;
}

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  completed: boolean;
  score?: number;
  timestamp: Date;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  description: string;
}

const StudyHelper: React.FC<StudyHelperProps> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState(10); // hours
  const [weeklyProgress, setWeeklyProgress] = useState(7.5);

  useEffect(() => {
    // Load mock study data
    const mockSessions: StudySession[] = [
      {
        id: '1',
        subject: 'Mathematics',
        topic: 'Quadratic Equations',
        duration: 45,
        completed: true,
        score: 85,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        subject: 'Science',
        topic: 'Photosynthesis',
        duration: 30,
        completed: true,
        score: 92,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        subject: 'English',
        topic: 'Essay Writing',
        duration: 60,
        completed: true,
        score: 78,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      }
    ];

    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Algebra Homework - Chapter 5',
        subject: 'Mathematics',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'pending',
        description: 'Complete exercises 1-20 on quadratic equations'
      },
      {
        id: '2',
        title: 'Science Lab Report',
        subject: 'Science',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        status: 'in-progress',
        description: 'Write lab report on plant cell observation experiment'
      },
      {
        id: '3',
        title: 'History Essay',
        subject: 'History',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        status: 'pending',
        description: 'Write 500-word essay on the Industrial Revolution'
      },
      {
        id: '4',
        title: 'English Reading',
        subject: 'English',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        priority: 'low',
        status: 'completed',
        description: 'Read chapters 5-7 of "To Kill a Mockingbird"'
      }
    ];

    setStudySessions(mockSessions);
    setAssignments(mockAssignments);
  }, []);

  const getSubjectIcon = (subject: string) => {
    const icons = {
      Mathematics: Calculator,
      Science: Beaker,
      English: PenTool,
      History: Globe,
      default: BookOpen
    };
    return icons[subject as keyof typeof icons] || icons.default;
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      Mathematics: 'from-blue-500 to-purple-600',
      Science: 'from-green-500 to-teal-600',
      English: 'from-purple-500 to-pink-600',
      History: 'from-orange-500 to-red-600',
      default: 'from-gray-500 to-gray-600'
    };
    return colors[subject as keyof typeof colors] || colors.default;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      high: 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'text-gray-600 bg-gray-100 dark:bg-gray-900/20',
      'in-progress': 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
      completed: 'text-green-600 bg-green-100 dark:bg-green-900/20'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const inProgressAssignments = assignments.filter(a => a.status === 'in-progress');
  const completedAssignments = assignments.filter(a => a.status === 'completed');

  const averageScore = studySessions.reduce((sum, session) => sum + (session.score || 0), 0) / studySessions.length;
  const totalStudyTime = studySessions.reduce((sum, session) => sum + session.duration, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Study Helper Center</h2>
                <p className="text-blue-100">Your personal academic companion for success</p>
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
              { id: 'dashboard', name: 'Study Dashboard', icon: TrendingUp },
              { id: 'assignments', name: 'Assignments', icon: BookOpen },
              { id: 'subjects', name: 'Subject Help', icon: GraduationCap },
              { id: 'progress', name: 'Progress Tracking', icon: Award }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
          {/* Study Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Weekly Progress */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Weekly Study Goal</h3>
                    <p className="text-gray-600 dark:text-gray-300">Keep up the great work!</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{weeklyProgress}h</div>
                    <p className="text-sm text-gray-500">of {weeklyGoal}h goal</p>
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(weeklyProgress / weeklyGoal) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {weeklyGoal - weeklyProgress > 0 ? `${(weeklyGoal - weeklyProgress).toFixed(1)} hours remaining` : 'Goal achieved! 🎉'}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{averageScore.toFixed(0)}%</p>
                    </div>
                    <Award className="w-8 h-8 text-yellow-500" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">↑ 5% from last week</p>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Study Time</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{Math.floor(totalStudyTime / 60)}h</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">This week</p>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Assignments Due</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{pendingAssignments.length}</p>
                    </div>
                    <Target className="w-8 h-8 text-orange-500" />
                  </div>
                  <p className="text-xs text-orange-600 mt-2">Next 7 days</p>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{completedAssignments.length}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xs text-green-600 mt-2">This week</p>
                </div>
              </div>

              {/* Recent Study Sessions */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Study Sessions</h3>
                <div className="space-y-4">
                  {studySessions.slice(0, 3).map((session) => {
                    const SubjectIcon = getSubjectIcon(session.subject);
                    return (
                      <div key={session.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getSubjectColor(session.subject)} rounded-lg flex items-center justify-center`}>
                          <SubjectIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white">{session.topic}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{session.subject}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>{session.duration} minutes</span>
                            <span>•</span>
                            <span>{session.timestamp.toLocaleDateString()}</span>
                          </div>
                        </div>
                        {session.score && (
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{session.score}%</p>
                            <p className="text-xs text-gray-500">Score</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Assignment Tracker</h3>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Add Assignment
                </button>
              </div>

              {/* Pending Assignments */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-orange-500" />
                  Pending Assignments ({pendingAssignments.length})
                </h4>
                <div className="space-y-4">
                  {pendingAssignments.map((assignment) => {
                    const SubjectIcon = getSubjectIcon(assignment.subject);
                    const daysUntilDue = Math.ceil((assignment.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={assignment.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getSubjectColor(assignment.subject)} rounded-lg flex items-center justify-center`}>
                          <SubjectIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <p className="font-medium text-gray-800 dark:text-white">{assignment.title}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                              {assignment.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{assignment.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                            <span>•</span>
                            <span className={daysUntilDue <= 1 ? 'text-red-600' : daysUntilDue <= 3 ? 'text-orange-600' : ''}>
                              {daysUntilDue} days left
                            </span>
                          </div>
                        </div>
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
                          Start
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* In Progress Assignments */}
              {inProgressAssignments.length > 0 && (
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    In Progress ({inProgressAssignments.length})
                  </h4>
                  <div className="space-y-4">
                    {inProgressAssignments.map((assignment) => {
                      const SubjectIcon = getSubjectIcon(assignment.subject);
                      return (
                        <div key={assignment.id} className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <div className={`w-10 h-10 bg-gradient-to-r ${getSubjectColor(assignment.subject)} rounded-lg flex items-center justify-center`}>
                            <SubjectIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 dark:text-white">{assignment.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.description}</p>
                          </div>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                            Continue
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Completed Assignments */}
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-500" />
                  Completed This Week ({completedAssignments.length})
                </h4>
                <div className="space-y-3">
                  {completedAssignments.map((assignment) => {
                    const SubjectIcon = getSubjectIcon(assignment.subject);
                    return (
                      <div key={assignment.id} className="flex items-center space-x-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className={`w-8 h-8 bg-gradient-to-r ${getSubjectColor(assignment.subject)} rounded-lg flex items-center justify-center`}>
                          <SubjectIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white">{assignment.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.subject}</p>
                        </div>
                        <span className="text-sm text-green-600 font-medium">Completed</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Subject Help Tab */}
          {activeTab === 'subjects' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Subject-Specific Help</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    subject: 'Mathematics',
                    icon: Calculator,
                    color: 'from-blue-500 to-purple-600',
                    topics: ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
                    description: 'Get step-by-step solutions and explanations for math problems'
                  },
                  {
                    subject: 'Science',
                    icon: Beaker,
                    color: 'from-green-500 to-teal-600',
                    topics: ['Biology', 'Chemistry', 'Physics', 'Earth Science'],
                    description: 'Explore scientific concepts with interactive explanations'
                  },
                  {
                    subject: 'English',
                    icon: PenTool,
                    color: 'from-purple-500 to-pink-600',
                    topics: ['Grammar', 'Writing', 'Literature', 'Reading Comprehension'],
                    description: 'Improve your writing and reading skills with personalized feedback'
                  },
                  {
                    subject: 'History',
                    icon: Globe,
                    color: 'from-orange-500 to-red-600',
                    topics: ['World History', 'US History', 'Government', 'Geography'],
                    description: 'Learn about historical events and their significance'
                  }
                ].map((subject) => {
                  const IconComponent = subject.icon;
                  return (
                    <div key={subject.subject} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{subject.subject}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{subject.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular Topics:</p>
                        <div className="flex flex-wrap gap-2">
                          {subject.topics.map((topic) => (
                            <span key={topic} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                        Get Help with {subject.subject}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Progress Tracking Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Progress Tracking</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Subject Performance</h4>
                  <div className="space-y-4">
                    {['Mathematics', 'Science', 'English', 'History'].map((subject) => {
                      const score = Math.floor(Math.random() * 30) + 70;
                      return (
                        <div key={subject}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-300">{subject}</span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">{score}%</span>
                          </div>
                          <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Study Streak</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">12</div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Days in a row</p>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 14 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded ${
                            i < 12 ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Last 2 weeks</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Achievement Badges</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Math Master', icon: '🧮', earned: true },
                    { name: 'Science Explorer', icon: '🔬', earned: true },
                    { name: 'Writing Wizard', icon: '✍️', earned: false },
                    { name: 'History Buff', icon: '📚', earned: true },
                    { name: 'Study Streak', icon: '🔥', earned: true },
                    { name: 'Perfect Score', icon: '💯', earned: false },
                    { name: 'Early Bird', icon: '🌅', earned: true },
                    { name: 'Night Owl', icon: '🦉', earned: false }
                  ].map((badge) => (
                    <div
                      key={badge.name}
                      className={`p-4 rounded-lg text-center ${
                        badge.earned 
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' 
                          : 'bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{badge.icon}</div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{badge.name}</p>
                      {badge.earned && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Earned!</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyHelper;