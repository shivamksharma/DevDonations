"use client";

import { DashboardHeader } from '@/components/admin/dashboard-header';
import { StatsCards } from '@/components/admin/dashboard/stats-cards';
import { DonationsTable } from '@/components/admin/dashboard/donations-table';
import { VolunteersTable } from '@/components/admin/dashboard/volunteers-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
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
          </TabsList>
          
          <TabsContent value="donations">
            <DonationsTable />
          </TabsContent>
          
          <TabsContent value="volunteers">
            <VolunteersTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}