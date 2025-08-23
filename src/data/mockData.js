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
  },
  {
    id: '4',
    title: 'Intercollege Football Tournament',
    description: 'Compete with top teams in an exciting football championship.',
    date: '2024-04-05',
    time: '16:00',
    location: 'Sports Ground',
    category: 'Sports',
    image: '/images/football.jpg',
    clubId: 'club4',
    attendees: 200,
    maxAttendees: 300,
    organizer: 'Sports Club',
    status: 'ongoing',
    tags: ['Football', 'Sports', 'Competition'],
    registrationDeadline: '2024-04-01'
  },
  {
    id: '5',
    title: 'Art Exhibition: Colors of Life',
    description: 'Showcase your creativity at our annual art exhibition.',
    date: '2024-04-10',
    time: '11:00',
    location: 'Art Gallery',
    category: 'Arts',
    image: '/images/art-exhibition.jpg',
    clubId: 'club5',
    attendees: 60,
    maxAttendees: 100,
    organizer: 'Arts Club',
    status: 'upcoming',
    tags: ['Art', 'Exhibition', 'Creativity'],
    registrationDeadline: '2024-04-08'
  },
  {
    id: '6',
    title: 'Academic Quiz Bowl',
    description: 'Test your knowledge and win prizes in our quiz competition.',
    date: '2024-04-15',
    time: '13:00',
    location: 'Lecture Hall 2',
    category: 'Academic',
    image: '/images/quiz-bowl.jpg',
    clubId: 'club6',
    attendees: 40,
    maxAttendees: 60,
    organizer: 'Academic Club',
    status: 'completed',
    tags: ['Quiz', 'Academic', 'Competition'],
    registrationDeadline: '2024-04-12'
  },
  {
    id: '7',
    title: 'Social Impact Hackathon',
    description: 'Collaborate to solve real-world social issues in a 24-hour hackathon.',
    date: '2024-04-20',
    time: '09:00',
    location: 'Innovation Hub',
    category: 'Social',
    image: '/images/social-hackathon.jpg',
    clubId: 'club7',
    attendees: 120,
    maxAttendees: 150,
    organizer: 'Social Club',
    status: 'upcoming',
    tags: ['Hackathon', 'Social', 'Impact'],
    registrationDeadline: '2024-04-18'
  },
  {
    id: '8',
    title: 'Health & Wellness Fair',
    description: 'Learn about healthy living and wellness from experts.',
    date: '2024-04-25',
    time: '10:00',
    location: 'Community Center',
    category: 'Health',
    image: '/images/health-fair.jpg',
    clubId: 'club8',
    attendees: 90,
    maxAttendees: 120,
    organizer: 'Health Club',
    status: 'upcoming',
    tags: ['Health', 'Wellness', 'Fair'],
    registrationDeadline: '2024-04-22'
  },
  {
    id: '9',
    title: 'Eco Awareness Drive',
    description: 'Join us to promote environmental sustainability on campus.',
    date: '2024-04-30',
    time: '15:00',
    location: 'Open Grounds',
    category: 'Environment',
    image: '/images/eco-drive.jpg',
    clubId: 'club9',
    attendees: 110,
    maxAttendees: 200,
    organizer: 'Eco Club',
    status: 'upcoming',
    tags: ['Environment', 'Sustainability', 'Awareness'],
    registrationDeadline: '2024-04-28'
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
  },
  {
    id: 'club4',
    name: 'Sports Club',
    description: 'Promoting fitness and teamwork through sports and games.',
    logo: '/images/sports-logo.jpg',
    banner: '/images/sports-banner.jpg',
    theme: {
      primary: '#e63946',
      secondary: '#f1faee',
      accent: '#457b9d'
    },
    members: 980,
    events: ['4'],
    category: 'Sports',
    founded: '2018-05-12',
    social: {
      website: 'https://sportsclub.nondan.com',
      email: 'info@sportsclub.nondan.com'
    }
  },
  {
    id: 'club5',
    name: 'Arts Club',
    description: 'A vibrant community for artists and art lovers.',
    logo: '/images/arts-logo.jpg',
    banner: '/images/arts-banner.jpg',
    theme: {
      primary: '#ffb4a2',
      secondary: '#6d6875',
      accent: '#b5838d'
    },
    members: 540,
    events: ['5'],
    category: 'Arts',
    founded: '2017-11-03',
    social: {
      website: 'https://artsclub.nondan.com',
      email: 'contact@artsclub.nondan.com'
    }
  },
  {
    id: 'club6',
    name: 'Academic Club',
    description: 'Encouraging academic excellence and curiosity.',
    logo: '/images/academic-logo.jpg',
    banner: '/images/academic-banner.jpg',
    theme: {
      primary: '#3a86ff',
      secondary: '#8338ec',
      accent: '#ffbe0b'
    },
    members: 720,
    events: ['6'],
    category: 'Academic',
    founded: '2016-02-28',
    social: {
      website: 'https://academicclub.nondan.com',
      email: 'hello@academicclub.nondan.com'
    }
  },
  {
    id: 'club7',
    name: 'Social Club',
    description: 'Building connections and making a positive impact.',
    logo: '/images/social-logo.jpg',
    banner: '/images/social-banner.jpg',
    theme: {
      primary: '#ff006e',
      secondary: '#fb5607',
      accent: '#ffbe0b'
    },
    members: 610,
    events: ['7'],
    category: 'Social',
    founded: '2015-08-19',
    social: {
      website: 'https://socialclub.nondan.com',
      email: 'info@socialclub.nondan.com'
    }
  },
  {
    id: 'club8',
    name: 'Health Club',
    description: 'Focusing on health, wellness, and a balanced lifestyle.',
    logo: '/images/health-logo.jpg',
    banner: '/images/health-banner.jpg',
    theme: {
      primary: '#06d6a0',
      secondary: '#118ab2',
      accent: '#ffd166'
    },
    members: 430,
    events: ['8'],
    category: 'Health',
    founded: '2019-04-22',
    social: {
      website: 'https://healthclub.nondan.com',
      email: 'contact@healthclub.nondan.com'
    }
  },
  {
    id: 'club9',
    name: 'Eco Club',
    description: 'Promoting environmental awareness and sustainability.',
    logo: '/images/eco-logo.jpg',
    banner: '/images/eco-banner.jpg',
    theme: {
      primary: '#43aa8b',
      secondary: '#90be6d',
      accent: '#4d908e'
    },
    members: 370,
    events: ['9'],
    category: 'Environment',
    founded: '2020-06-05',
    social: {
      website: 'https://ecoclub.nondan.com',
      email: 'hello@ecoclub.nondan.com'
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
