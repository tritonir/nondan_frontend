import React, { useState } from 'react';
import { UserPlus, Mail, RefreshCw, X, Clock } from 'lucide-react';
import { useClubRoles } from '../../hooks/useClubRoles';
import MemberList from './MemberList';
import InviteModal from './InviteModal';

const RoleManager = ({ clubId, currentUserId }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('members');

  const {
    members,
    invitations,
    loading,
    error,
    userRole,
    hasPermission,
    inviteMember,
    changeUserRole,
    removeMember,
    cancelInvitation,
    resendInvitation
  } = useClubRoles(clubId, currentUserId);

  const handleInviteMember = async (email, role) => {
    return await inviteMember(email, role);
  };

  const handleRoleChange = async (memberId, newRole) => {
    const result = await changeUserRole(memberId, newRole);
    if (!result.success) {
      alert(result.error || 'Failed to change role');
    }
  };

  const handleRemoveMember = async (memberId) => {
    const result = await removeMember(memberId);
    if (!result.success) {
      alert(result.error || 'Failed to remove member');
    }
  };

  const handleCancelInvitation = async (invitationId) => {
    const result = await cancelInvitation(invitationId);
    if (!result.success) {
      alert(result.error || 'Failed to cancel invitation');
    }
  };

  const handleResendInvitation = async (invitationId) => {
    const result = await resendInvitation(invitationId);
    if (result.success) {
      alert('Invitation resent successfully!');
    } else {
      alert(result.error || 'Failed to resend invitation');
    }
  };

  const getInvitationStatus = (invitation) => {
    const expiresAt = new Date(invitation.expiresAt);
    const now = new Date();

    if (now > expiresAt) {
      return { status: 'expired', color: 'text-red-600 dark:text-red-400' };
    }

    switch (invitation.status) {
      case 'pending':
        return { status: 'pending', color: 'text-yellow-600 dark:text-yellow-400' };
      case 'accepted':
        return { status: 'accepted', color: 'text-green-600 dark:text-green-400' };
      case 'declined':
        return { status: 'declined', color: 'text-red-600 dark:text-red-400' };
      default:
        return { status: 'unknown', color: 'text-gray-600 dark:text-gray-400' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading members...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  // Only show role manager to users with appropriate permissions
  if (!userRole || (!hasPermission('canInviteMembers') && !hasPermission('canManageRoles'))) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          You don't have permission to manage club members.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Club Role Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage club members and their permissions
          </p>
        </div>

        {hasPermission('canInviteMembers') && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('members')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'members'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Members ({members.length})
          </button>

          {hasPermission('canInviteMembers') && (
            <button
              onClick={() => setActiveTab('invitations')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invitations'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Invitations ({invitations.length})
            </button>
          )}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'members' ? (
        <MemberList
          members={members}
          currentUserRole={userRole}
          onRoleChange={handleRoleChange}
          onRemoveMember={handleRemoveMember}
          hasPermission={hasPermission}
        />
      ) : (
        /* Invitations List */
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pending Invitations
            </h3>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {invitations.map((invitation) => {
              const statusInfo = getInvitationStatus(invitation);

              return (
                <div key={invitation.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {invitation.email}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Role: {invitation.role.charAt(0).toUpperCase() + invitation.role.slice(1)}
                      </p>
                      <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Sent {new Date(invitation.invitedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 ${statusInfo.color}`}>
                      {statusInfo.status.charAt(0).toUpperCase() + statusInfo.status.slice(1)}
                    </span>

                    <div className="flex space-x-2">
                      {statusInfo.status === 'pending' && (
                        <button
                          onClick={() => handleResendInvitation(invitation.id)}
                          className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                          title="Resend invitation"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleCancelInvitation(invitation.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        title="Cancel invitation"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {invitations.length === 0 && (
              <div className="p-8 text-center">
                <Mail className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  No pending invitations
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Invite new members to expand your club community.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invite Modal */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        clubId={clubId}
        onInvite={handleInviteMember}
      />
    </div>
  );
};

export default RoleManager;
