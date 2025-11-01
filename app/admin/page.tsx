"use client";

import { useState, useEffect } from 'react';
import { RealTimeStats } from '@/admin/components/dashboard/real-time-stats';
import { DonationsTable } from '@/admin/components/dashboard/donations-table';
import { VolunteersTable } from '@/admin/components/dashboard/volunteers-table';
import { NotificationCenter } from '@/admin/components/notification-center';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useAuth } from '@/shared/lib/context/auth-context';
import { LoadingState } from '@/shared/components/ui/loading-state';
import { BarChart3, Calendar, Gift, Users, Zap, TrendingUp, Activity } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { getEvents } from '@/services/firebase/events';
import { getComprehensiveAnalytics } from '@/services/firebase/analytics';
import { DonationsChart } from '@/admin/components/analytics/donations-chart';
import { CategoryDistributionChart } from '@/admin/components/analytics/category-distribution-chart';
import { VolunteerActivityChart } from '@/admin/components/analytics/volunteer-activity-chart';
import { StatusOverviewChart } from '@/admin/components/analytics/status-overview-chart';
import type { ComprehensiveAnalytics } from '@/shared/utils/types/admin';



export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<ComprehensiveAnalytics | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsData, analyticsData] = await Promise.all([
          getEvents(),
          getComprehensiveAnalytics(),
        ]);
        setEvents(eventsData.slice(0, 3)); // Get latest 3 events
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (!loading && user && isAdmin) {
      fetchDashboardData();
    }
  }, [loading, user, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <LoadingState label="Loading dashboard..." />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // The ProtectedAdminRoute will handle the redirect
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.displayName || 'Admin'}! 👋
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">System Online</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">+12% This Month</span>
          </Badge>
        </div>
      </div>

      {/* Real-Time Stats Cards */}
      <RealTimeStats />

      {/* Analytics Overview Section */}
      {analytics && (
        <div className="grid gap-6 md:grid-cols-2">
          <DonationsChart data={analytics.donationTrends} />
          <CategoryDistributionChart data={analytics.categoryDistribution} />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="xl:col-span-8 space-y-6">
          <Card className="border-muted/40 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Management Dashboard</CardTitle>
              <CardDescription className="text-base">
                Manage donations, volunteers, events, and view analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="donations" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50">
                  <TabsTrigger 
                    value="donations" 
                    className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <Gift className="h-4 w-4" />
                    <span className="hidden sm:inline">Donations</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="volunteers" 
                    className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">Volunteers</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="events" 
                    className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Events</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="donations" className="space-y-4 mt-6">
                  <DonationsTable />
                </TabsContent>
                
                <TabsContent value="volunteers" className="space-y-4 mt-6">
                  <VolunteersTable />
                </TabsContent>

                <TabsContent value="events" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Recent Events</h3>
                        <p className="text-sm text-muted-foreground">Overview of upcoming and ongoing events</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {loadingData ? (
                        <LoadingState label="Loading events..." />
                      ) : events.length > 0 ? (
                        events.map((event, index) => {
                          const statusColors: Record<string, string> = {
                            ongoing: 'bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20',
                            upcoming: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20',
                            completed: 'bg-muted text-muted-foreground',
                            published: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
                          };
                          
                          const iconColors: Record<string, string> = {
                            ongoing: 'bg-green-500/10 text-green-600 dark:text-green-400',
                            upcoming: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                            completed: 'bg-muted text-muted-foreground',
                            published: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                          };

                          return (
                            <div key={event.id || index} className="flex items-center justify-between p-4 border border-muted/40 rounded-lg bg-card hover:bg-accent/5 transition-colors">
                              <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${iconColors[event.status] || 'bg-primary/10'}`}>
                                  <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-semibold">{event.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {event.status} • {event.registeredParticipants} participants
                                  </p>
                                </div>
                              </div>
                              <Badge className={statusColors[event.status] || ''}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </Badge>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No events available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="xl:col-span-4 space-y-6">
          {/* Notifications */}
          <NotificationCenter />

          {/* System Info Card */}
          <Card className="border-muted/40 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-yellow-500" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-sm font-medium">Server Status</span>
                <Badge variant="outline" className="border-green-500/50 text-green-700 dark:text-green-400">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="text-sm font-medium">Database</span>
                <Badge variant="outline" className="border-blue-500/50 text-blue-700 dark:text-blue-400">Connected</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-muted">
                <span className="text-sm font-medium">Last Backup</span>
                <Badge variant="outline">2 hours ago</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}