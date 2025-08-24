import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  MoreVertical,
  Mail,
  Shield,
  ShieldCheck,
  Edit3,
  Trash2,
  Crown,
  User
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';

const MemberList = ({ clubId, members, onInvite, onUpdateRole, onRemoveMember, currentUserRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const roleIcons = {
    admin: Crown,
    moderator: ShieldCheck,
    editor: Edit3,
    contributor: User
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    moderator: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    editor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    contributor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };

  const canManageRole = (memberRole) => {
    const hierarchy = { admin: 4, moderator: 3, editor: 2, contributor: 1 };
    return hierarchy[currentUserRole] > hierarchy[memberRole];
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = async (memberId, newRole) => {
    try {
      await onUpdateRole(memberId, newRole);
      setActiveDropdown(null);
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      try {
        await onRemoveMember(memberId);
      } catch (error) {
        console.error('Failed to remove member:', error);
      }
    }
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Club Members
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {members.length} member{members.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {(currentUserRole === 'admin' || currentUserRole === 'moderator') && (
          <Button onClick={onInvite}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="editor">Editor</option>
          <option value="contributor">Contributor</option>
        </select>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {searchTerm || roleFilter !== 'all' ? 'No members found' : 'No members yet'}
          </div>
        ) : (
          filteredMembers.map((member) => {
            const RoleIcon = roleIcons[member.role];
            return (
              <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    size="md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      {member.isOwner && (
                        <Badge variant="default" className="text-xs">
                          Owner
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${roleColors[member.role]}`}>
                        <RoleIcon className="h-3 w-3 mr-1" />
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </Badge>
                      {member.joinedDate && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Joined {new Date(member.joinedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {!member.isOwner && canManageRole(member.role) && (
                  <div className="relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === member.id ? null : member.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {activeDropdown === member.id && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">
                            Change Role
                          </div>

                          {['admin', 'moderator', 'editor', 'contributor']
                            .filter(role => role !== member.role && canManageRole(role))
                            .map((role) => {
                              const Icon = roleIcons[role];
                              return (
                                <button
                                  key={role}
                                  onClick={() => handleRoleChange(member.id, role)}
                                  className="w-full flex items-center gap-2 px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                >
                                  <Icon className="h-3 w-3" />
                                  {role.charAt(0).toUpperCase() + role.slice(1)}
                                </button>
                              );
                            })}

                          <hr className="my-1 border-gray-200 dark:border-gray-700" />

                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="w-full flex items-center gap-2 px-2 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remove Member
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default MemberList;
