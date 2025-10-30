import { 
  Donation, 
  Volunteer, 
  Event, 
  BlogPost, 
  AnalyticsData,
  DonationStatus,
  VolunteerStatus,
  EventStatus,
  BlogStatus
} from '@/shared/utils/types/admin';

// Mock Donations Data
export const mockDonations: Donation[] = [
  {
    id: 'don-001',
    donorName: 'Sarah Johnson',
    donorEmail: 'sarah.johnson@email.com',
    donorPhone: '+1 (555) 123-4567',
    items: [
      { id: 'item-1', category: 'Clothing', type: 'Winter Jackets', quantity: 3, condition: 'excellent', description: 'Barely used winter jackets, sizes M-L' },
      { id: 'item-2', category: 'Clothing', type: 'Jeans', quantity: 5, condition: 'good', description: 'Various sizes, good condition' }
    ],
    totalItems: 8,
    status: 'confirmed' as DonationStatus,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
    location: 'Downtown Community Center',
    notes: 'Items are clean and ready for distribution',
    assignedVolunteer: 'John Smith'
  },
  {
    id: 'don-002',
    donorName: 'Michael Chen',
    donorEmail: 'michael.chen@email.com',
    donorPhone: '+1 (555) 234-5678',
    items: [
      { id: 'item-3', category: 'Electronics', type: 'Laptops', quantity: 2, condition: 'good', description: 'Working laptops for students' },
      { id: 'item-4', category: 'Books', type: 'Textbooks', quantity: 15, condition: 'excellent', description: 'University textbooks, various subjects' }
    ],
    totalItems: 17,
    status: 'pending' as DonationStatus,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    location: 'University Campus',
    notes: 'Need to verify laptop functionality'
  },
  {
    id: 'don-003',
    donorName: 'Emma Rodriguez',
    donorEmail: 'emma.rodriguez@email.com',
    donorPhone: '+1 (555) 345-6789',
    items: [
      { id: 'item-5', category: 'Household', type: 'Kitchen Appliances', quantity: 4, condition: 'good', description: 'Microwave, toaster, blender, coffee maker' }
    ],
    totalItems: 4,
    status: 'collected' as DonationStatus,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-17'),
    location: 'Westside Pickup Point',
    assignedVolunteer: 'Maria Garcia'
  },
  {
    id: 'don-004',
    donorName: 'David Wilson',
    donorEmail: 'david.wilson@email.com',
    donorPhone: '+1 (555) 456-7890',
    items: [
      { id: 'item-6', category: 'Clothing', type: 'Children\'s Clothes', quantity: 12, condition: 'excellent', description: 'Kids clothing, ages 5-10' }
    ],
    totalItems: 12,
    status: 'distributed' as DonationStatus,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    location: 'Children\'s Center',
    assignedVolunteer: 'Lisa Thompson'
  }
];

// Mock Volunteers Data
export const mockVolunteers: Volunteer[] = [
  {
    id: 'vol-001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 111-2222',
    status: 'active' as VolunteerStatus,
    skills: ['Event Organization', 'Public Speaking', 'Community Outreach'],
    availability: ['Weekends', 'Evenings'],
    location: 'Downtown',
    experienceLevel: 'experienced',
    joinedAt: new Date('2023-06-15'),
    lastActive: new Date('2024-01-18'),
    completedTasks: 45,
    rating: 4.8,
    bio: 'Passionate community volunteer with 3 years of experience in organizing donation drives.'
  },
  {
    id: 'vol-002',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 222-3333',
    status: 'active' as VolunteerStatus,
    skills: ['Logistics', 'Data Entry', 'Customer Service'],
    availability: ['Weekdays', 'Mornings'],
    location: 'Westside',
    experienceLevel: 'intermediate',
    joinedAt: new Date('2023-08-20'),
    lastActive: new Date('2024-01-17'),
    completedTasks: 32,
    rating: 4.6,
    bio: 'Reliable volunteer specializing in logistics and coordination.'
  },
  {
    id: 'vol-003',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    phone: '+1 (555) 333-4444',
    status: 'pending' as VolunteerStatus,
    skills: ['Teaching', 'Child Care', 'Social Work'],
    availability: ['Weekends', 'Afternoons'],
    location: 'Eastside',
    experienceLevel: 'beginner',
    joinedAt: new Date('2024-01-10'),
    completedTasks: 0,
    rating: 0,
    bio: 'New volunteer excited to help families and children in need.'
  },
  {
    id: 'vol-004',
    name: 'Robert Kim',
    email: 'robert.kim@email.com',
    phone: '+1 (555) 444-5555',
    status: 'inactive' as VolunteerStatus,
    skills: ['IT Support', 'Website Management', 'Social Media'],
    availability: ['Evenings'],
    location: 'Northside',
    experienceLevel: 'experienced',
    joinedAt: new Date('2023-03-10'),
    lastActive: new Date('2023-12-05'),
    completedTasks: 28,
    rating: 4.5,
    bio: 'Tech-savvy volunteer helping with digital initiatives.'
  }
];

// Mock Events Data
export const mockEvents: Event[] = [
  {
    id: 'evt-001',
    title: 'Winter Clothing Drive',
    description: 'Community event to collect winter clothing for homeless shelters',
    type: 'collection',
    status: 'ongoing' as EventStatus,
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-02-10'),
    location: 'Community Center, 123 Main St',
    maxParticipants: 50,
    registeredParticipants: 32,
    organizer: 'John Smith',
    requirements: ['Volunteers for sorting', 'Collection boxes', 'Transportation'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'evt-002',
    title: 'Food Distribution Event',
    description: 'Monthly food distribution to local families in need',
    type: 'distribution',
    status: 'published' as EventStatus,
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-02-15'),
    location: 'Food Bank, 456 Oak Ave',
    maxParticipants: 25,
    registeredParticipants: 18,
    organizer: 'Maria Garcia',
    requirements: ['Food sorting volunteers', 'Distribution setup', 'Registration desk'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'evt-003',
    title: 'Community Awareness Workshop',
    description: 'Educational workshop about homelessness and community support',
    type: 'awareness',
    status: 'completed' as EventStatus,
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-01-08'),
    location: 'Public Library, 789 Elm St',
    registeredParticipants: 45,
    organizer: 'Lisa Thompson',
    requirements: ['Presentation materials', 'Refreshments', 'Setup crew'],
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2024-01-09')
  },
  {
    id: 'evt-004',
    title: 'Spring Fundraising Gala',
    description: 'Annual fundraising gala to support our mission',
    type: 'fundraising',
    status: 'draft' as EventStatus,
    startDate: new Date('2024-04-15'),
    endDate: new Date('2024-04-15'),
    location: 'Grand Hotel Ballroom',
    maxParticipants: 200,
    registeredParticipants: 0,
    organizer: 'Robert Kim',
    requirements: ['Event planning committee', 'Catering', 'Entertainment', 'Auction items'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  }
];

// Mock Blog Posts Data
export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'The Impact of Community Donations: A Year in Review',
    slug: 'impact-community-donations-year-review',
    summary: 'Looking back at the incredible impact our community has made through donations and volunteer efforts in 2023.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: 'Sarah Williams',
    authorId: 'user-001',
    status: 'published' as BlogStatus,
    featuredImage: '/images/blog/community-impact.jpg',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'blog-002',
    title: 'How to Organize a Successful Clothing Drive',
    slug: 'organize-successful-clothing-drive',
    summary: 'A comprehensive guide to planning and executing community clothing drives that make a real difference.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: 'Michael Johnson',
    authorId: 'user-002',
    status: 'published' as BlogStatus,
    featuredImage: '/images/blog/clothing-drive.jpg',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'blog-003',
    title: 'Volunteer Spotlight: Meet Our Amazing Team',
    slug: 'volunteer-spotlight-amazing-team',
    summary: 'Getting to know the dedicated volunteers who make our mission possible.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    author: 'Emma Davis',
    authorId: 'user-003',
    status: 'draft' as BlogStatus,
    featuredImage: '/images/blog/volunteers.jpg',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-17'),
  }
];

// Mock Analytics Data
export const mockAnalytics: AnalyticsData = {
  totalDonations: 1247,
  totalVolunteers: 89,
  totalEvents: 23,
  totalBeneficiaries: 2341,
  monthlyDonations: [
    { month: 'Jan', count: 145, value: 12400 },
    { month: 'Feb', count: 132, value: 11200 },
    { month: 'Mar', count: 167, value: 14500 },
    { month: 'Apr', count: 189, value: 16800 },
    { month: 'May', count: 156, value: 13900 },
    { month: 'Jun', count: 198, value: 17200 }
  ],
  donationsByCategory: [
    { category: 'Clothing', count: 567, percentage: 45.5 },
    { category: 'Electronics', count: 234, percentage: 18.8 },
    { category: 'Household', count: 189, percentage: 15.2 },
    { category: 'Books', count: 145, percentage: 11.6 },
    { category: 'Toys', count: 112, percentage: 8.9 }
  ],
  volunteerActivity: [
    { date: '2024-01-01', activeVolunteers: 45 },
    { date: '2024-01-08', activeVolunteers: 52 },
    { date: '2024-01-15', activeVolunteers: 48 },
    { date: '2024-01-22', activeVolunteers: 55 }
  ],
  eventParticipation: [
    { event: 'Winter Clothing Drive', participants: 32 },
    { event: 'Food Distribution', participants: 18 },
    { event: 'Awareness Workshop', participants: 45 },
    { event: 'Community Cleanup', participants: 28 }
  ],
  recentActivity: [
    {
      id: 'act-001',
      type: 'donation',
      description: 'New donation received from Sarah Johnson',
      timestamp: new Date('2024-01-18T10:30:00')
    },
    {
      id: 'act-002',
      type: 'volunteer',
      description: 'Lisa Thompson joined as a volunteer',
      timestamp: new Date('2024-01-18T09:15:00')
    },
    {
      id: 'act-003',
      type: 'event',
      description: 'Winter Clothing Drive reached 50% capacity',
      timestamp: new Date('2024-01-17T16:45:00')
    }
  ]
};