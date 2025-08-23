// Club role management hook with Facebook-style permissions
import { useState, useEffect } from 'react';
import { mockClubMembers, mockClubInvitations, clubRolePermissions } from '../data/mockData.js';

export const useClubRoles = (clubId, userId) => {
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Filter members and invitations for this club
    setMembers(mockClubMembers.filter(m => m.clubId === clubId));
    setInvitations(mockClubInvitations.filter(i => i.clubId === clubId));
  }, [clubId]);

  const getUserRole = () => {
    const member = members.find(m => m.userId === userId);
    return member?.role || null;
  };

  const hasPermission = (permission) => {
    const userRole = getUserRole();
    if (!userRole || !clubRolePermissions[userRole]) return false;
    return clubRolePermissions[userRole][permission] === true;
  };

  const inviteMember = async (email, role) => {
    if (!hasPermission('canInviteMembers')) {
      throw new Error('You do not have permission to invite members');
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const newInvitation = {
        id: `invite${Date.now()}`,
        clubId,
        email,
        role,
        invitedBy: userId,
        status: 'pending',
        invitedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      setInvitations(prev => [...prev, newInvitation]);
      return { success: true, invitation: newInvitation };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const changeUserRole = async (memberId, newRole) => {
    if (!hasPermission('canManageRoles')) {
      throw new Error('You do not have permission to change roles');
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      setMembers(prev =>
        prev.map(member =>
          member.id === memberId
            ? { ...member, role: newRole }
            : member
        )
      );
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (memberId) => {
    if (!hasPermission('canRemoveMembers')) {
      throw new Error('You do not have permission to remove members');
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      setMembers(prev => prev.filter(member => member.id !== memberId));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const cancelInvitation = async (invitationId) => {
    if (!hasPermission('canInviteMembers')) {
      throw new Error('You do not have permission to cancel invitations');
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resendInvitation = async (invitationId) => {
    if (!hasPermission('canInviteMembers')) {
      throw new Error('You do not have permission to resend invitations');
    }

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      setInvitations(prev =>
        prev.map(inv =>
          inv.id === invitationId
            ? {
                ...inv,
                invitedAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'pending'
              }
            : inv
        )
      );
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    members,
    invitations,
    loading,
    error,
    userRole: getUserRole(),
    hasPermission,
    inviteMember,
    changeUserRole,
    removeMember,
    cancelInvitation,
    resendInvitation,
    permissions: clubRolePermissions,
    refetch: () => {
      setMembers(mockClubMembers.filter(m => m.clubId === clubId));
      setInvitations(mockClubInvitations.filter(i => i.clubId === clubId));
    }
  };
};
