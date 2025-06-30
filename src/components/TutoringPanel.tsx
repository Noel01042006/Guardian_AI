import React, { useState } from 'react';
import { GraduationCap, BookOpen, Calculator, Beaker, PenTool, Globe, Lightbulb, Target, Clock } from 'lucide-react';
import { AIService } from '../services/aiService';

const TutoringPanel: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [selectedLevel, setSelectedLevel] = useState<'elementary' | 'middle' | 'high' | 'college'>('high');
  const [learningStyle, setLearningStyle] = useState<'visual' | 'auditory' | 'kinesthetic' | 'reading'>('visual');
  const [question, setQuestion] = useState('');
  const [tutoringResponse, setTutoringResponse] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const aiService = AIService.getInstance();

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: Calculator, color: 'blue' },
    { id: 'science', name: 'Science', icon: Beaker, color: 'green' },
    { id: 'english', name: 'English', icon: PenTool, color: 'purple' },
    { id: 'history', name: 'History', icon: Globe, color: 'orange' }
  ];

  const levels = [
    { id: 'elementary', name: 'Elementary (K-5)', description: 'Basic concepts and fundamentals' },
    { id: 'middle', name: 'Middle School (6-8)', description: 'Intermediate topics and skills' },
    { id: 'high', name: 'High School (9-12)', description: 'Advanced concepts and preparation' },
    { id: 'college', name: 'College Level', description: 'University-level coursework' }
  ];

  const learningStyles = [
    { id: 'visual', name: 'Visual', description: 'Learn through diagrams, charts, and images', icon: '👁️' },
    { id: 'auditory', name: 'Auditory', description: 'Learn through listening and discussion', icon: '👂' },
    { id: 'kinesthetic', name: 'Kinesthetic', description: 'Learn through hands-on activities', icon: '✋' },
    { id: 'reading', name: 'Reading/Writing', description: 'Learn through text and written work', icon: '📖' }
  ];

  const exampleQuestions = {
    mathematics: [
      "How do I solve quadratic equations?",
      "Explain the Pythagorean theorem with examples",
      "What's the difference between mean, median, and mode?",
      "Help me understand derivatives in calculus"
    ],
    science: [
      "Explain photosynthesis step by step",
      "What's the difference between mitosis and meiosis?",
      "How do chemical bonds work?",
      "Explain Newton's laws of motion"
    ],
    english: [
      "How do I write a strong thesis statement?",
      "What are the elements of a good paragraph?",
      "Explain different types of figurative language",
      "How do I analyze a poem?"
    ],
    history: [
      "What caused World War I?",
      "Explain the causes of the American Revolution",
      "What was the impact of the Industrial Revolution?",
      "How did the Renaissance change Europe?"
    ]
  };

  const generateTutoringResponse = async () => {
    if (!question.trim()) return;

    setIsGenerating(true);
    try {
      const response = await aiService.generateTutoringResponse(
        question,
        selectedSubject,
        selectedLevel,
        learningStyle,
        []
      );
      setTutoringResponse(response);
    } catch (error) {
      console.error('Tutoring generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getSubjectColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200',
      orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              AI Tutoring System
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personalized learning assistance for all subjects
            </p>
          </div>
        </div>
      </div>

      {/* Subject Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
          Select Subject
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {subjects.map((subject) => {
            const IconComponent = subject.icon;
            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSubject === subject.id
                    ? `border-${subject.color}-500 ${getSubjectColor(subject.color)}`
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <IconComponent className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{subject.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level and Learning Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
            Education Level
          </h3>
          <div className="space-y-2">
            {levels.map((level) => (
              <label key={level.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="level"
                  value={level.id}
                  checked={selectedLevel === level.id}
                  onChange={(e) => setSelectedLevel(e.target.value as any)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{level.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{level.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
            Learning Style
          </h3>
          <div className="space-y-2">
            {learningStyles.map((style) => (
              <label key={style.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="learningStyle"
                  value={style.id}
                  checked={learningStyle === style.id}
                  onChange={(e) => setLearningStyle(e.target.value as any)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{style.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{style.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{style.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Question Input */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
          Ask Your Question
        </h3>
        <div className="space-y-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like help with? Be specific about what you're struggling with..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />
          
          <div className="flex justify-between items-center">
            <div>
              <select
                onChange={(e) => setQuestion(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="">Select example question...</option>
                {exampleQuestions[selectedSubject as keyof typeof exampleQuestions]?.map((q, index) => (
                  <option key={index} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={generateTutoringResponse}
              disabled={isGenerating || !question.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4" />
                  <span>Get Help</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tutoring Response */}
      {tutoringResponse && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
              Tutoring Response
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Difficulty: {tutoringResponse.difficulty}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{tutoringResponse.estimatedTime}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Main Response */}
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Response:</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {tutoringResponse.response}
              </p>
            </div>

            {/* Explanation */}
            {tutoringResponse.explanation && (
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">📚 Explanation:</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {tutoringResponse.explanation}
                </p>
              </div>
            )}

            {/* Examples */}
            {tutoringResponse.examples && tutoringResponse.examples.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">💡 Examples:</h4>
                <ul className="space-y-2">
                  {tutoringResponse.examples.map((example: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500 font-medium">{index + 1}.</span>
                      <span className="text-gray-700 dark:text-gray-300">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practice Problems */}
            {tutoringResponse.practiceProblems && tutoringResponse.practiceProblems.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">📝 Practice Problems:</h4>
                <ul className="space-y-2">
                  {tutoringResponse.practiceProblems.map((problem: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 font-medium">{index + 1}.</span>
                      <span className="text-gray-700 dark:text-gray-300">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Visual Aids */}
            {tutoringResponse.visualAids && tutoringResponse.visualAids.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">🎨 Visual Learning Tips:</h4>
                <ul className="space-y-1">
                  {tutoringResponse.visualAids.map((aid: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-purple-500">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{aid}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {tutoringResponse.nextSteps && tutoringResponse.nextSteps.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">🎯 Next Steps:</h4>
                <ul className="space-y-1">
                  {tutoringResponse.nextSteps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-orange-500">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources */}
            {tutoringResponse.resources && tutoringResponse.resources.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">📖 Additional Resources:</h4>
                <ul className="space-y-1">
                  {tutoringResponse.resources.map((resource: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Study Tips */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
          <Lightbulb className="w-4 h-4 mr-2" />
          Study Tips for Better Learning
        </h4>
        <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
          <li>• Break complex topics into smaller, manageable chunks</li>
          <li>• Practice regularly rather than cramming before tests</li>
          <li>• Explain concepts in your own words to check understanding</li>
          <li>• Use multiple learning methods (visual, auditory, hands-on)</li>
          <li>• Ask specific questions when you need help</li>
        </ul>
      </div>
    </div>
  );
};

export default TutoringPanel;