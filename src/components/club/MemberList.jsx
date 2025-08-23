import React, { useState } from 'react';
import { Users, Crown, Shield, Edit, UserPlus, MoreVertical, Trash2 } from 'lucide-react';

const MemberList = ({ members, currentUserRole, onRoleChange, onRemoveMember, hasPermission }) => {
  const [showActions, setShowActions] = useState(null);

  const roleIcons = {
    admin: Crown,
    moderator: Shield,
    editor: Edit,
    contributor: UserPlus
  };

  const roleColors = {
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    moderator: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    editor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    contributor: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };

  const canManageRoles = hasPermission('canManageRoles');
  const canRemoveMembers = hasPermission('canRemoveMembers');

  const handleRoleChange = (memberId, newRole) => {
    onRoleChange(memberId, newRole);
    setShowActions(null);
  };

  const handleRemoveMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member from the club?')) {
      onRemoveMember(memberId);
      setShowActions(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Club Members ({members.length})
          </h3>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {members.map((member) => {
          const RoleIcon = roleIcons[member.role];
          const roleColorClass = roleColors[member.role];

          return (
            <div key={member.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {member.name?.charAt(0) || 'U'}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {member.name || 'Unknown User'}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.email || 'No email'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Joined {new Date(member.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Role Badge */}
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColorClass}`}>
                  <RoleIcon className="h-3 w-3 mr-1" />
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </div>

                {/* Actions Menu */}
                {(canManageRoles || canRemoveMembers) && (
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(showActions === member.id ? null : member.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {showActions === member.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                        <div className="py-1">
                          {canManageRoles && (
                            <>
                              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Change Role
                              </div>
                              {Object.keys(roleIcons).map((role) => (
                                <button
                                  key={role}
                                  onClick={() => handleRoleChange(member.id, role)}
                                  disabled={member.role === role}
                                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                    member.role === role
                                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    {React.createElement(roleIcons[role], { className: 'h-4 w-4 mr-2' })}
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                    {member.role === role && (
                                      <span className="ml-auto text-xs">(current)</span>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </>
                          )}

                          {canRemoveMembers && member.role !== 'admin' && (
                            <>
                              {canManageRoles && <div className="border-t border-gray-200 dark:border-gray-700 my-1" />}
                              <button
                                onClick={() => handleRemoveMember(member.id)}
                                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove Member
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {members.length === 0 && (
          <div className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">No members yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Invite members to start building your club community.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;
