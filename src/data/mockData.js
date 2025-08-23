// Mock data for Nondan platform - easily replaceable with backend API

export const mockEvents = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'Join us for an exciting exploration of cutting-edge technologies and their impact on society.',
    date: '2024-03-15',
    time: '09:00',
    location: 'Main Auditorium',
    category: 'Technology',
    image: '/images/tech-summit.jpg',
    clubId: 'club1',
    attendees: 150,
    maxAttendees: 200,
    organizer: 'Tech Club',
    status: 'upcoming',
    tags: ['AI', 'Innovation', 'Networking'],
    registrationDeadline: '2024-03-10'
  },
  {
    id: '2',
    title: 'Cultural Diversity Workshop',
    description: 'Celebrate and learn about different cultures through interactive workshops and performances.',
    date: '2024-03-20',
    time: '14:00',
    location: 'Cultural Center',
    category: 'Cultural',
    image: '/images/cultural-workshop.jpg',
    clubId: 'club2',
    attendees: 85,
    maxAttendees: 120,
    organizer: 'Cultural Club',
    status: 'upcoming',
    tags: ['Culture', 'Diversity', 'Workshop'],
    registrationDeadline: '2024-03-18'
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    description: 'Present your innovative business ideas to a panel of expert judges and investors.',
    date: '2024-03-25',
    time: '10:00',
    location: 'Innovation Lab',
    category: 'Business',
    image: '/images/startup-pitch.jpg',
    clubId: 'club3',
    attendees: 75,
    maxAttendees: 100,
    organizer: 'Entrepreneurship Club',
    status: 'upcoming',
    tags: ['Startup', 'Business', 'Innovation'],
    registrationDeadline: '2024-03-22'
  }
];

export const mockClubs = [
  {
    id: 'club1',
    name: 'Tech Club',
    description: 'Technology and innovation community fostering digital literacy and cutting-edge development.',
    logo: '/images/tech-logo.jpg',
    banner: '/images/tech-banner.jpg',
    theme: {
      primary: '#007bff',
      secondary: '#6c757d',
      accent: '#0056b3'
    },
    members: 1250,
    events: ['1'],
    category: 'Technology',
    founded: '2020-01-15',
    social: {
      website: 'https://techhub.nondan.com',
      email: 'contact@techhub.nondan.com'
    }
  },
  {
    id: 'club2',
    name: 'Cultural Club',
    description: 'Celebrating diversity and promoting cross-cultural understanding through events and activities.',
    logo: '/images/cultural-logo.jpg',
    banner: '/images/cultural-banner.jpg',
    theme: {
      primary: '#28a745',
      secondary: '#6c757d',
      accent: '#1e7e34'
    },
    members: 890,
    events: ['2'],
    category: 'Cultural',
    founded: '2019-09-20',
    social: {
      website: 'https://culturalclub.nondan.com',
      email: 'info@culturalclub.nondan.com'
    }
  },
  {
    id: 'club3',
    name: 'Entrepreneurship Club',
    description: 'Supporting aspiring entrepreneurs with resources, mentorship, and networking opportunities.',
    logo: '/images/business-logo.jpg',
    banner: '/images/business-banner.jpg',
    theme: {
      primary: '#ffc107',
      secondary: '#6c757d',
      accent: '#e0a800'
    },
    members: 650,
    events: ['3'],
    category: 'Business',
    founded: '2021-03-10',
    social: {
      website: 'https://entrepreneurclub.nondan.com',
      email: 'hello@entrepreneurclub.nondan.com'
    }
  }
];

export const mockUsers = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    registeredEvents: ['1', '3'],
    profileImage: '/images/user1.jpg',
    joinedDate: '2023-09-01',
    preferences: {
      notifications: true,
      theme: 'light',
      categories: ['Technology', 'Business']
    }
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    registeredEvents: ['2'],
    profileImage: '/images/user2.jpg',
    joinedDate: '2023-08-15',
    preferences: {
      notifications: true,
      theme: 'dark',
      categories: ['Cultural', 'Technology']
    }
  },
  {
    id: 'user3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'student',
    registeredEvents: ['1', '2'],
    profileImage: '/images/user3.jpg',
    joinedDate: '2023-10-01',
    preferences: {
      notifications: false,
      theme: 'light',
      categories: ['Technology', 'Cultural']
    }
  }
];

// Club role management system
export const mockClubMembers = [
  {
    id: 'member1',
    userId: 'user1',
    clubId: 'club1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    joinedAt: '2024-01-15',
    invitedBy: null // null for original admin
  },
  {
    id: 'member2',
    userId: 'user2',
    clubId: 'club1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'moderator',
    joinedAt: '2024-02-01',
    invitedBy: 'user1'
  },
  {
    id: 'member3',
    userId: 'user3',
    clubId: 'club1',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'editor',
    joinedAt: '2024-02-15',
    invitedBy: 'user1'
  }
];

export const mockClubInvitations = [
  {
    id: 'invite1',
    clubId: 'club1',
    email: 'newuser@example.com',
    role: 'editor',
    invitedBy: 'user1',
    status: 'pending', // pending, accepted, declined, expired
    invitedAt: '2024-03-01',
    expiresAt: '2024-03-08'
  }
];

export const mockCertificates = [
  {
    id: 'cert1',
    userId: 'user1',
    eventId: '1',
    issueDate: '2024-02-20',
    certificateId: 'NONDAN-TECH-2024-001',
    verified: true
  },
  {
    id: 'cert2',
    userId: 'user1',
    eventId: '3',
    issueDate: '2024-02-25',
    certificateId: 'NONDAN-BIZ-2024-002',
    verified: true
  }
];

// Club role permissions
export const clubRolePermissions = {
  admin: {
    canDeleteClub: true,
    canManageRoles: true,
    canInviteMembers: true,
    canRemoveMembers: true,
    canCreateEvents: true,
    canEditAllEvents: true,
    canDeleteAllEvents: true,
    canManageClubSettings: true,
    canViewAnalytics: true
  },
  moderator: {
    canDeleteClub: false,
    canManageRoles: false,
    canInviteMembers: true,
    canRemoveMembers: true,
    canCreateEvents: true,
    canEditAllEvents: true,
    canDeleteAllEvents: true,
    canManageClubSettings: false,
    canViewAnalytics: true
  },
  editor: {
    canDeleteClub: false,
    canManageRoles: false,
    canInviteMembers: false,
    canRemoveMembers: false,
    canCreateEvents: true,
    canEditAllEvents: true,
    canDeleteAllEvents: false,
    canManageClubSettings: false,
    canViewAnalytics: false
  },
  contributor: {
    canDeleteClub: false,
    canManageRoles: false,
    canInviteMembers: false,
    canRemoveMembers: false,
    canCreateEvents: true,
    canEditAllEvents: false,
    canDeleteAllEvents: false,
    canManageClubSettings: false,
    canViewAnalytics: false
  }
};
