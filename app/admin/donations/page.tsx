'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Plus, Package, Clock, CheckCircle, Truck } from 'lucide-react';
import { useDonations } from '@/shared/hooks/use-admin-data';
import { DonationsTable } from '@/admin/components/donations/donations-table';
import { LoadingState } from '@/shared/components/ui/loading-state';
import { EmptyState, ErrorState } from '@/shared/components/ui/data-states';
import { AddDonationDialog } from '@/admin/components/donations/add-donation-dialog';

export default function DonationsPage() {
  const { donations, loading, error, updateDonationStatus, deleteDonation } = useDonations();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (loading) {
    return <LoadingState label="Loading donations..." />;
  }

  if (error) {
    return <ErrorState description={error} />;
  }

  const stats = {
    total: donations.length,
    pending: donations.filter(d => d.status === 'pending').length,
    confirmed: donations.filter(d => d.status === 'confirmed').length,
    collected: donations.filter(d => d.status === 'collected').length,
    distributed: donations.filter(d => d.status === 'distributed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
          <p className="text-muted-foreground">
            Manage and track all donation requests and items
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Donation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <Badge variant="secondary" className="mt-1">
              Awaiting Review
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
            <Badge variant="outline" className="mt-1">
              Ready for Collection
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.collected}</div>
            <Badge variant="outline" className="mt-1">
              In Transit
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distributed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.distributed}</div>
            <Badge variant="default" className="mt-1">
              Completed
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
          <CardDescription>
            A comprehensive list of all donation requests and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({stats.confirmed})</TabsTrigger>
              <TabsTrigger value="collected">Collected ({stats.collected})</TabsTrigger>
              <TabsTrigger value="distributed">Distributed ({stats.distributed})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {donations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No donations yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Donations will appear here once people start donating items. Click "Add Donation" to create your first entry.
                  </p>
                </div>
              ) : (
                <DonationsTable 
                  data={donations}
                  onStatusUpdate={updateDonationStatus}
                  onDelete={deleteDonation}
                />
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {stats.pending === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No pending donations</h3>
                  <p className="text-sm text-muted-foreground">All donations have been processed.</p>
                </div>
              ) : (
                <DonationsTable 
                  data={donations.filter(d => d.status === 'pending')}
                  onStatusUpdate={updateDonationStatus}
                  onDelete={deleteDonation}
                />
              )}
            </TabsContent>
            
            <TabsContent value="confirmed" className="space-y-4">
              {stats.confirmed === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No confirmed donations</h3>
                  <p className="text-sm text-muted-foreground">Confirmed donations will appear here.</p>
                </div>
              ) : (
                <DonationsTable 
                  data={donations.filter(d => d.status === 'confirmed')}
                  onStatusUpdate={updateDonationStatus}
                  onDelete={deleteDonation}
                />
              )}
            </TabsContent>
            
            <TabsContent value="collected" className="space-y-4">
              {stats.collected === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Truck className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No collected donations</h3>
                  <p className="text-sm text-muted-foreground">Collected donations will appear here.</p>
                </div>
              ) : (
                <DonationsTable 
                  data={donations.filter(d => d.status === 'collected')}
                  onStatusUpdate={updateDonationStatus}
                  onDelete={deleteDonation}
                />
              )}
            </TabsContent>
            
            <TabsContent value="distributed" className="space-y-4">
              {stats.distributed === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No distributed donations</h3>
                  <p className="text-sm text-muted-foreground">Completed donations will appear here.</p>
                </div>
              ) : (
                <DonationsTable 
                  data={donations.filter(d => d.status === 'distributed')}
                  onStatusUpdate={updateDonationStatus}
                  onDelete={deleteDonation}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddDonationDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}