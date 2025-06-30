import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, GraduationCap, Heart, Settings, Trash2, Shield, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react';
import { Message, AIAssistant } from '../types';
import Avatar from './Avatar';
import VoiceRecorder from './VoiceRecorder';
import { useApp } from '../context/AppContext';
import { AIService } from '../services/aiService';

interface ChatInterfaceProps {
  title: string;
  placeholder?: string;
  onMessage?: (message: string) => void;
  selectedAssistant?: AIAssistant;
  availableAssistants?: AIAssistant[];
  onAssistantChange?: (assistant: AIAssistant) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  title, 
  placeholder = "Type your message or use voice...",
  onMessage,
  selectedAssistant,
  availableAssistants = [],
  onAssistantChange
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [showAssistantSelector, setShowAssistantSelector] = useState(false);
  const [scamAlert, setScamAlert] = useState<any>(null);
  const [showTutoringHelp, setShowTutoringHelp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser, speechEnabled } = useApp();
  const aiService = AIService.getInstance();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAssistantIcon = (type: string) => {
    switch (type) {
      case 'tutor':
        return GraduationCap;
      case 'wellbeing':
        return Heart;
      default:
        return Bot;
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (!selectedAssistant || !currentUser) {
      return "I'm here to help! How can I assist you today?";
    }

    try {
      // Enhanced scam detection for vulnerable users
      if (currentUser.role === 'elder' || selectedAssistant.type === 'general') {
        const scamCheck = await aiService.detectScam(userMessage, {
          userRole: currentUser.role,
          channel: 'chat',
          timestamp: new Date()
        });

        if (scamCheck.isScam && scamCheck.riskLevel !== 'low') {
          setScamAlert(scamCheck);
        }
      }

      // Enhanced tutoring for educational assistance
      if (selectedAssistant.type === 'tutor') {
        const subject = detectSubject(userMessage);
        const level = getEducationLevel(currentUser.role);
        
        const tutoringResponse = await aiService.generateTutoringResponse(
          userMessage,
          subject,
          level,
          'visual', // Default learning style
          messages
        );

        return formatTutoringResponse(tutoringResponse);
      }

      // Regular AI response generation
      const response = await aiService.generateResponse(
        userMessage,
        selectedAssistant.type,
        currentUser.role,
        selectedAssistant.name,
        messages
      );
      
      return response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return `I'm ${selectedAssistant.name}, and I'm having trouble processing that right now. Could you try asking again?`;
    }
  };

  const detectSubject = (message: string): string => {
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('math') || messageLower.includes('algebra') || messageLower.includes('geometry') || messageLower.includes('calculus')) {
      return 'mathematics';
    }
    if (messageLower.includes('science') || messageLower.includes('biology') || messageLower.includes('chemistry') || messageLower.includes('physics')) {
      return 'science';
    }
    if (messageLower.includes('english') || messageLower.includes('writing') || messageLower.includes('essay') || messageLower.includes('literature')) {
      return 'english';
    }
    if (messageLower.includes('history') || messageLower.includes('social studies')) {
      return 'history';
    }
    
    return 'general';
  };

  const getEducationLevel = (role: string): 'elementary' | 'middle' | 'high' | 'college' => {
    switch (role) {
      case 'child': return 'elementary';
      case 'teen': return 'high';
      case 'parent': return 'college';
      default: return 'middle';
    }
  };

  const formatTutoringResponse = (response: any): string => {
    let formatted = response.response;
    
    if (response.explanation) {
      formatted += `\n\n📚 **Explanation:** ${response.explanation}`;
    }
    
    if (response.examples && response.examples.length > 0) {
      formatted += `\n\n💡 **Examples:**\n${response.examples.map((ex: string, i: number) => `${i + 1}. ${ex}`).join('\n')}`;
    }
    
    if (response.practiceProblems && response.practiceProblems.length > 0) {
      formatted += `\n\n📝 **Practice Problems:**\n${response.practiceProblems.map((prob: string, i: number) => `${i + 1}. ${prob}`).join('\n')}`;
    }
    
    if (response.nextSteps && response.nextSteps.length > 0) {
      formatted += `\n\n🎯 **Next Steps:**\n${response.nextSteps.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}`;
    }
    
    return formatted;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date(),
      aiAssistantId: selectedAssistant?.id
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsAIThinking(true);
    setScamAlert(null); // Clear any previous alerts
    onMessage?.(text);

    // Simulate AI processing time
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        aiAssistantId: selectedAssistant?.id
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsAIThinking(false);

      // Text-to-speech for AI responses
      if (speechEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputText(transcript);
  };

  const clearChat = () => {
    setMessages([]);
    setScamAlert(null);
  };

  const dismissScamAlert = () => {
    setScamAlert(null);
  };

  const AssistantIcon = selectedAssistant ? getAssistantIcon(selectedAssistant.type) : Bot;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Scam Alert Banner */}
      {scamAlert && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 m-4 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                🚨 Potential Scam Detected
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm mb-3">
                The message you shared shows signs of being a scam. Risk level: <strong>{scamAlert.riskLevel.toUpperCase()}</strong>
              </p>
              <div className="space-y-1 mb-3">
                {scamAlert.warnings.slice(0, 2).map((warning: string, index: number) => (
                  <p key={index} className="text-red-600 dark:text-red-400 text-xs">
                    • {warning}
                  </p>
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={dismissScamAlert}
                  className="text-red-600 dark:text-red-400 text-xs hover:text-red-700 dark:hover:text-red-300 underline"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => alert('Scam details: ' + JSON.stringify(scamAlert, null, 2))}
                  className="text-red-600 dark:text-red-400 text-xs hover:text-red-700 dark:hover:text-red-300 underline"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <AssistantIcon className="w-5 h-5 mr-2 text-blue-500" />
            {selectedAssistant ? `Chat with ${selectedAssistant.name}` : title}
          </h2>
          <div className="flex items-center space-x-2">
            {selectedAssistant?.type === 'tutor' && (
              <button
                onClick={() => setShowTutoringHelp(!showTutoringHelp)}
                className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="Tutoring help"
              >
                <Lightbulb className="w-4 h-4" />
              </button>
            )}
            {availableAssistants.length > 1 && (
              <button
                onClick={() => setShowAssistantSelector(!showAssistantSelector)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Switch assistant"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                aria-label="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {selectedAssistant && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {selectedAssistant.personality}
          </p>
        )}

        {/* Tutoring Help Panel */}
        {showTutoringHelp && selectedAssistant?.type === 'tutor' && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              Tutoring Tips
            </h4>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Be specific about what you're struggling with</li>
              <li>• Ask for step-by-step explanations</li>
              <li>• Request practice problems to reinforce learning</li>
              <li>• Don't hesitate to ask for examples or analogies</li>
              <li>• Let me know your grade level for appropriate explanations</li>
            </ul>
          </div>
        )}

        {showAssistantSelector && availableAssistants.length > 1 && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Switch Assistant:
            </p>
            <div className="space-y-2">
              {availableAssistants.map((assistant) => {
                const Icon = getAssistantIcon(assistant.type);
                return (
                  <button
                    key={assistant.id}
                    onClick={() => {
                      onAssistantChange?.(assistant);
                      setShowAssistantSelector(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-2 rounded-md transition-colors ${
                      selectedAssistant?.id === assistant.id
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <div className="text-left">
                      <p className="text-sm font-medium">{assistant.name}</p>
                      <p className="text-xs opacity-75 capitalize">{assistant.type} Assistant</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <AssistantIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>
              {selectedAssistant 
                ? `Start a conversation with ${selectedAssistant.name}!`
                : 'Start a conversation with your AI assistant!'
              }
            </p>
            {selectedAssistant?.type === 'tutor' && (
              <div className="mt-4 text-sm space-y-1">
                <p className="font-medium">Try asking about:</p>
                <p>• "Help me with algebra equations"</p>
                <p>• "Explain photosynthesis step by step"</p>
                <p>• "How do I write a good essay?"</p>
                <p>• "What's the difference between mitosis and meiosis?"</p>
              </div>
            )}
            {selectedAssistant?.type === 'wellbeing' && (
              <p className="text-sm mt-2">
                Share your feelings, concerns, or anything on your mind.
              </p>
            )}
            {selectedAssistant?.type === 'general' && currentUser?.role === 'elder' && (
              <p className="text-sm mt-2">
                I can help you stay safe online and answer any questions you have.
              </p>
            )}
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {message.sender === 'ai' && (
                <div className="flex-shrink-0">
                  {selectedAssistant ? (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedAssistant.type === 'tutor' ? 'bg-blue-500' :
                      selectedAssistant.type === 'wellbeing' ? 'bg-pink-500' :
                      'bg-teal-500'
                    }`}>
                      <AssistantIcon className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <Avatar role={currentUser?.role || 'parent'} size="sm" />
                  )}
                </div>
              )}
              <div
                className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isAIThinking && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                {selectedAssistant ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedAssistant.type === 'tutor' ? 'bg-blue-500' :
                    selectedAssistant.type === 'wellbeing' ? 'bg-pink-500' :
                    'bg-teal-500'
                  }`}>
                    <AssistantIcon className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <Avatar role={currentUser?.role || 'parent'} size="sm" />
                )}
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col space-y-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder={
                selectedAssistant?.type === 'tutor' ? "Ask about homework, study tips, or any subject..." :
                selectedAssistant?.type === 'wellbeing' ? "Share your feelings or ask for emotional support..." :
                placeholder
              }
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isAIThinking}
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={isAIThinking || !inputText.trim()}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {speechEnabled && (
            <VoiceRecorder onTranscript={handleVoiceTranscript} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;