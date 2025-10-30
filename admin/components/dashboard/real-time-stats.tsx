"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getDashboardStats } from '@/services/firebase/analytics';
import { subscribeToDonations } from '@/services/firebase/donations';
import { subscribeToVolunteers } from '@/services/firebase/volunteers';
import { subscribeToEvents } from '@/services/firebase/events';

interface DashboardStats {
  totalDonations: number;
  totalVolunteers: number;
  totalEvents: number;
  totalBeneficiaries: number;
}

interface StatChange {
  value: number;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
}

export function RealTimeStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: 0,
    totalVolunteers: 0,
    totalEvents: 0,
    totalBeneficiaries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState<Record<string, StatChange>>({});

  useEffect(() => {
    // Initial load
    const loadInitialStats = async () => {
      try {
        const initialStats = await getDashboardStats();
        setStats(initialStats);
        setLoading(false);
      } catch (error) {
        console.error('Error loading initial stats:', error);
        setLoading(false);
      }
    };

    loadInitialStats();

    // Subscribe to real-time updates
    const unsubscribeDonations = subscribeToDonations((donations) => {
      setStats(prev => {
        const newTotal = donations.length;
        const change = newTotal - prev.totalDonations;
        if (change !== 0) {
          setChanges(c => ({
            ...c,
            donations: {
              value: newTotal,
              trend: change > 0 ? 'up' : 'down',
              percentage: prev.totalDonations > 0 ? Math.abs((change / prev.totalDonations) * 100) : 0
            }
          }));
        }
        return {
          ...prev,
          totalDonations: newTotal,
          totalBeneficiaries: donations.reduce((sum, d) => sum + d.totalItems, 0)
        };
      });
    });

    const unsubscribeVolunteers = subscribeToVolunteers((volunteers) => {
      setStats(prev => {
        const newTotal = volunteers.length;
        const change = newTotal - prev.totalVolunteers;
        if (change !== 0) {
          setChanges(c => ({
            ...c,
            volunteers: {
              value: newTotal,
              trend: change > 0 ? 'up' : 'down',
              percentage: prev.totalVolunteers > 0 ? Math.abs((change / prev.totalVolunteers) * 100) : 0
            }
          }));
        }
        return { ...prev, totalVolunteers: newTotal };
      });
    });

    const unsubscribeEvents = subscribeToEvents((events) => {
      setStats(prev => {
        const newTotal = events.length;
        const change = newTotal - prev.totalEvents;
        if (change !== 0) {
          setChanges(c => ({
            ...c,
            events: {
              value: newTotal,
              trend: change > 0 ? 'up' : 'down',
              percentage: prev.totalEvents > 0 ? Math.abs((change / prev.totalEvents) * 100) : 0
            }
          }));
        }
        return { ...prev, totalEvents: newTotal };
      });
    });

    return () => {
      unsubscribeDonations();
      unsubscribeVolunteers();
      unsubscribeEvents();
    };
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded mb-2" />
              <div className="h-3 w-32 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-muted/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalDonations}</div>
          {changes.donations && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              {getTrendIcon(changes.donations.trend)}
              <span className={changes.donations.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {changes.donations.percentage.toFixed(1)}%
              </span>
              <span>from previous</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-muted/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Volunteers</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalVolunteers}</div>
          {changes.volunteers && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              {getTrendIcon(changes.volunteers.trend)}
              <span className={changes.volunteers.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {changes.volunteers.percentage.toFixed(1)}%
              </span>
              <span>from previous</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-muted/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalEvents}</div>
          {changes.events && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              {getTrendIcon(changes.events.trend)}
              <span className={changes.events.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {changes.events.percentage.toFixed(1)}%
              </span>
              <span>from previous</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-muted/40 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBeneficiaries}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Through donations
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
