'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Badge } from '@/shared/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Package, 
  Calendar, 
  Heart,
  Activity,
  BarChart3
} from 'lucide-react';
import { LoadingState } from '@/shared/components/ui/loading-state';
import { DonationsChart } from '@/admin/components/analytics/donations-chart';
import { CategoryDistributionChart } from '@/admin/components/analytics/category-distribution-chart';
import { VolunteerActivityChart } from '@/admin/components/analytics/volunteer-activity-chart';
import { StatusOverviewChart } from '@/admin/components/analytics/status-overview-chart';
import { getComprehensiveAnalytics } from '@/services/firebase/analytics';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getComprehensiveAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <LoadingState label="Loading analytics..." />;
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium">No analytics data available</p>
          <p className="text-sm text-muted-foreground mt-2">
            Analytics will appear once you have donations, volunteers, or events
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your donation platform performance
          </p>
        </div>
      </div>

      {/* Key Metrics Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalDonations}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalVolunteers}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEvents}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+15%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalBeneficiaries}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lives positively impacted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Content Card */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>
            In-depth analysis of donations, volunteers, and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <DonationsChart data={analytics.donationTrends} />
                <CategoryDistributionChart data={analytics.categoryDistribution} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <VolunteerActivityChart data={analytics.volunteerActivity} />
                <StatusOverviewChart data={analytics.statusOverview} />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-muted/40">
                  <CardHeader>
                    <CardTitle className="text-base">Top Donation Categories</CardTitle>
                    <CardDescription>Most popular donation types</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analytics.donationsByCategory.length > 0 ? (
                      analytics.donationsByCategory.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{category.category}</span>
                            <span className="text-muted-foreground">{category.percentage}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${category.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No category data available yet
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-muted/40">
                  <CardHeader>
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                    <CardDescription>Latest platform activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.recentActivity.length > 0 ? (
                        analytics.recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <div className="flex-1 space-y-1 min-w-0">
                              <p className="text-sm font-medium truncate">{activity.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(activity.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline" className="flex-shrink-0">{activity.type}</Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No recent activity
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="donations" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-1">
                <DonationsChart data={analytics.donationTrends} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <CategoryDistributionChart data={analytics.categoryDistribution} />
                <Card className="border-muted/40">
                  <CardHeader>
                    <CardTitle className="text-base">Donation Analytics</CardTitle>
                    <CardDescription>Detailed donation insights and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold">{analytics.totalDonations}</div>
                        <p className="text-sm text-muted-foreground mt-1">Total Donations</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold">$125</div>
                        <p className="text-sm text-muted-foreground mt-1">Average Value</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">+12%</div>
                        <p className="text-sm text-muted-foreground mt-1">Growth Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="volunteers" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-1">
                <VolunteerActivityChart data={analytics.volunteerActivity} />
              </div>
              <Card className="border-muted/40">
                <CardHeader>
                  <CardTitle className="text-base">Volunteer Analytics</CardTitle>
                  <CardDescription>Volunteer engagement and participation metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">{analytics.totalVolunteers}</div>
                      <p className="text-sm text-muted-foreground mt-1">Active Volunteers</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">2,400</div>
                      <p className="text-sm text-muted-foreground mt-1">Total Hours</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+8%</div>
                      <p className="text-sm text-muted-foreground mt-1">Growth Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <StatusOverviewChart data={analytics.statusOverview} />
                <Card className="border-muted/40">
                  <CardHeader>
                    <CardTitle className="text-base">Event Analytics</CardTitle>
                    <CardDescription>Event participation and success metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold">{analytics.totalEvents}</div>
                        <p className="text-sm text-muted-foreground mt-1">Events This Month</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-sm text-muted-foreground mt-1">Avg Attendance</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">+15%</div>
                        <p className="text-sm text-muted-foreground mt-1">Growth Rate</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">92%</div>
                        <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}