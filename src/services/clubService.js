// Club service for managing club invitations and member operations
// This service layer will be easily replaceable with actual API calls when backend is ready

// Mock data for development - replace with actual API calls
const mockClubMembers = {
  'club1': [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=CF0F47&color=fff',
      role: 'admin',
      isOwner: true,
      joinedDate: '2024-01-15T10:00:00Z'
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0F47CF&color=fff',
      role: 'moderator',
      isOwner: false,
      joinedDate: '2024-02-01T14:30:00Z'
    },
    {
      id: 'user3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=47CF0F&color=fff',
      role: 'editor',
      isOwner: false,
      joinedDate: '2024-02-15T09:15:00Z'
    }
  ]
};

const mockInvitations = [];

export class ClubService {
  // Get club members
  static async getClubMembers(clubId) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/clubs/${clubId}/members`);
      // return await response.json();

      return {
        success: true,
        data: mockClubMembers[clubId] || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Send invitation to join club
  static async inviteMember(clubId, email, role, invitedBy) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/clubs/${clubId}/invite`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, role, invitedBy })
      // });
      // return await response.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user is already a member
      const members = mockClubMembers[clubId] || [];
      const existingMember = members.find(member => member.email === email);

      if (existingMember) {
        return {
          success: false,
          error: 'User is already a member of this club'
        };
      }

      // Check if invitation already exists
      const existingInvitation = mockInvitations.find(
        inv => inv.clubId === clubId && inv.email === email && inv.status === 'pending'
      );

      if (existingInvitation) {
        return {
          success: false,
          error: 'Invitation already sent to this email'
        };
      }

      // Create invitation
      const invitation = {
        id: `inv_${Date.now()}`,
        clubId,
        email,
        role,
        invitedBy,
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      };

      mockInvitations.push(invitation);

      return {
        success: true,
        data: invitation,
        message: 'Invitation sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update member role
  static async updateMemberRole(clubId, memberId, newRole, updatedBy) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/clubs/${clubId}/members/${memberId}/role`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ role: newRole, updatedBy })
      // });
      // return await response.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const members = mockClubMembers[clubId] || [];
      const memberIndex = members.findIndex(member => member.id === memberId);

      if (memberIndex === -1) {
        return {
          success: false,
          error: 'Member not found'
        };
      }

      // Don't allow changing owner role
      if (members[memberIndex].isOwner) {
        return {
          success: false,
          error: 'Cannot change owner role'
        };
      }

      // Update role
      members[memberIndex].role = newRole;
      members[memberIndex].updatedAt = new Date().toISOString();

      return {
        success: true,
        data: members[memberIndex],
        message: 'Role updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Remove member from club
  static async removeMember(clubId, memberId, removedBy) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/clubs/${clubId}/members/${memberId}`, {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ removedBy })
      // });
      // return await response.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const members = mockClubMembers[clubId] || [];
      const memberIndex = members.findIndex(member => member.id === memberId);

      if (memberIndex === -1) {
        return {
          success: false,
          error: 'Member not found'
        };
      }

      // Don't allow removing owner
      if (members[memberIndex].isOwner) {
        return {
          success: false,
          error: 'Cannot remove club owner'
        };
      }

      // Remove member
      const removedMember = members.splice(memberIndex, 1)[0];

      return {
        success: true,
        data: removedMember,
        message: 'Member removed successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get pending invitations for a club
  static async getClubInvitations(clubId) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/clubs/${clubId}/invitations`);
      // return await response.json();

      const clubInvitations = mockInvitations.filter(
        inv => inv.clubId === clubId && inv.status === 'pending'
      );

      return {
        success: true,
        data: clubInvitations
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Cancel invitation
  static async cancelInvitation(invitationId) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/invitations/${invitationId}`, {
      //   method: 'DELETE'
      // });
      // return await response.json();

      const invitationIndex = mockInvitations.findIndex(inv => inv.id === invitationId);

      if (invitationIndex === -1) {
        return {
          success: false,
          error: 'Invitation not found'
        };
      }

      mockInvitations[invitationIndex].status = 'cancelled';

      return {
        success: true,
        message: 'Invitation cancelled successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Accept invitation (for invited users)
  static async acceptInvitation(invitationId, userId) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/invitations/${invitationId}/accept`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId })
      // });
      // return await response.json();

      const invitation = mockInvitations.find(inv => inv.id === invitationId);

      if (!invitation || invitation.status !== 'pending') {
        return {
          success: false,
          error: 'Invitation not found or already processed'
        };
      }

      // Check if invitation is expired
      if (new Date() > new Date(invitation.expiresAt)) {
        return {
          success: false,
          error: 'Invitation has expired'
        };
      }

      // Add user to club members
      const newMember = {
        id: userId,
        name: 'New Member', // This would come from user data
        email: invitation.email,
        avatar: `https://ui-avatars.com/api/?name=New+Member&background=CF0F47&color=fff`,
        role: invitation.role,
        isOwner: false,
        joinedDate: new Date().toISOString()
      };

      if (!mockClubMembers[invitation.clubId]) {
        mockClubMembers[invitation.clubId] = [];
      }
      mockClubMembers[invitation.clubId].push(newMember);

      // Mark invitation as accepted
      invitation.status = 'accepted';
      invitation.acceptedAt = new Date().toISOString();

      return {
        success: true,
        data: newMember,
        message: 'Successfully joined the club'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get user's club memberships
  static async getUserClubMemberships(userId) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/users/${userId}/clubs`);
      // return await response.json();

      const userMemberships = [];

      for (const [clubId, members] of Object.entries(mockClubMembers)) {
        const membership = members.find(member => member.id === userId);
        if (membership) {
          userMemberships.push({
            clubId,
            ...membership
          });
        }
      }

      return {
        success: true,
        data: userMemberships
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check user permissions in club
  static async getUserClubPermissions(clubId, userId) {
    try {
      const members = mockClubMembers[clubId] || [];
      const member = members.find(m => m.id === userId);

      if (!member) {
        return {
          success: false,
          error: 'User is not a member of this club'
        };
      }

      const permissions = this.getRolePermissions(member.role);

      return {
        success: true,
        data: {
          role: member.role,
          isOwner: member.isOwner,
          permissions
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get role permissions
  static getRolePermissions(role) {
    const permissions = {
      admin: [
        'manage_club',
        'invite_members',
        'remove_members',
        'change_roles',
        'create_events',
        'edit_events',
        'delete_events',
        'manage_settings'
      ],
      moderator: [
        'invite_members',
        'remove_members',
        'change_lower_roles',
        'create_events',
        'edit_events',
        'moderate_content'
      ],
      editor: [
        'create_events',
        'edit_events',
        'edit_content',
        'view_members'
      ],
      contributor: [
        'create_events',
        'view_members',
        'participate'
      ]
    };

    return permissions[role] || permissions.contributor;
  }
}

// Role hierarchy helper
export const ROLE_HIERARCHY = {
  admin: 4,
  moderator: 3,
  editor: 2,
  contributor: 1
};

// Permission helper functions
export const canManageRole = (currentRole, targetRole) => {
  return ROLE_HIERARCHY[currentRole] > ROLE_HIERARCHY[targetRole];
};

export const hasPermission = (userRole, permission) => {
  const permissions = ClubService.getRolePermissions(userRole);
  return permissions.includes(permission);
};
