import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Coffee, Target, Award, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PomodoroTimerProps {
  onClose: () => void;
}

interface PomodoroSession {
  id: string;
  type: 'work' | 'short_break' | 'long_break';
  duration: number;
  completedAt: Date;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'work' | 'short_break' | 'long_break'>('work');
  const [completedSessions, setCompletedSessions] = useState<PomodoroSession[]>([]);
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(8); // 8 pomodoros per day

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    // Load completed sessions from localStorage
    const saved = localStorage.getItem(`pomodoro_${currentUser?.id}`);
    if (saved) {
      const sessions = JSON.parse(saved).map((s: any) => ({
        ...s,
        completedAt: new Date(s.completedAt)
      }));
      setCompletedSessions(sessions);
    }
  }, [currentUser]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    // Play notification sound (if available)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        currentSession === 'work' ? 'Work session complete! Time for a break.' : 'Break time is over! Ready to focus?'
      );
      speechSynthesis.speak(utterance);
    }

    // Save completed session
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      type: currentSession,
      duration: getDurationForSession(currentSession),
      completedAt: new Date()
    };

    const updatedSessions = [...completedSessions, newSession];
    setCompletedSessions(updatedSessions);
    localStorage.setItem(`pomodoro_${currentUser?.id}`, JSON.stringify(updatedSessions));

    // Auto-switch to next session type
    if (currentSession === 'work') {
      const workSessionsToday = getTodayWorkSessions();
      const nextSession = (workSessionsToday + 1) % 4 === 0 ? 'long_break' : 'short_break';
      setCurrentSession(nextSession);
      setTimeLeft(getDurationForSession(nextSession) * 60);
    } else {
      setCurrentSession('work');
      setTimeLeft(workDuration * 60);
    }
  };

  const getDurationForSession = (session: 'work' | 'short_break' | 'long_break'): number => {
    switch (session) {
      case 'work': return workDuration;
      case 'short_break': return shortBreakDuration;
      case 'long_break': return longBreakDuration;
    }
  };

  const getTodayWorkSessions = (): number => {
    const today = new Date().toDateString();
    return completedSessions.filter(
      session => session.type === 'work' && session.completedAt.toDateString() === today
    ).length;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDurationForSession(currentSession) * 60);
  };

  const switchSession = (session: 'work' | 'short_break' | 'long_break') => {
    setIsRunning(false);
    setCurrentSession(session);
    setTimeLeft(getDurationForSession(session) * 60);
  };

  const getSessionColor = (session: string) => {
    switch (session) {
      case 'work':
        return 'from-red-500 to-pink-500';
      case 'short_break':
        return 'from-green-500 to-teal-500';
      case 'long_break':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getSessionIcon = (session: string) => {
    switch (session) {
      case 'work':
        return Target;
      case 'short_break':
        return Coffee;
      case 'long_break':
        return Coffee;
      default:
        return Clock;
    }
  };

  const todayWorkSessions = getTodayWorkSessions();
  const progressPercentage = (todayWorkSessions / dailyGoal) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getSessionColor(currentSession)} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Pomodoro Timer</h2>
                <p className="text-white/80 capitalize">{currentSession.replace('_', ' ')} Session</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
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

        <div className="p-6">
          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-r ${getSessionColor(currentSession)} flex items-center justify-center mb-6 relative`}>
              <div className="w-44 h-44 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {currentSession.replace('_', ' ')}
                  </div>
                </div>
              </div>
              
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-white/20"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (timeLeft / (getDurationForSession(currentSession) * 60))}`}
                  className="text-white transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleTimer}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  isRunning
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isRunning ? 'Pause' : 'Start'}</span>
              </button>
              
              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Session Switcher */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { type: 'work', name: 'Focus', duration: workDuration },
              { type: 'short_break', name: 'Short Break', duration: shortBreakDuration },
              { type: 'long_break', name: 'Long Break', duration: longBreakDuration }
            ].map((session) => (
              <button
                key={session.type}
                onClick={() => switchSession(session.type as any)}
                className={`p-3 rounded-lg text-center transition-all ${
                  currentSession === session.type
                    ? `bg-gradient-to-r ${getSessionColor(session.type)} text-white`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="text-sm font-medium">{session.name}</div>
                <div className="text-xs opacity-75">{session.duration}m</div>
              </button>
            ))}
          </div>

          {/* Daily Progress */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-white">Today's Progress</h3>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {todayWorkSessions}/{dailyGoal}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {dailyGoal - todayWorkSessions > 0 
                ? `${dailyGoal - todayWorkSessions} sessions remaining` 
                : 'Daily goal achieved! 🎉'
              }
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{todayWorkSessions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sessions Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.floor(todayWorkSessions * workDuration / 60)}h {(todayWorkSessions * workDuration) % 60}m
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Focus Time</div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute inset-0 bg-white dark:bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Timer Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Work Session Duration
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="15"
                    max="60"
                    value={workDuration}
                    onChange={(e) => setWorkDuration(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                    {workDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Break Duration
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={shortBreakDuration}
                    onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                    {shortBreakDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Long Break Duration
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="15"
                    max="30"
                    value={longBreakDuration}
                    onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                    {longBreakDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Daily Goal (Sessions)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                    {dailyGoal}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setTimeLeft(getDurationForSession(currentSession) * 60);
                  setShowSettings(false);
                }}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Apply Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;