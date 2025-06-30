import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Clock, TrendingUp } from 'lucide-react';
import { AIService } from '../services/aiService';

const ScamDetectionPanel: React.FC = () => {
  const [testMessage, setTestMessage] = useState('');
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recentScams, setRecentScams] = useState([
    {
      type: 'Financial Fraud',
      count: 15,
      trend: 'up',
      description: 'Fake bank notifications and investment scams'
    },
    {
      type: 'Tech Support',
      count: 8,
      trend: 'down',
      description: 'Fake Microsoft/Apple support calls'
    },
    {
      type: 'Romance Scams',
      count: 12,
      trend: 'up',
      description: 'Social media and dating app scams'
    }
  ]);

  const aiService = AIService.getInstance();

  const analyzeMessage = async () => {
    if (!testMessage.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await aiService.detectScam(testMessage, {
        userRole: 'elder',
        channel: 'email',
        timestamp: new Date()
      });
      setDetectionResult(result);
    } catch (error) {
      console.error('Scam detection error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
      high: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
      critical: 'text-red-600 bg-red-100 dark:bg-red-900/20'
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <XCircle className="w-5 h-5" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const exampleScams = [
    "URGENT: Your account has been suspended. Click here to verify your information immediately or lose access forever!",
    "Congratulations! You've won $50,000 in the Microsoft lottery. Send $500 processing fee to claim your prize.",
    "This is Microsoft Support. Your computer has been infected with malware. Call us immediately at 1-800-FAKE-NUM.",
    "Hi dear, I'm a lonely widow with $2 million inheritance. I need your help to transfer the money safely."
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Advanced Scam Detection
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI-powered protection with real-time threat updates
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Test Message Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Test Scam Detection
        </label>
        <div className="space-y-3">
          <textarea
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Paste a suspicious message here to analyze..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            rows={4}
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <select
                onChange={(e) => setTestMessage(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="">Select example scam...</option>
                {exampleScams.map((scam, index) => (
                  <option key={index} value={scam}>
                    Example {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={analyzeMessage}
              disabled={isAnalyzing || !testMessage.trim()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Detection Results */}
      {detectionResult && (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Detection Results
            </h3>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getSeverityColor(detectionResult.riskLevel)}`}>
              {getSeverityIcon(detectionResult.riskLevel)}
              <span className="text-sm font-medium">
                {detectionResult.riskLevel.toUpperCase()} RISK
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(detectionResult.confidence * 100)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Confidence</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {detectionResult.riskScore}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Risk Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {detectionResult.detectedPatterns.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Threats Found</p>
            </div>
          </div>

          {detectionResult.detectedPatterns.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                Detected Threat Patterns:
              </h4>
              <div className="space-y-2">
                {detectionResult.detectedPatterns.map((pattern: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      pattern.severity === 'critical' ? 'bg-red-500' :
                      pattern.severity === 'high' ? 'bg-orange-500' :
                      pattern.severity === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white capitalize">
                        {pattern.category.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {pattern.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detectionResult.warnings.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                Security Warnings:
              </h4>
              <ul className="space-y-1">
                {detectionResult.warnings.slice(0, 3).map((warning: string, index: number) => (
                  <li key={index} className="text-sm text-red-600 dark:text-red-400 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detectionResult.recommendations.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                Recommended Actions:
              </h4>
              <ul className="space-y-1">
                {detectionResult.recommendations.slice(0, 3).map((rec: string, index: number) => (
                  <li key={index} className="text-sm text-blue-600 dark:text-blue-400 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Recent Threat Trends */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
          Recent Threat Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentScams.map((scam, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800 dark:text-white">{scam.type}</h4>
                <div className={`flex items-center space-x-1 ${
                  scam.trend === 'up' ? 'text-red-500' : 'text-green-500'
                }`}>
                  <span className="text-sm">{scam.count}</span>
                  <TrendingUp className={`w-4 h-4 ${scam.trend === 'down' ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{scam.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Protection Status */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div>
            <h4 className="font-medium text-green-800 dark:text-green-200">
              Protection Status: Active
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              Real-time scam detection is monitoring all your communications. 
              Database last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamDetectionPanel;