export type UserRole = 'elder' | 'teen' | 'child' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  authProvider: 'google' | 'email' | 'anonymous';
  preferences: {
    language: string;
    highContrast: boolean;
    speechEnabled: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
  aiAssistants: {
    [key: string]: AIAssistant;
  };
  familyId?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'invited' | 'inactive';
  isOwner: boolean;
  joinedAt: Date;
  lastActive: Date;
  permissions: {
    canManageFamily: boolean;
    canViewReports: boolean;
    canModifySettings: boolean;
  };
  invitedBy?: string;
  invitationSentAt?: Date;
}

export interface Family {
  id: string;
  name: string;
  ownerId: string;
  members: FamilyMember[];
  createdAt: Date;
  settings: {
    allowChildRegistration: boolean;
    requireParentalApproval: boolean;
    shareActivityReports: boolean;
  };
}

export interface AIAssistant {
  id: string;
  name: string;
  type: 'tutor' | 'wellbeing' | 'general';
  personality: string;
  avatar: string;
  isActive: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
  aiAssistantId?: string;
}

export interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  timestamp: Date;
  aiInsights: string[];
}

export interface ScamAlert {
  id: string;
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  type: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  aiAssistantId: string;
  messages: Message[];
  lastActivity: Date;
}

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  provider: 'google' | 'email' | 'anonymous';
  isAnonymous?: boolean;
}

export interface ActivityReport {
  id: string;
  userId: string;
  date: Date;
  aiInteractions: number;
  safetyAlerts: number;
  studyTime: number;
  wellbeingScore: number;
  summary: string;
}

export interface SafetyAlert {
  id: string;
  userId: string;
  type: 'scam' | 'inappropriate_content' | 'cyberbullying' | 'privacy_risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: Date;
  resolved: boolean;
  parentNotified: boolean;
}