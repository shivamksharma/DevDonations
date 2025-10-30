export type DonationStatus = 'pending' | 'confirmed' | 'collected' | 'distributed' | 'cancelled';
export type VolunteerStatus = 'pending' | 'approved' | 'active' | 'inactive' | 'rejected';
export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
export type BlogStatus = 'draft' | 'published' | 'archived';

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  items: DonationItem[];
  totalItems: number;
  status: DonationStatus;
  createdAt: Date;
  updatedAt: Date;
  location: string;
  notes?: string;
  assignedVolunteer?: string;
}

export interface DonationItem {
  id: string;
  category: string;
  type: string;
  quantity: number;
  condition: 'excellent' | 'good' | 'fair';
  description?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: VolunteerStatus;
  skills: string[];
  availability: string[];
  location: string;
  experienceLevel: 'beginner' | 'intermediate' | 'experienced';
  joinedAt: Date;
  lastActive?: Date;
  completedTasks: number;
  rating: number;
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'collection' | 'distribution' | 'awareness' | 'fundraising';
  status: EventStatus;
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants?: number;
  registeredParticipants: number;
  organizer: string;
  requirements: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string; // Short description for cards
  content: string; // Rich HTML content
  author: string;
  authorId: string; // User UID reference
  status: BlogStatus;
  featuredImage: string; // Firebase Storage URL
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsData {
  totalDonations: number;
  totalVolunteers: number;
  totalEvents: number;
  totalBeneficiaries: number;
  monthlyDonations: Array<{ month: string; count: number; value: number }>;
  donationsByCategory: Array<{ category: string; count: number; percentage: number }>;
  volunteerActivity: Array<{ date: string; activeVolunteers: number }>;
  eventParticipation: Array<{ event: string; participants: number }>;
  recentActivity: Array<{
    id: string;
    type: 'donation' | 'volunteer' | 'event';
    description: string;
    timestamp: Date;
  }>;
}