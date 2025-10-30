import { getDonations } from './donations';
import { getVolunteers } from './volunteers';
import { getEvents } from './events';
import { getPublishedBlogPosts } from './blogs';
import { AnalyticsData } from '@/shared/utils/types/admin';

// Helper to get month name
const getMonthName = (monthIndex: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

// Get current year months
const getCurrentYearMonths = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const months = [];
  for (let i = 0; i <= currentMonth; i++) {
    months.push({
      month: getMonthName(i),
      monthIndex: i,
      year: currentYear,
    });
  }
  return months;
};

// Calculate analytics data from Firebase collections
export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    // Fetch all data in parallel
    const [donations, volunteers, events, blogPosts] = await Promise.all([
      getDonations(),
      getVolunteers(),
      getEvents(),
      getPublishedBlogPosts(),
    ]);

    // Calculate totals
    const totalDonations = donations.length;
    const totalVolunteers = volunteers.length;
    const totalEvents = events.length;
    const totalBeneficiaries = donations.reduce((sum, donation) => sum + donation.totalItems, 0);

    // Calculate monthly donations (simplified - in real app, you'd group by month)
    const monthlyDonations = donations.reduce((acc, donation) => {
      const month = donation.createdAt?.toLocaleString('default', { month: 'long', year: 'numeric' }) || 'Unknown';
      const existing = acc.find(item => item.month === month);
      if (existing) {
        existing.count += 1;
        existing.value += donation.totalItems; // Using totalItems as value for simplicity
      } else {
        acc.push({ month, count: 1, value: donation.totalItems });
      }
      return acc;
    }, [] as Array<{ month: string; count: number; value: number }>);

    // Calculate donations by category
    const categoryMap = new Map<string, number>();
    donations.forEach(donation => {
      donation.items.forEach(item => {
        const count = categoryMap.get(item.category) || 0;
        categoryMap.set(item.category, count + item.quantity);
      });
    });

    const totalItems = Array.from(categoryMap.values()).reduce((sum, count) => sum + count, 0);
    const donationsByCategory = Array.from(categoryMap.entries()).map(([category, count]) => ({
      category,
      count,
      percentage: totalItems > 0 ? Math.round((count / totalItems) * 100) : 0,
    }));

    // Calculate volunteer activity (simplified)
    const volunteerActivity = volunteers
      .filter(v => v.lastActive)
      .slice(0, 30) // Last 30 active volunteers
      .map(v => ({
        date: v.lastActive!.toISOString().split('T')[0],
        activeVolunteers: 1,
      }));

    // Calculate event participation
    const eventParticipation = events.map(event => ({
      event: event.title,
      participants: event.registeredParticipants,
    }));

    // Calculate recent activity
    const recentActivity = [
      ...donations.slice(0, 5).map(d => ({
        id: d.id,
        type: 'donation' as const,
        description: `New donation from ${d.donorName}`,
        timestamp: d.createdAt!,
      })),
      ...volunteers.slice(0, 3).map(v => ({
        id: v.id,
        type: 'volunteer' as const,
        description: `${v.name} joined as volunteer`,
        timestamp: v.joinedAt!,
      })),
      ...events.slice(0, 3).map(e => ({
        id: e.id,
        type: 'event' as const,
        description: `Event "${e.title}" ${e.status}`,
        timestamp: e.createdAt!,
      })),
    ]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);

    return {
      totalDonations,
      totalVolunteers,
      totalEvents,
      totalBeneficiaries,
      monthlyDonations,
      donationsByCategory,
      volunteerActivity,
      eventParticipation,
      recentActivity,
    };
  } catch (error) {
    console.error('Error calculating analytics:', error);
    throw error;
  }
};

// Get dashboard stats (simplified version for quick loading)
export const getDashboardStats = async () => {
  try {
    const [donations, volunteers, events] = await Promise.all([
      getDonations(),
      getVolunteers(),
      getEvents(),
    ]);

    return {
      totalDonations: donations.length,
      totalVolunteers: volunteers.length,
      totalEvents: events.length,
      totalBeneficiaries: donations.reduce((sum, donation) => sum + donation.totalItems, 0),
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Get donation trends for charts
export const getDonationTrends = async () => {
  try {
    const donations = await getDonations();
    const months = getCurrentYearMonths();
    const trendData = months.map(m => ({ ...m, donations: 0, value: 0 }));
    
    donations.forEach((donation) => {
      const createdAt = donation.createdAt;
      
      if (createdAt && createdAt.getFullYear() === new Date().getFullYear()) {
        const monthIndex = createdAt.getMonth();
        const monthData = trendData.find(m => m.monthIndex === monthIndex);
        
        if (monthData) {
          monthData.donations += 1;
          const estimatedValue = donation.totalItems * 150; // $150 avg per item
          monthData.value += estimatedValue;
        }
      }
    });
    
    return trendData.map(({ month, donations, value }) => ({ month, donations, value }));
  } catch (error) {
    console.error('Error getting donation trends:', error);
    return [];
  }
};

// Get category distribution for charts
export const getCategoryDistribution = async () => {
  try {
    const donations = await getDonations();
    const categoryMap: Record<string, number> = {};
    let total = 0;
    
    donations.forEach((donation) => {
      const items = donation.items || [];
      
      items.forEach((item: any) => {
        const category = item.category || 'Other';
        categoryMap[category] = (categoryMap[category] || 0) + (item.quantity || 1);
        total += item.quantity || 1;
      });
    });
    
    return Object.entries(categoryMap)
      .map(([category, count]) => ({
        category,
        count,
        percentage: total > 0 ? Number(((count / total) * 100).toFixed(1)) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  } catch (error) {
    console.error('Error getting category distribution:', error);
    return [];
  }
};

// Get volunteer activity trends for charts
export const getVolunteerActivity = async () => {
  try {
    const volunteers = await getVolunteers();
    const months = getCurrentYearMonths();
    const activityData = months.map(m => ({ ...m, active: 0, new: 0, hours: 0 }));
    
    volunteers.forEach((volunteer) => {
      const joinedAt = volunteer.joinedAt;
      const status = volunteer.status;
      
      if (joinedAt && joinedAt.getFullYear() === new Date().getFullYear()) {
        const monthIndex = joinedAt.getMonth();
        
        const newMonthData = activityData.find(m => m.monthIndex === monthIndex);
        if (newMonthData) {
          newMonthData.new += 1;
        }
        
        if (status === 'active' || status === 'approved') {
          const currentMonth = new Date().getMonth();
          for (let i = monthIndex; i <= currentMonth; i++) {
            const activeMonthData = activityData.find(m => m.monthIndex === i);
            if (activeMonthData) {
              activeMonthData.active += 1;
              activeMonthData.hours += volunteer.completedTasks * 2 || 15;
            }
          }
        }
      }
    });
    
    return activityData.map(({ month, active, new: newCount, hours }) => ({
      month,
      active,
      new: newCount,
      hours,
    }));
  } catch (error) {
    console.error('Error getting volunteer activity:', error);
    return [];
  }
};

// Get status overview for pie chart
export const getStatusOverview = async () => {
  try {
    const donations = await getDonations();
    
    const statusMap: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      collected: 0,
      distributed: 0,
    };
    
    donations.forEach((donation) => {
      const status = donation.status?.toLowerCase() || 'pending';
      if (statusMap[status] !== undefined) {
        statusMap[status] += 1;
      }
    });
    
    const colorMap: Record<string, string> = {
      pending: '#f59e0b',
      confirmed: '#3b82f6',
      collected: '#8b5cf6',
      distributed: '#10b981',
    };
    
    return Object.entries(statusMap).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: colorMap[name],
    }));
  } catch (error) {
    console.error('Error getting status overview:', error);
    return [];
  }
};

// Get comprehensive analytics including chart data
export const getComprehensiveAnalytics = async () => {
  try {
    const [
      analyticsData,
      donationTrends,
      categoryDistribution,
      volunteerActivity,
      statusOverview
    ] = await Promise.all([
      getAnalyticsData(),
      getDonationTrends(),
      getCategoryDistribution(),
      getVolunteerActivity(),
      getStatusOverview(),
    ]);
    
    return {
      ...analyticsData,
      donationTrends,
      categoryDistribution,
      volunteerActivity,
      statusOverview,
    };
  } catch (error) {
    console.error('Error getting comprehensive analytics:', error);
    throw error;
  }
};