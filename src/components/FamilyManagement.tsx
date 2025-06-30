import React, { useState, useEffect } from 'react';
import { Users, Plus, Mail, Shield, Trash2, Edit2, Check, X, UserPlus, Crown, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FamilyMember, UserRole } from '../types';
import Avatar from './Avatar';

interface FamilyManagementProps {
  onClose: () => void;
}

const FamilyManagement: React.FC<FamilyManagementProps> = ({ onClose }) => {
  const { currentUser } = useApp();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<UserRole>('child');
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load family members on component mount
  useEffect(() => {
    loadFamilyMembers();
  }, []);

  const loadFamilyMembers = () => {
    // In a real app, this would fetch from the database
    const savedMembers = localStorage.getItem(`family_${currentUser?.id}`);
    if (savedMembers) {
      setFamilyMembers(JSON.parse(savedMembers));
    } else {
      // Add current user as family head
      const parentMember: FamilyMember = {
        id: currentUser?.id || 'parent-1',
        name: currentUser?.name || 'Parent',
        email: currentUser?.email || '',
        role: 'parent',
        status: 'active',
        isOwner: true,
        joinedAt: new Date(),
        lastActive: new Date(),
        permissions: {
          canManageFamily: true,
          canViewReports: true,
          canModifySettings: true
        }
      };
      setFamilyMembers([parentMember]);
      saveFamilyMembers([parentMember]);
    }
  };

  const saveFamilyMembers = (members: FamilyMember[]) => {
    localStorage.setItem(`family_${currentUser?.id}`, JSON.stringify(members));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddMember = async () => {
    if (!newMemberEmail.trim() || !newMemberName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(newMemberEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    // Check if member already exists
    if (familyMembers.some(member => member.email.toLowerCase() === newMemberEmail.toLowerCase())) {
      setError('This email is already in your family');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call to send invitation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newMember: FamilyMember = {
        id: `member-${Date.now()}`,
        name: newMemberName.trim(),
        email: newMemberEmail.toLowerCase().trim(),
        role: newMemberRole,
        status: 'invited',
        isOwner: false,
        joinedAt: new Date(),
        lastActive: new Date(),
        permissions: {
          canManageFamily: false,
          canViewReports: newMemberRole === 'parent',
          canModifySettings: false
        },
        invitedBy: currentUser?.id,
        invitationSentAt: new Date()
      };

      const updatedMembers = [...familyMembers, newMember];
      setFamilyMembers(updatedMembers);
      saveFamilyMembers(updatedMembers);

      // Reset form
      setNewMemberEmail('');
      setNewMemberName('');
      setNewMemberRole('child');
      setShowAddMember(false);
    } catch (error) {
      setError('Failed to send invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (window.confirm('Are you sure you want to remove this family member?')) {
      const updatedMembers = familyMembers.filter(member => member.id !== memberId);
      setFamilyMembers(updatedMembers);
      saveFamilyMembers(updatedMembers);
    }
  };

  const handleResendInvitation = async (memberId: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedMembers = familyMembers.map(member => 
        member.id === memberId 
          ? { ...member, invitationSentAt: new Date() }
          : member
      );
      setFamilyMembers(updatedMembers);
      saveFamilyMembers(updatedMembers);
    } catch (error) {
      setError('Failed to resend invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMemberRole = (memberId: string, newRole: UserRole) => {
    const updatedMembers = familyMembers.map(member => 
      member.id === memberId 
        ? { 
            ...member, 
            role: newRole,
            permissions: {
              ...member.permissions,
              canViewReports: newRole === 'parent',
            }
          }
        : member
    );
    setFamilyMembers(updatedMembers);
    saveFamilyMembers(updatedMembers);
    setEditingMember(null);
  };

  const getStatusBadge = (status: FamilyMember['status']) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', text: 'Active' },
      invited: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300', text: 'Invited' },
      inactive: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300', text: 'Inactive' }
    };
    
    const badge = badges[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const getRoleDisplayName = (role: UserRole) => {
    const roleNames = {
      parent: 'Parent',
      teen: 'Teen',
      child: 'Child',
      elder: 'Elder'
    };
    return roleNames[role];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Family Management</h2>
                <p className="text-blue-100">Manage your family members and their access</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Add Member Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Family Members ({familyMembers.length})
              </h3>
              <button
                onClick={() => setShowAddMember(!showAddMember)}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </div>

            {/* Add Member Form */}
            {showAddMember && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">
                  Invite New Family Member
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value as UserRole)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="child">Child</option>
                      <option value="teen">Teen</option>
                      <option value="elder">Elder</option>
                      <option value="parent">Parent</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={handleAddMember}
                    disabled={loading}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{loading ? 'Sending...' : 'Send Invitation'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMember(false);
                      setError('');
                      setNewMemberEmail('');
                      setNewMemberName('');
                      setNewMemberRole('child');
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Family Members List */}
          <div className="space-y-4">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar role={member.role} size="md" />
                      {member.isOwner && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {member.name}
                        </h4>
                        {getStatusBadge(member.status)}
                        {member.isOwner && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-full text-xs font-medium">
                            Owner
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {member.email}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        {editingMember === member.id ? (
                          <div className="flex items-center space-x-2">
                            <select
                              value={member.role}
                              onChange={(e) => handleUpdateMemberRole(member.id, e.target.value as UserRole)}
                              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            >
                              <option value="child">Child</option>
                              <option value="teen">Teen</option>
                              <option value="elder">Elder</option>
                              <option value="parent">Parent</option>
                            </select>
                            <button
                              onClick={() => setEditingMember(null)}
                              className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Role: {getRoleDisplayName(member.role)}
                            </span>
                            {!member.isOwner && (
                              <button
                                onClick={() => setEditingMember(member.id)}
                                className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      {member.status === 'invited' && member.invitationSentAt && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Invited {member.invitationSentAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {member.status === 'invited' && (
                      <button
                        onClick={() => handleResendInvitation(member.id)}
                        disabled={loading}
                        className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm transition-colors disabled:opacity-50"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Resend</span>
                      </button>
                    )}
                    {!member.isOwner && (
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Permissions */}
                {member.role === 'parent' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Permissions
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {member.permissions.canManageFamily && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-full text-xs">
                          Manage Family
                        </span>
                      )}
                      {member.permissions.canViewReports && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full text-xs">
                          View Reports
                        </span>
                      )}
                      {member.permissions.canModifySettings && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 rounded-full text-xs">
                          Modify Settings
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {familyMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                No family members yet
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-4">
                Start by adding your family members to keep everyone safe and connected.
              </p>
              <button
                onClick={() => setShowAddMember(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add First Member
              </button>
            </div>
          )}

          {/* Family Safety Tips */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Family Safety Tips
                </h4>
                <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                  <li>• Regularly review family member activity and safety reports</li>
                  <li>• Set appropriate roles and permissions for each family member</li>
                  <li>• Ensure all family members understand online safety guidelines</li>
                  <li>• Keep family member information up to date</li>
                  <li>• Use Guardian AI's monitoring features to stay informed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyManagement;