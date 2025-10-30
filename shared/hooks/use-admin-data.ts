import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  getDonations,
  updateDonationStatus as updateDonationStatusService,
  deleteDonation as deleteDonationService,
  subscribeToDonations,
} from '@/services/firebase/donations';
import {
  getVolunteers,
  updateVolunteerStatus as updateVolunteerStatusService,
  deleteVolunteer as deleteVolunteerService,
  subscribeToVolunteers,
} from '@/services/firebase/volunteers';
import {
  getEvents,
  updateEventStatus as updateEventStatusService,
  deleteEvent as deleteEventService,
  subscribeToEvents,
} from '@/services/firebase/events';
import {
  getBlogPosts,
  updateBlogPostStatus as updateBlogPostStatusService,
  deleteBlogPost as deleteBlogPostService,
  subscribeToBlogPosts,
} from '@/services/firebase/blogs';
import {
  getAnalyticsData,
} from '@/services/firebase/analytics';
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

// Hook for donations data
export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    const loadDonations = async () => {
      try {
        setLoading(true);
        const data = await getDonations();
        setDonations(data);
        setError(null);
      } catch (err) {
        console.error('Error loading donations:', err);
        const errorMessage = 'Failed to load donations';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadDonations();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToDonations((data) => {
      setDonations(data);
      setError(null);
    });

    return unsubscribe;
  }, []);

  const updateDonationStatus = async (id: string, status: DonationStatus) => {
    try {
      await updateDonationStatusService(id, status);
      toast.success('Donation status updated successfully');
    } catch (err) {
      console.error('Error updating donation status:', err);
      const errorMessage = 'Failed to update donation status';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteDonation = async (id: string) => {
    try {
      await deleteDonationService(id);
      toast.success('Donation deleted successfully');
    } catch (err) {
      console.error('Error deleting donation:', err);
      const errorMessage = 'Failed to delete donation';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  return {
    donations,
    loading,
    error,
    updateDonationStatus,
    deleteDonation
  };
}

// Hook for volunteers data
export function useVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    const loadVolunteers = async () => {
      try {
        setLoading(true);
        const data = await getVolunteers();
        setVolunteers(data);
        setError(null);
      } catch (err) {
        console.error('Error loading volunteers:', err);
        const errorMessage = 'Failed to load volunteers';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadVolunteers();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToVolunteers((data) => {
      setVolunteers(data);
      setError(null);
    });

    return unsubscribe;
  }, []);

  const updateVolunteerStatus = async (id: string, status: VolunteerStatus) => {
    try {
      await updateVolunteerStatusService(id, status);
      toast.success('Volunteer status updated successfully');
    } catch (err) {
      console.error('Error updating volunteer status:', err);
      const errorMessage = 'Failed to update volunteer status';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteVolunteer = async (id: string) => {
    try {
      await deleteVolunteerService(id);
      toast.success('Volunteer deleted successfully');
    } catch (err) {
      console.error('Error deleting volunteer:', err);
      const errorMessage = 'Failed to delete volunteer';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  return {
    volunteers,
    loading,
    error,
    updateVolunteerStatus,
    deleteVolunteer
  };
}

// Hook for events data
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error('Error loading events:', err);
        const errorMessage = 'Failed to load events';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data);
      setError(null);
    });

    return unsubscribe;
  }, []);

  const updateEventStatus = async (id: string, status: EventStatus) => {
    try {
      await updateEventStatusService(id, status);
      toast.success('Event status updated successfully');
    } catch (err) {
      console.error('Error updating event status:', err);
      const errorMessage = 'Failed to update event status';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await deleteEventService(id);
      toast.success('Event deleted successfully');
    } catch (err) {
      console.error('Error deleting event:', err);
      const errorMessage = 'Failed to delete event';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    updateEventStatus,
    deleteEvent
  };
}

// Hook for blog posts data
export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        setBlogPosts(data);
        setError(null);
      } catch (err) {
        console.error('Error loading blog posts:', err);
        const errorMessage = 'Failed to load blog posts';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToBlogPosts((data) => {
      setBlogPosts(data);
      setError(null);
    });

    return unsubscribe;
  }, []);

  const updateBlogStatus = async (id: string, status: BlogStatus) => {
    try {
      await updateBlogPostStatusService(id, status);
      toast.success('Blog post status updated successfully');
    } catch (err) {
      console.error('Error updating blog post status:', err);
      const errorMessage = 'Failed to update blog post status';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await deleteBlogPostService(id);
      toast.success('Blog post deleted successfully');
    } catch (err) {
      console.error('Error deleting blog post:', err);
      const errorMessage = 'Failed to delete blog post';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  return {
    blogPosts,
    loading,
    error,
    updateBlogStatus,
    deleteBlogPost
  };
}

// Hook for analytics data
export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load analytics data
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getAnalyticsData();
        setAnalytics(data);
        setError(null);
      } catch (err) {
        console.error('Error loading analytics:', err);
        const errorMessage = 'Failed to load analytics';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
    
    // Refresh analytics every 5 minutes
    const interval = setInterval(loadAnalytics, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    analytics,
    loading,
    error
  };
}