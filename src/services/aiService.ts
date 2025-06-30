// Enhanced AI service with advanced capabilities
export class AIService {
  private static instance: AIService;
  private apiKey: string | null = null;
  private scamDatabase: any[] = [];
  private lastDatabaseUpdate: Date = new Date();

  private constructor() {
    // In production, get this from environment variables
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    this.initializeScamDatabase();
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private initializeScamDatabase() {
    // Initialize with comprehensive scam patterns
    this.scamDatabase = [
      // Financial Scams
      { pattern: /urgent.{0,20}action.{0,20}required/i, category: 'financial_fraud', severity: 'high' },
      { pattern: /account.{0,20}suspended/i, category: 'financial_fraud', severity: 'high' },
      { pattern: /verify.{0,20}account/i, category: 'phishing', severity: 'medium' },
      { pattern: /click.{0,20}here.{0,20}now/i, category: 'phishing', severity: 'medium' },
      { pattern: /limited.{0,20}time.{0,20}offer/i, category: 'financial_fraud', severity: 'low' },
      
      // Prize/Lottery Scams
      { pattern: /congratulations.{0,30}won/i, category: 'lottery_scam', severity: 'high' },
      { pattern: /lottery.{0,20}winner/i, category: 'lottery_scam', severity: 'high' },
      { pattern: /claim.{0,20}prize/i, category: 'lottery_scam', severity: 'medium' },
      
      // Tech Support Scams
      { pattern: /microsoft.{0,20}support/i, category: 'tech_support', severity: 'high' },
      { pattern: /computer.{0,20}infected/i, category: 'tech_support', severity: 'high' },
      { pattern: /virus.{0,20}detected/i, category: 'tech_support', severity: 'medium' },
      
      // Romance Scams
      { pattern: /lonely.{0,20}widow/i, category: 'romance_scam', severity: 'high' },
      { pattern: /inheritance.{0,20}money/i, category: 'inheritance_scam', severity: 'high' },
      { pattern: /need.{0,20}help.{0,20}transfer/i, category: 'advance_fee', severity: 'medium' },
      
      // Government/Authority Scams
      { pattern: /irs.{0,20}final.{0,20}notice/i, category: 'government_impersonation', severity: 'critical' },
      { pattern: /social.{0,20}security.{0,20}suspended/i, category: 'government_impersonation', severity: 'critical' },
      { pattern: /tax.{0,20}refund/i, category: 'government_impersonation', severity: 'medium' },
      
      // Cryptocurrency/Investment Scams
      { pattern: /bitcoin.{0,20}investment/i, category: 'crypto_scam', severity: 'high' },
      { pattern: /guaranteed.{0,20}returns/i, category: 'investment_scam', severity: 'high' },
      { pattern: /cryptocurrency.{0,20}opportunity/i, category: 'crypto_scam', severity: 'medium' },
      
      // Charity Scams
      { pattern: /urgent.{0,20}donation/i, category: 'charity_scam', severity: 'medium' },
      { pattern: /disaster.{0,20}relief/i, category: 'charity_scam', severity: 'low' },
      
      // Employment Scams
      { pattern: /work.{0,20}from.{0,20}home/i, category: 'employment_scam', severity: 'low' },
      { pattern: /easy.{0,20}money/i, category: 'employment_scam', severity: 'medium' },
      { pattern: /no.{0,20}experience.{0,20}required/i, category: 'employment_scam', severity: 'low' }
    ];
    
    this.lastDatabaseUpdate = new Date();
  }

  private updateScamDatabase() {
    // Simulate database updates every 24 hours
    const now = new Date();
    const hoursSinceUpdate = (now.getTime() - this.lastDatabaseUpdate.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceUpdate >= 24) {
      // In production, this would fetch latest patterns from a threat intelligence service
      console.log('🔄 Updating scam detection database...');
      this.lastDatabaseUpdate = now;
    }
  }

  async generateResponse(
    message: string, 
    assistantType: 'tutor' | 'wellbeing' | 'general',
    userRole: string,
    assistantName: string,
    conversationHistory: any[] = []
  ): Promise<string> {
    // Enhanced AI response generation with context awareness
    const context = this.analyzeContext(message, conversationHistory, userRole);
    const intent = this.detectIntent(message, assistantType);
    const emotion = this.detectEmotion(message);
    
    // Generate contextual response based on multiple factors
    return this.generateContextualResponse(
      message, 
      assistantType, 
      userRole, 
      assistantName, 
      context, 
      intent, 
      emotion,
      conversationHistory
    );
  }

  private analyzeContext(message: string, history: any[], userRole: string) {
    return {
      messageLength: message.length,
      hasQuestion: message.includes('?'),
      isFollowUp: history.length > 0,
      userRole,
      timeOfDay: new Date().getHours(),
      recentTopics: this.extractRecentTopics(history)
    };
  }

  private detectIntent(message: string, assistantType: string) {
    const messageLower = message.toLowerCase();
    
    const intents = {
      help_request: /help|assist|support|need/i.test(message),
      question: message.includes('?'),
      explanation: /explain|what is|how does|why/i.test(message),
      problem_solving: /problem|issue|stuck|difficult/i.test(message),
      emotional_support: /feel|sad|happy|angry|worried|stressed/i.test(message),
      learning: /learn|study|understand|teach/i.test(message)
    };
    
    return Object.entries(intents)
      .filter(([_, matches]) => matches)
      .map(([intent, _]) => intent);
  }

  private detectEmotion(message: string) {
    const emotionPatterns = {
      frustrated: /frustrated|annoyed|irritated|fed up/i,
      confused: /confused|don't understand|unclear|lost/i,
      excited: /excited|amazing|awesome|great|love/i,
      worried: /worried|concerned|anxious|nervous/i,
      sad: /sad|down|depressed|upset/i,
      happy: /happy|joy|pleased|glad/i
    };
    
    for (const [emotion, pattern] of Object.entries(emotionPatterns)) {
      if (pattern.test(message)) {
        return emotion;
      }
    }
    
    return 'neutral';
  }

  private extractRecentTopics(history: any[]) {
    return history.slice(-3).map(msg => {
      const content = msg.content.toLowerCase();
      if (content.includes('math') || content.includes('algebra')) return 'mathematics';
      if (content.includes('science') || content.includes('biology')) return 'science';
      if (content.includes('english') || content.includes('writing')) return 'english';
      if (content.includes('history')) return 'history';
      return 'general';
    });
  }

  private async generateContextualResponse(
    message: string,
    assistantType: string,
    userRole: string,
    assistantName: string,
    context: any,
    intents: string[],
    emotion: string,
    history: any[]
  ): Promise<string> {
    
    // Enhanced response generation based on context
    if (assistantType === 'tutor') {
      return this.generateTutoringResponse(message, context, intents, emotion, assistantName, history);
    } else if (assistantType === 'wellbeing') {
      return this.generateWellbeingResponse(message, userRole, context, emotion, assistantName, history);
    } else {
      return this.generateGeneralResponse(message, userRole, context, intents, assistantName, history);
    }
  }

  private generateTutoringResponse(message: string, context: any, intents: string[], emotion: string, assistantName: string, history: any[]): string {
    const messageLower = message.toLowerCase();
    
    // Subject-specific responses
    if (messageLower.includes('math') || messageLower.includes('algebra') || messageLower.includes('geometry')) {
      if (intents.includes('problem_solving')) {
        return `Hi! I'm ${assistantName}, your math tutor. I can see you're working on a math problem. Let me help you break this down step by step. First, can you tell me exactly which part is giving you trouble? I'll guide you through the solution process so you understand each step.`;
      }
      return `Hello! I'm ${assistantName}, and I love helping with mathematics! Whether it's algebra, geometry, or any other math topic, I'm here to make it clearer. What specific math concept would you like to explore today?`;
    }
    
    if (messageLower.includes('science') || messageLower.includes('biology') || messageLower.includes('chemistry') || messageLower.includes('physics')) {
      return `Hi there! I'm ${assistantName}, your science guide. Science is all about understanding how our world works! Let's explore this topic together. I'll explain the concepts clearly and give you real-world examples to make it stick. What would you like to learn about?`;
    }
    
    if (messageLower.includes('english') || messageLower.includes('writing') || messageLower.includes('essay')) {
      return `Hello! I'm ${assistantName}, your writing companion. Great writing is about clear thinking and good structure. Whether you're working on an essay, story, or any writing project, I'll help you organize your thoughts and express them effectively. What are you writing about?`;
    }
    
    if (messageLower.includes('history')) {
      return `Hi! I'm ${assistantName}, your history explorer. History isn't just dates and names - it's the fascinating story of how we got to where we are today! I'll help you understand the connections and make history come alive. What period or event interests you?`;
    }
    
    // Emotion-based responses
    if (emotion === 'frustrated') {
      return `I'm ${assistantName}, and I can sense you're feeling frustrated with this material. That's completely normal - learning can be challenging! Let's take this one small step at a time. I'm here to support you, and we'll figure this out together. What specific part is causing the most trouble?`;
    }
    
    if (emotion === 'confused') {
      return `Hi! I'm ${assistantName}, and I understand you're feeling confused. Confusion is actually a good sign - it means you're thinking deeply about the material! Let me help clarify things. Can you tell me what you understand so far, and where you started to feel lost?`;
    }
    
    // General tutoring response
    return `Hello! I'm ${assistantName}, your personal tutor, and I'm excited to help you learn! I believe every student can succeed with the right support and approach. Whether you need help with homework, want to understand a concept better, or are preparing for a test, I'm here to guide you. What subject or topic would you like to work on today?`;
  }

  private generateWellbeingResponse(message: string, userRole: string, context: any, emotion: string, assistantName: string, history: any[]): string {
    // Role-specific wellbeing responses
    const roleResponses = {
      elder: {
        worried: `Hello, I'm ${assistantName}. I can hear the concern in your message, and I want you to know that your feelings are completely valid. At this stage of life, it's natural to have worries. Would you like to talk about what's on your mind? Sometimes sharing our concerns can help lighten the load.`,
        sad: `I'm ${assistantName}, and I'm here to listen. Sadness is a natural part of life, and it's okay to feel this way. You've experienced so much in your life, and your feelings matter. Would you like to share what's making you feel sad today?`,
        default: `Hello, I'm ${assistantName}, your compassionate companion. I'm here to support your emotional wellbeing with understanding and care. How are you feeling today, and what's on your heart?`
      },
      teen: {
        frustrated: `Hey, I'm ${assistantName}. I totally get that you're feeling frustrated - being a teenager can be incredibly overwhelming sometimes. Your feelings are completely valid, and you're not alone in this. Want to tell me what's going on?`,
        confused: `Hi! I'm ${assistantName}, and I understand that feeling confused about life is super common during the teen years. There's so much changing and so many decisions to make. I'm here to help you sort through your thoughts. What's been on your mind?`,
        excited: `Hi there! I'm ${assistantName}, and I love your positive energy! It's wonderful when we feel excited about life. I'd love to hear what's making you feel so great today!`,
        default: `Hey! I'm ${assistantName}, and I'm here to support you through all the ups and downs of being a teenager. Your mental health matters, and I'm here to listen without judgment. How are you doing today?`
      },
      child: {
        sad: `Hi sweetie! I'm ${assistantName}, and I can see you're feeling sad. It's okay to feel sad sometimes - all feelings are okay to have. Would you like to tell me what happened that made you feel this way? I'm here to help you feel better.`,
        worried: `Hello! I'm ${assistantName}, and I notice you seem worried about something. When we feel worried, it can help to talk about it. You're very brave for sharing your feelings. What's making you feel worried?`,
        happy: `Hi there! I'm ${assistantName}, and I can tell you're feeling happy! That makes me happy too! Happy feelings are wonderful. What's making you feel so good today?`,
        default: `Hi! I'm ${assistantName}, and I'm here to help you with your feelings. All feelings are okay, and it's good to talk about them. How are you feeling today?`
      },
      parent: {
        stressed: `Hello, I'm ${assistantName}. I can sense you're feeling stressed, and I want you to know that parenting stress is incredibly common. You're doing an important and challenging job. Let's talk about what's weighing on you - sometimes just expressing these feelings can provide relief.`,
        worried: `I'm ${assistantName}, and I understand your concern. Worrying about our children is part of being a caring parent. Your love for your family is evident. Would you like to share what's concerning you? Sometimes talking through our worries can help us find clarity.`,
        default: `Hello, I'm ${assistantName}. Parenting is one of the most rewarding yet challenging roles in life. I'm here to support your emotional wellbeing as you navigate this journey. How are you feeling today, and how can I help?`
      }
    };
    
    const responses = roleResponses[userRole as keyof typeof roleResponses] || roleResponses.parent;
    return responses[emotion as keyof typeof responses] || responses.default;
  }

  private generateGeneralResponse(message: string, userRole: string, context: any, intents: string[], assistantName: string, history: any[]): string {
    const messageLower = message.toLowerCase();
    
    // Role-specific general responses
    if (userRole === 'elder') {
      if (messageLower.includes('scam') || messageLower.includes('suspicious') || messageLower.includes('fraud')) {
        return `Hello, I'm ${assistantName}, your digital safety guardian. I'm glad you're being cautious about potential scams - that's exactly the right approach! Can you tell me more about what you've encountered? I'll help you determine if it's legitimate and guide you on the safest course of action.`;
      }
      
      if (messageLower.includes('technology') || messageLower.includes('computer') || messageLower.includes('phone')) {
        return `Hi! I'm ${assistantName}, and I'm here to help you navigate technology safely and confidently. Technology should make your life easier, not more complicated. What device or technology question can I help you with today?`;
      }
      
      return `Hello! I'm ${assistantName}, your helpful AI companion. I'm here to assist you with any questions you have, help keep you safe online, and make technology work for you. What would you like to know about today?`;
    }
    
    if (userRole === 'teen') {
      if (messageLower.includes('career') || messageLower.includes('future') || messageLower.includes('college')) {
        return `Hey! I'm ${assistantName}, and I love talking about future possibilities! The teen years are such an exciting time to explore different paths and discover your interests. Whether you're thinking about college, careers, or just figuring out your next steps, I'm here to help you explore your options. What's on your mind about your future?`;
      }
      
      if (messageLower.includes('social') || messageLower.includes('friends') || messageLower.includes('relationship')) {
        return `Hi! I'm ${assistantName}, and I understand that social relationships are super important during the teen years. Navigating friendships, family relationships, and social situations can be complex. I'm here to help you think through social challenges and build healthy relationships. What's going on socially for you?`;
      }
      
      return `Hey there! I'm ${assistantName}, your AI companion who gets that being a teenager is both exciting and challenging. I'm here to chat about whatever's on your mind - school, friends, future plans, or just life in general. What would you like to talk about today?`;
    }
    
    if (userRole === 'child') {
      if (messageLower.includes('learn') || messageLower.includes('question') || messageLower.includes('why')) {
        return `Hi! I'm ${assistantName}, and I LOVE curious kids who ask questions! Questions are how we learn about our amazing world. I'm here to help you discover new things and understand how everything works. What would you like to learn about today?`;
      }
      
      return `Hello! I'm ${assistantName}, your friendly AI helper! I'm here to answer your questions, help you learn new things, and make sure you stay safe while having fun. What would you like to know about or talk about today?`;
    }
    
    // Parent responses
    if (messageLower.includes('family') || messageLower.includes('children') || messageLower.includes('parenting')) {
      return `Hello! I'm ${assistantName}, your family-focused AI assistant. I understand that managing family life and keeping everyone safe and happy is a big responsibility. Whether you need help with parenting strategies, family safety, or just want to talk through family challenges, I'm here to support you. What's on your mind about your family today?`;
    }
    
    if (messageLower.includes('safety') || messageLower.includes('protection') || messageLower.includes('security')) {
      return `Hi! I'm ${assistantName}, and family safety is my top priority. I'm here to help you protect your loved ones in our digital world while still allowing them to learn and grow. Whether it's online safety, digital literacy, or general security concerns, I've got you covered. What safety topic would you like to discuss?`;
    }
    
    return `Hello! I'm ${assistantName}, your comprehensive AI assistant. I'm here to help you with family management, safety concerns, parenting questions, and anything else you need support with. As a parent, you're doing one of the most important jobs in the world, and I'm here to make it a little easier. How can I assist you today?`;
  }

  async detectScam(text: string, context?: {
    userRole?: string;
    channel?: string;
    timestamp?: Date;
  }): Promise<{
    isScam: boolean;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    riskScore: number;
    detectedPatterns: Array<{
      category: string;
      severity: string;
      description: string;
    }>;
    warnings: string[];
    recommendations: string[];
  }> {
    this.updateScamDatabase();
    
    const detectedPatterns = [];
    let riskScore = 0;
    const warnings = [];
    const recommendations = [];
    
    // Pattern matching
    for (const pattern of this.scamDatabase) {
      if (pattern.pattern.test(text)) {
        detectedPatterns.push({
          category: pattern.category,
          severity: pattern.severity,
          description: this.getPatternDescription(pattern.category)
        });
        
        // Calculate risk score based on severity
        const severityScores = { low: 10, medium: 25, high: 50, critical: 80 };
        riskScore += severityScores[pattern.severity as keyof typeof severityScores] || 10;
      }
    }
    
    // Advanced analysis
    riskScore += this.analyzeUrgencyLanguage(text);
    riskScore += this.analyzeEmotionalManipulation(text);
    riskScore += this.analyzeGrammarAndSpelling(text);
    riskScore += this.analyzeSuspiciousContacts(text);
    
    // Context-based risk adjustment
    if (context) {
      riskScore = this.adjustRiskForContext(riskScore, context);
    }
    
    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    if (riskScore >= 80) riskLevel = 'critical';
    else if (riskScore >= 50) riskLevel = 'high';
    else if (riskScore >= 25) riskLevel = 'medium';
    else riskLevel = 'low';
    
    const isScam = riskScore >= 25;
    const confidence = Math.min(riskScore / 100, 0.95);
    
    // Generate warnings and recommendations
    if (isScam) {
      warnings.push(...this.generateWarnings(detectedPatterns, riskLevel));
      recommendations.push(...this.generateRecommendations(detectedPatterns, riskLevel, context?.userRole));
    }
    
    return {
      isScam,
      riskLevel,
      confidence,
      riskScore: Math.min(riskScore, 100),
      detectedPatterns,
      warnings,
      recommendations
    };
  }

  private getPatternDescription(category: string): string {
    const descriptions = {
      financial_fraud: 'Attempts to steal financial information or money',
      phishing: 'Tries to trick you into revealing personal information',
      lottery_scam: 'Fake lottery or prize notifications',
      tech_support: 'Impersonates legitimate tech support services',
      romance_scam: 'Uses emotional manipulation for financial gain',
      inheritance_scam: 'Promises large inheritance or money transfers',
      government_impersonation: 'Falsely claims to be from government agencies',
      crypto_scam: 'Fraudulent cryptocurrency investment schemes',
      charity_scam: 'Fake charity requests for donations',
      employment_scam: 'Fraudulent job offers or work-from-home schemes'
    };
    return descriptions[category as keyof typeof descriptions] || 'Suspicious activity detected';
  }

  private analyzeUrgencyLanguage(text: string): number {
    const urgencyPatterns = [
      /urgent/i, /immediate/i, /act now/i, /expires today/i, /limited time/i,
      /hurry/i, /don't wait/i, /final notice/i, /last chance/i
    ];
    
    let score = 0;
    for (const pattern of urgencyPatterns) {
      if (pattern.test(text)) score += 15;
    }
    return Math.min(score, 45);
  }

  private analyzeEmotionalManipulation(text: string): number {
    const emotionalPatterns = [
      /fear/i, /worried/i, /concerned/i, /urgent/i, /emergency/i,
      /congratulations/i, /winner/i, /selected/i, /special/i, /exclusive/i
    ];
    
    let score = 0;
    for (const pattern of emotionalPatterns) {
      if (pattern.test(text)) score += 10;
    }
    return Math.min(score, 30);
  }

  private analyzeGrammarAndSpelling(text: string): number {
    // Simple grammar/spelling analysis
    const issues = [
      /\b\w+\s+\w+\s+\w+\s+\w+\s+\w+\s+\w+\s+\w+\s+\w+\s+\w+\s+\w+\b/, // Very long sentences
      /[A-Z]{3,}/, // Excessive capitalization
      /\!\!\!+/, // Multiple exclamation marks
      /\$\$+/, // Multiple dollar signs
    ];
    
    let score = 0;
    for (const issue of issues) {
      if (issue.test(text)) score += 5;
    }
    return Math.min(score, 20);
  }

  private analyzeSuspiciousContacts(text: string): number {
    const suspiciousContacts = [
      /call.{0,20}\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/i,
      /email.{0,20}\w+@\w+\.\w+/i,
      /click.{0,20}link/i,
      /visit.{0,20}website/i
    ];
    
    let score = 0;
    for (const contact of suspiciousContacts) {
      if (contact.test(text)) score += 15;
    }
    return Math.min(score, 30);
  }

  private adjustRiskForContext(riskScore: number, context: any): number {
    let adjustedScore = riskScore;
    
    // Adjust based on user role (elders are more vulnerable)
    if (context.userRole === 'elder') {
      adjustedScore *= 1.2;
    } else if (context.userRole === 'child') {
      adjustedScore *= 1.1;
    }
    
    // Adjust based on communication channel
    if (context.channel === 'email') {
      adjustedScore *= 1.1;
    } else if (context.channel === 'sms') {
      adjustedScore *= 1.15;
    }
    
    // Time-based adjustments (scams often sent at odd hours)
    if (context.timestamp) {
      const hour = context.timestamp.getHours();
      if (hour < 6 || hour > 22) {
        adjustedScore *= 1.1;
      }
    }
    
    return adjustedScore;
  }

  private generateWarnings(patterns: any[], riskLevel: string): string[] {
    const warnings = [
      'This message shows signs of being a potential scam',
      'Never provide personal information to unsolicited contacts',
      'When in doubt, verify independently through official channels'
    ];
    
    if (riskLevel === 'critical' || riskLevel === 'high') {
      warnings.unshift('⚠️ HIGH RISK: This appears to be a scam attempt');
      warnings.push('Do not click any links or provide any information');
      warnings.push('Consider reporting this to relevant authorities');
    }
    
    return warnings;
  }

  private generateRecommendations(patterns: any[], riskLevel: string, userRole?: string): string[] {
    const recommendations = [
      'Verify the sender through official channels',
      'Never provide personal or financial information',
      'Be suspicious of urgent requests for action',
      'Consult with family or friends if unsure'
    ];
    
    if (userRole === 'elder') {
      recommendations.push('Consider asking a trusted family member for advice');
      recommendations.push('Remember: legitimate organizations don\'t ask for sensitive info via email/phone');
    }
    
    if (riskLevel === 'critical') {
      recommendations.unshift('STOP: Do not respond or take any action');
      recommendations.push('Report this to local authorities or fraud prevention services');
    }
    
    return recommendations;
  }

  async generateTutoringResponse(
    question: string,
    subject: string,
    level: 'elementary' | 'middle' | 'high' | 'college',
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading',
    conversationHistory: any[] = []
  ): Promise<{
    response: string;
    explanation?: string;
    examples?: string[];
    practiceProblems?: string[];
    visualAids?: string[];
    nextSteps?: string[];
    resources?: string[];
    difficulty: string;
    estimatedTime: string;
  }> {
    
    const difficulty = this.assessQuestionDifficulty(question, subject, level);
    const estimatedTime = this.estimateStudyTime(question, difficulty);
    
    // Generate comprehensive tutoring response
    const response = await this.generateSubjectSpecificResponse(question, subject, level, learningStyle);
    const explanation = this.generateExplanation(question, subject, level);
    const examples = this.generateExamples(question, subject, level);
    const practiceProblems = this.generatePracticeProblems(question, subject, level);
    const visualAids = this.generateVisualAids(question, subject, learningStyle);
    const nextSteps = this.generateNextSteps(question, subject, level);
    const resources = this.generateAdditionalResources(subject, level);
    
    return {
      response,
      explanation,
      examples,
      practiceProblems,
      visualAids,
      nextSteps,
      resources,
      difficulty,
      estimatedTime
    };
  }

  private assessQuestionDifficulty(question: string, subject: string, level: string): string {
    const questionLower = question.toLowerCase();
    
    // Advanced concepts
    if (questionLower.includes('calculus') || questionLower.includes('derivative') || 
        questionLower.includes('integral') || questionLower.includes('quantum')) {
      return 'Advanced';
    }
    
    // Intermediate concepts
    if (questionLower.includes('algebra') || questionLower.includes('geometry') || 
        questionLower.includes('chemistry') || questionLower.includes('analysis')) {
      return 'Intermediate';
    }
    
    // Basic concepts
    return 'Beginner';
  }

  private estimateStudyTime(question: string, difficulty: string): string {
    const baseTime = {
      'Beginner': 15,
      'Intermediate': 25,
      'Advanced': 40
    };
    
    const time = baseTime[difficulty as keyof typeof baseTime] || 20;
    return `${time}-${time + 10} minutes`;
  }

  private async generateSubjectSpecificResponse(question: string, subject: string, level: string, learningStyle: string): Promise<string> {
    const questionLower = question.toLowerCase();
    
    if (subject === 'mathematics') {
      if (questionLower.includes('fraction')) {
        return `Great question about fractions! Let me help you understand this step by step. Fractions represent parts of a whole - think of it like slicing a pizza. The bottom number (denominator) tells us how many equal pieces the whole is divided into, and the top number (numerator) tells us how many of those pieces we're talking about. For example, if you have 3/4 of a pizza, the pizza was cut into 4 equal slices, and you have 3 of them.`;
      }
      
      if (questionLower.includes('algebra') || questionLower.includes('equation')) {
        return `Algebra is like solving puzzles with numbers and letters! The key to solving equations is to think of them as balanced scales - whatever you do to one side, you must do to the other side to keep it balanced. Let's work through this systematically, isolating the variable step by step.`;
      }
      
      return `Mathematics is all about patterns and logical thinking! Let me break down this concept for you in a way that makes sense. We'll start with what you already know and build from there.`;
    }
    
    if (subject === 'science') {
      if (questionLower.includes('photosynthesis')) {
        return `Photosynthesis is one of the most important processes on Earth! Think of plants as nature's solar panels - they capture sunlight and convert it into food. The process happens in the leaves, specifically in tiny structures called chloroplasts. Here's the amazing part: plants take in carbon dioxide from the air, water from their roots, and energy from sunlight, then combine them to make glucose (sugar) and release oxygen as a bonus!`;
      }
      
      return `Science is all about understanding how our amazing world works! Let me explain this concept by connecting it to things you see and experience every day.`;
    }
    
    if (subject === 'english') {
      if (questionLower.includes('essay') || questionLower.includes('writing')) {
        return `Writing a great essay is like building a house - you need a strong foundation (your thesis), a solid structure (your paragraphs), and good finishing touches (your conclusion). Let's start by organizing your thoughts and creating an outline that will guide your writing.`;
      }
      
      return `English and writing are powerful tools for expressing your thoughts and ideas! Let me help you develop your skills step by step.`;
    }
    
    return `This is a fantastic question! Let me help you understand this concept clearly and thoroughly.`;
  }

  private generateExplanation(question: string, subject: string, level: string): string {
    return `Here's a deeper explanation: This concept builds on fundamental principles in ${subject}. Understanding this will help you tackle more complex problems and see how different ideas connect together.`;
  }

  private generateExamples(question: string, subject: string, level: string): string[] {
    if (subject === 'mathematics') {
      return [
        'Let\'s say you have 2/3 + 1/4. First, find a common denominator (12), then convert: 8/12 + 3/12 = 11/12',
        'For solving x + 5 = 12, subtract 5 from both sides: x = 7',
        'In geometry, if a triangle has angles of 60° and 70°, the third angle is 180° - 60° - 70° = 50°'
      ];
    }
    
    if (subject === 'science') {
      return [
        'Plants use photosynthesis: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂',
        'When you breathe on a cold day, you can see water vapor because warm air holds more moisture than cold air',
        'A simple circuit needs a power source, wires, and a load (like a light bulb) to complete the path'
      ];
    }
    
    return ['Here are some practical examples that illustrate this concept...'];
  }

  private generatePracticeProblems(question: string, subject: string, level: string): string[] {
    if (subject === 'mathematics') {
      return [
        'Try solving: 3/5 + 2/7 (Hint: find the common denominator first)',
        'Solve for x: 2x - 8 = 14',
        'If a rectangle has length 12 cm and width 8 cm, what is its area and perimeter?'
      ];
    }
    
    if (subject === 'science') {
      return [
        'Explain what happens to the oxygen produced during photosynthesis',
        'Describe how the water cycle connects to photosynthesis',
        'Compare photosynthesis in land plants vs. aquatic plants'
      ];
    }
    
    return ['Practice applying this concept with these exercises...'];
  }

  private generateVisualAids(question: string, subject: string, learningStyle: string): string[] {
    if (learningStyle === 'visual') {
      return [
        'Draw a diagram showing the relationship between the parts',
        'Create a flowchart to visualize the process',
        'Use colors to highlight different components',
        'Make a concept map connecting related ideas'
      ];
    }
    
    return ['Try creating visual representations to better understand this concept'];
  }

  private generateNextSteps(question: string, subject: string, level: string): string[] {
    return [
      'Practice with similar problems to reinforce your understanding',
      'Try explaining this concept to someone else - teaching helps learning!',
      'Look for connections between this topic and other subjects',
      'Apply this knowledge to real-world situations when possible'
    ];
  }

  private generateAdditionalResources(subject: string, level: string): string[] {
    return [
      `Khan Academy ${subject} courses for ${level} level`,
      `Educational videos and interactive simulations`,
      `Practice worksheets and online exercises`,
      `Study groups and peer learning opportunities`
    ];
  }

  async analyzeMood(text: string): Promise<{ mood: string; confidence: number; insights: string[] }> {
    // Enhanced mood analysis
    const moodKeywords = {
      happy: ['happy', 'joy', 'excited', 'great', 'awesome', 'wonderful', 'amazing', 'fantastic', 'thrilled'],
      sad: ['sad', 'down', 'depressed', 'upset', 'crying', 'hurt', 'disappointed', 'miserable', 'heartbroken'],
      angry: ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'irritated', 'rage', 'livid'],
      anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'stress', 'panic', 'overwhelmed', 'tense'],
      calm: ['calm', 'peaceful', 'relaxed', 'content', 'serene', 'tranquil', 'composed'],
      confused: ['confused', 'lost', 'unclear', 'puzzled', 'bewildered', 'perplexed'],
      excited: ['excited', 'enthusiastic', 'eager', 'pumped', 'energetic', 'motivated']
    };

    const textLower = text.toLowerCase();
    let detectedMood = 'neutral';
    let confidence = 0.5;
    let maxMatches = 0;

    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      const matches = keywords.filter(keyword => textLower.includes(keyword));
      if (matches.length > maxMatches) {
        maxMatches = matches.length;
        detectedMood = mood;
        confidence = Math.min(0.95, 0.6 + (matches.length * 0.1));
      }
    }

    const insights = [
      `Detected emotional tone: ${detectedMood}`,
      `Confidence level: ${Math.round(confidence * 100)}%`,
      'Your emotions are valid and important',
      'Consider practicing mindfulness if feeling overwhelmed',
      'Remember that all emotions are temporary'
    ];

    // Add mood-specific insights
    if (detectedMood === 'anxious' || detectedMood === 'worried') {
      insights.push('Try deep breathing exercises to help manage anxiety');
      insights.push('Consider talking to someone you trust about your concerns');
    } else if (detectedMood === 'sad') {
      insights.push('It\'s okay to feel sad - allow yourself to process these emotions');
      insights.push('Engaging in activities you enjoy might help lift your spirits');
    } else if (detectedMood === 'angry') {
      insights.push('Take some time to cool down before making important decisions');
      insights.push('Physical exercise can be a healthy way to release anger');
    }

    return { mood: detectedMood, confidence, insights };
  }
}