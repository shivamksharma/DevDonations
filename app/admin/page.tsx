"use client";

import { DashboardHeader } from '@/components/admin/dashboard-header';
import { StatsCards } from '@/components/admin/dashboard/stats-cards';
import { DonationsTable } from '@/components/admin/dashboard/donations-table';
import { VolunteersTable } from '@/components/admin/dashboard/volunteers-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/auth';
import { isAdminUser } from '@/lib/firebase/admin-auth';
import LoginPage from './login/page';
import AnalyticsPage from './analytics/page';
import EventsPage from './events/page';

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdminUser(user?.email || '')) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-secondary/50 py-8">
      <div className="container mx-auto px-4">
        <DashboardHeader />
        
        <div className="mb-8">
          <StatsCards />
        </div>
        
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="donations">
            <DonationsTable />
          </TabsContent>
          
          <TabsContent value="volunteers">
            <VolunteersTable />
          </TabsContent>

          <TabsContent value="events">
            <EventsPage />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}