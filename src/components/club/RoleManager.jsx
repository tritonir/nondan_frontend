import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Crown,
  User,
  Edit3,
  Settings,
  AlertTriangle,
  Info
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const RoleManager = ({ clubId, currentUserRole, onRoleUpdate }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      value: 'admin',
      label: 'Admin',
      icon: Crown,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900',
      permissions: [
        'Full club management access',
        'Invite and remove members',
        'Change member roles',
        'Create and manage events',
        'Delete club',
        'Manage club settings'
      ],
      description: 'Complete control over the club and all its activities'
    },
    {
      value: 'moderator',
      label: 'Moderator',
      icon: ShieldCheck,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      permissions: [
        'Invite and remove members',
        'Change contributor/editor roles',
        'Create and manage events',
        'Moderate discussions',
        'Manage event attendance'
      ],
      description: 'Manage members and events with elevated privileges'
    },
    {
      value: 'editor',
      label: 'Editor',
      icon: Edit3,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      permissions: [
        'Create and edit events',
        'Manage event details',
        'View member list',
        'Edit club content',
        'Moderate comments'
      ],
      description: 'Create and edit club content and events'
    },
    {
      value: 'contributor',
      label: 'Contributor',
      icon: User,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900',
      permissions: [
        'Create events',
        'Join events',
        'View member list',
        'Comment on posts',
        'Basic club participation'
      ],
      description: 'Basic membership with event creation privileges'
    }
  ];

  const getCurrentRoleData = () => {
    return roles.find(role => role.value === currentUserRole) || roles[3];
  };

  const canPromoteToRole = (targetRole) => {
    const hierarchy = { admin: 4, moderator: 3, editor: 2, contributor: 1 };
    return hierarchy[currentUserRole] > hierarchy[targetRole];
  };

  const handleRoleChange = async (newRole) => {
    if (!canPromoteToRole(newRole)) {
      alert('You cannot assign a role higher than or equal to your own');
      return;
    }

    setIsLoading(true);
    try {
      await onRoleUpdate(newRole);
      setSelectedRole(null);
    } catch (error) {
      console.error('Failed to update role:', error);
      alert('Failed to update role. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentRole = getCurrentRoleData();
  const CurrentRoleIcon = currentRole.icon;

  return (
    <div className="space-y-6">
      {/* Current Role Display */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg ${currentRole.bgColor}`}>
            <CurrentRoleIcon className={`h-6 w-6 ${currentRole.color}`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Role: {currentRole.label}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentRole.description}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Your Permissions:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentRole.permissions.map((permission, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {permission}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Role Management (for admins/moderators) */}
      {(currentUserRole === 'admin' || currentUserRole === 'moderator') && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Role Management
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Manage roles and permissions for club members
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => {
              const RoleIcon = role.icon;
              const canAssign = canPromoteToRole(role.value);

              return (
                <div
                  key={role.value}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedRole === role.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${!canAssign ? 'opacity-50' : 'cursor-pointer'}`}
                  onClick={() => canAssign && setSelectedRole(role.value)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${role.bgColor}`}>
                      <RoleIcon className={`h-4 w-4 ${role.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {role.label}
                        </h3>
                        {!canAssign && (
                          <Badge variant="secondary" className="text-xs">
                            Restricted
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {role.permissions.slice(0, 3).map((permission, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        {permission}
                      </div>
                    ))}
                    {role.permissions.length > 3 && (
                      <div className="text-xs text-gray-400">
                        +{role.permissions.length - 3} more permissions
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedRole && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Assign {roles.find(r => r.value === selectedRole)?.label} Role
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    You can assign this role to members when inviting them or through the member management interface.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRoleChange(selectedRole)}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Confirm Assignment'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedRole(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Role Hierarchy Info */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            Role Hierarchy
          </h3>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Roles are organized in a hierarchy where higher roles can manage lower roles:
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
            {roles.map((role, index) => {
              const RoleIcon = role.icon;
              return (
                <React.Fragment key={role.value}>
                  <div className="flex items-center gap-2">
                    <RoleIcon className={`h-4 w-4 ${role.color}`} />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {role.label}
                    </span>
                  </div>
                  {index < roles.length - 1 && (
                    <span className="text-gray-400 hidden sm:inline">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            • Admins can manage all roles<br/>
            • Moderators can manage Editors and Contributors<br/>
            • Members cannot change their own roles
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RoleManager;
