import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { User, ChatSession, Message, JournalEntry } from '../types';

class DataService {
  private static instance: DataService;
  private isFirestoreAvailable: boolean = true;

  private constructor() {
    this.isFirestoreAvailable = !!db && typeof db.collection !== 'undefined';
    
    if (!this.isFirestoreAvailable) {
      console.warn('⚠️ Firestore not available, using local storage');
    }
  }

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // User Management
  async saveUser(user: User): Promise<void> {
    if (!this.isFirestoreAvailable) {
      localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
      return;
    }

    try {
      const userRef = doc(db, 'users', user.id);
      await setDoc(userRef, {
        ...user,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error('Failed to save user data');
    }
  }

  async getUser(userId: string): Promise<User | null> {
    if (!this.isFirestoreAvailable) {
      const userData = localStorage.getItem(`user_${userId}`);
      return userData ? JSON.parse(userData) : null;
    }

    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    if (!this.isFirestoreAvailable) {
      const userData = localStorage.getItem(`user_${userId}`);
      if (userData) {
        const user = JSON.parse(userData);
        const updatedUser = { ...user, ...updates };
        localStorage.setItem(`user_${userId}`, JSON.stringify(updatedUser));
      }
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user data');
    }
  }

  // Chat Sessions
  async saveChatSession(session: ChatSession): Promise<void> {
    if (!this.isFirestoreAvailable) {
      const sessions = this.getLocalChatSessions();
      sessions[session.id] = session;
      localStorage.setItem('chatSessions', JSON.stringify(sessions));
      return;
    }

    try {
      const sessionRef = doc(db, 'chatSessions', session.id);
      await setDoc(sessionRef, {
        ...session,
        lastActivity: Timestamp.fromDate(session.lastActivity),
        messages: session.messages.map(msg => ({
          ...msg,
          timestamp: Timestamp.fromDate(msg.timestamp)
        }))
      });
    } catch (error) {
      console.error('Error saving chat session:', error);
      throw new Error('Failed to save chat session');
    }
  }

  async getChatSessions(userId: string): Promise<ChatSession[]> {
    if (!this.isFirestoreAvailable) {
      const sessions = this.getLocalChatSessions();
      return Object.values(sessions).filter(session => 
        session.id.includes(userId)
      );
    }

    try {
      const sessionsRef = collection(db, 'chatSessions');
      const q = query(
        sessionsRef,
        where('userId', '==', userId),
        orderBy('lastActivity', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          lastActivity: data.lastActivity.toDate(),
          messages: data.messages.map((msg: any) => ({
            ...msg,
            timestamp: msg.timestamp.toDate()
          }))
        } as ChatSession;
      });
    } catch (error) {
      console.error('Error getting chat sessions:', error);
      return [];
    }
  }

  // Journal Entries
  async saveJournalEntry(entry: JournalEntry, userId: string): Promise<void> {
    if (!this.isFirestoreAvailable) {
      const entries = this.getLocalJournalEntries(userId);
      entries.push(entry);
      localStorage.setItem(`journal_${userId}`, JSON.stringify(entries));
      return;
    }

    try {
      const entriesRef = collection(db, 'journalEntries');
      await addDoc(entriesRef, {
        ...entry,
        userId,
        timestamp: Timestamp.fromDate(entry.timestamp)
      });
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw new Error('Failed to save journal entry');
    }
  }

  async getJournalEntries(userId: string): Promise<JournalEntry[]> {
    if (!this.isFirestoreAvailable) {
      return this.getLocalJournalEntries(userId);
    }

    try {
      const entriesRef = collection(db, 'journalEntries');
      const q = query(
        entriesRef,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(100)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          timestamp: data.timestamp.toDate()
        } as JournalEntry;
      });
    } catch (error) {
      console.error('Error getting journal entries:', error);
      return [];
    }
  }

  // Local Storage Helpers
  private getLocalChatSessions(): { [key: string]: ChatSession } {
    const sessions = localStorage.getItem('chatSessions');
    return sessions ? JSON.parse(sessions) : {};
  }

  private getLocalJournalEntries(userId: string): JournalEntry[] {
    const entries = localStorage.getItem(`journal_${userId}`);
    return entries ? JSON.parse(entries) : [];
  }
}

export default DataService;