import { Family, FamilyMember, User } from '../types';

class FamilyService {
  private static instance: FamilyService;

  private constructor() {}

  static getInstance(): FamilyService {
    if (!FamilyService.instance) {
      FamilyService.instance = new FamilyService();
    }
    return FamilyService.instance;
  }

  // Create a new family
  async createFamily(ownerId: string, familyName: string): Promise<Family> {
    const family: Family = {
      id: `family-${Date.now()}`,
      name: familyName,
      ownerId,
      members: [],
      createdAt: new Date(),
      settings: {
        allowChildRegistration: false,
        requireParentalApproval: true,
        shareActivityReports: true
      }
    };

    // Save to localStorage (in production, this would be saved to database)
    localStorage.setItem(`family_${family.id}`, JSON.stringify(family));
    
    return family;
  }

  // Add a family member
  async addFamilyMember(familyId: string, memberData: Omit<FamilyMember, 'id' | 'joinedAt'>): Promise<FamilyMember> {
    const family = await this.getFamily(familyId);
    if (!family) {
      throw new Error('Family not found');
    }

    const newMember: FamilyMember = {
      ...memberData,
      id: `member-${Date.now()}`,
      joinedAt: new Date()
    };

    family.members.push(newMember);
    await this.saveFamily(family);

    // Send invitation email (mock implementation)
    await this.sendInvitationEmail(newMember.email, family.name);

    return newMember;
  }

  // Get family by ID
  async getFamily(familyId: string): Promise<Family | null> {
    const familyData = localStorage.getItem(`family_${familyId}`);
    if (!familyData) return null;

    const family = JSON.parse(familyData);
    // Convert date strings back to Date objects
    family.createdAt = new Date(family.createdAt);
    family.members = family.members.map((member: any) => ({
      ...member,
      joinedAt: new Date(member.joinedAt),
      lastActive: new Date(member.lastActive),
      invitationSentAt: member.invitationSentAt ? new Date(member.invitationSentAt) : undefined
    }));

    return family;
  }

  // Get families where user is a member
  async getUserFamilies(userId: string): Promise<Family[]> {
    const families: Family[] = [];
    
    // In a real implementation, this would query the database
    // For now, we'll check localStorage for families
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('family_')) {
        const family = await this.getFamily(key.replace('family_', ''));
        if (family && (family.ownerId === userId || family.members.some(m => m.id === userId))) {
          families.push(family);
        }
      }
    }

    return families;
  }

  // Update family member
  async updateFamilyMember(familyId: string, memberId: string, updates: Partial<FamilyMember>): Promise<void> {
    const family = await this.getFamily(familyId);
    if (!family) {
      throw new Error('Family not found');
    }

    const memberIndex = family.members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) {
      throw new Error('Member not found');
    }

    family.members[memberIndex] = { ...family.members[memberIndex], ...updates };
    await this.saveFamily(family);
  }

  // Remove family member
  async removeFamilyMember(familyId: string, memberId: string): Promise<void> {
    const family = await this.getFamily(familyId);
    if (!family) {
      throw new Error('Family not found');
    }

    family.members = family.members.filter(m => m.id !== memberId);
    await this.saveFamily(family);
  }

  // Accept family invitation
  async acceptInvitation(familyId: string, memberId: string, userData: User): Promise<void> {
    const family = await this.getFamily(familyId);
    if (!family) {
      throw new Error('Family not found');
    }

    const memberIndex = family.members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) {
      throw new Error('Invitation not found');
    }

    // Update member status and link to user account
    family.members[memberIndex] = {
      ...family.members[memberIndex],
      status: 'active',
      lastActive: new Date()
    };

    // Update user's family association
    userData.familyId = familyId;

    await this.saveFamily(family);
  }

  // Send invitation email (mock implementation)
  private async sendInvitationEmail(email: string, familyName: string): Promise<void> {
    // In a real implementation, this would send an actual email
    console.log(`Invitation sent to ${email} for family: ${familyName}`);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Save family to storage
  private async saveFamily(family: Family): Promise<void> {
    localStorage.setItem(`family_${family.id}`, JSON.stringify(family));
  }

  // Get family member activity summary
  async getFamilyActivitySummary(familyId: string): Promise<{
    totalMembers: number;
    activeMembers: number;
    totalInteractions: number;
    averageWellbeingScore: number;
    recentAlerts: number;
  }> {
    const family = await this.getFamily(familyId);
    if (!family) {
      throw new Error('Family not found');
    }

    // Mock data - in production, this would aggregate real activity data
    return {
      totalMembers: family.members.length,
      activeMembers: family.members.filter(m => m.status === 'active').length,
      totalInteractions: Math.floor(Math.random() * 100) + 50,
      averageWellbeingScore: Math.floor(Math.random() * 20) + 80,
      recentAlerts: Math.floor(Math.random() * 5)
    };
  }

  // Generate family safety report
  async generateFamilySafetyReport(familyId: string): Promise<{
    overallScore: number;
    memberScores: { [memberId: string]: number };
    recommendations: string[];
    alerts: Array<{
      memberId: string;
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      timestamp: Date;
    }>;
  }> {
    const family = await this.getFamily(familyId);
    if (!family) {
      throw new Error('Family not found');
    }

    // Mock safety report - in production, this would analyze real data
    const memberScores: { [memberId: string]: number } = {};
    family.members.forEach(member => {
      memberScores[member.id] = Math.floor(Math.random() * 30) + 70;
    });

    const overallScore = Object.values(memberScores).reduce((sum, score) => sum + score, 0) / family.members.length;

    return {
      overallScore: Math.floor(overallScore),
      memberScores,
      recommendations: [
        'Review privacy settings for all family members',
        'Schedule regular family discussions about online safety',
        'Update parental controls and monitoring settings',
        'Ensure all devices have latest security updates'
      ],
      alerts: [
        {
          memberId: family.members[0]?.id || 'unknown',
          type: 'privacy_risk',
          severity: 'medium',
          description: 'Attempted to share personal information',
          timestamp: new Date()
        }
      ]
    };
  }
}

export default FamilyService;