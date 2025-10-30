'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Plus, Users, Clock, CheckCircle, UserCheck, UserX } from 'lucide-react';
import { useVolunteers } from '@/shared/hooks/use-admin-data';
import { VolunteersTable } from '@/admin/components/volunteers/volunteers-table';
import { LoadingState } from '@/shared/components/ui/loading-state';
import { InviteVolunteerDialog } from '@/admin/components/volunteers/invite-volunteer-dialog';

export default function VolunteersPage() {
  const { volunteers, loading, updateVolunteerStatus, deleteVolunteer } = useVolunteers();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  if (loading) {
    return <LoadingState label="Loading volunteers..." />;
  }

  const stats = {
    total: volunteers.length,
    pending: volunteers.filter(v => v.status === 'pending').length,
    approved: volunteers.filter(v => v.status === 'approved').length,
    active: volunteers.filter(v => v.status === 'active').length,
    inactive: volunteers.filter(v => v.status === 'inactive').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Volunteers</h1>
          <p className="text-muted-foreground">
            Manage volunteer applications and track their activities
          </p>
        </div>
        <Button onClick={() => setIsInviteDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Invite Volunteer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
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
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <Badge variant="outline" className="mt-1">
              Ready to Start
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <Badge variant="default" className="mt-1">
              Contributing
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactive}</div>
            <Badge variant="outline" className="mt-1">
              Not Active
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Volunteers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Volunteers</CardTitle>
          <CardDescription>
            Manage volunteer applications, track their progress, and assign tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
              <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({stats.inactive})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <VolunteersTable 
                data={volunteers}
                onStatusUpdate={updateVolunteerStatus}
                onDelete={deleteVolunteer}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              <VolunteersTable 
                data={volunteers.filter(v => v.status === 'pending')}
                onStatusUpdate={updateVolunteerStatus}
                onDelete={deleteVolunteer}
              />
            </TabsContent>
            
            <TabsContent value="approved" className="space-y-4">
              <VolunteersTable 
                data={volunteers.filter(v => v.status === 'approved')}
                onStatusUpdate={updateVolunteerStatus}
                onDelete={deleteVolunteer}
              />
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              <VolunteersTable 
                data={volunteers.filter(v => v.status === 'active')}
                onStatusUpdate={updateVolunteerStatus}
                onDelete={deleteVolunteer}
              />
            </TabsContent>
            
            <TabsContent value="inactive" className="space-y-4">
              <VolunteersTable 
                data={volunteers.filter(v => v.status === 'inactive')}
                onStatusUpdate={updateVolunteerStatus}
                onDelete={deleteVolunteer}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <InviteVolunteerDialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen} />
    </div>
  );
}