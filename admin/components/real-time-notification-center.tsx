"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Bell, Package, Users, Calendar, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Button } from "@/shared/components/ui/button";
import { subscribeToDonations } from '@/services/firebase/donations';
import { subscribeToVolunteers } from '@/services/firebase/volunteers';
import { subscribeToEvents } from '@/services/firebase/events';

interface Notification {
  id: string;
  type: 'donation' | 'volunteer' | 'event' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function RealTimeNotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Subscribe to real-time changes
    const unsubscribeDonations = subscribeToDonations((donations) => {
      const pendingDonations = donations.filter(d => d.status === 'pending');
      
      pendingDonations.forEach(donation => {
        const notificationExists = notifications.some(n => 
          n.id === `donation-${donation.id}` && n.type === 'donation'
        );
        
        if (!notificationExists && donation.createdAt) {
          const isNew = (new Date().getTime() - donation.createdAt.getTime()) < 5 * 60 * 1000; // Within last 5 minutes
          
          if (isNew) {
            setNotifications(prev => [{
              id: `donation-${donation.id}`,
              type: 'donation' as const,
              title: 'New Donation Request',
              message: `${donation.donorName} submitted a donation of ${donation.totalItems} items`,
              timestamp: donation.createdAt,
              read: false
            }, ...prev].slice(0, 10)); // Keep only last 10 notifications
          }
        }
      });
    });

    const unsubscribeVolunteers = subscribeToVolunteers((volunteers) => {
      const pendingVolunteers = volunteers.filter(v => v.status === 'pending');
      
      pendingVolunteers.forEach(volunteer => {
        const notificationExists = notifications.some(n => 
          n.id === `volunteer-${volunteer.id}` && n.type === 'volunteer'
        );
        
        if (!notificationExists && volunteer.joinedAt) {
          const isNew = (new Date().getTime() - volunteer.joinedAt.getTime()) < 5 * 60 * 1000;
          
          if (isNew) {
            setNotifications(prev => [{
              id: `volunteer-${volunteer.id}`,
              type: 'volunteer' as const,
              title: 'New Volunteer Application',
              message: `${volunteer.name} applied to become a volunteer`,
              timestamp: volunteer.joinedAt,
              read: false
            }, ...prev].slice(0, 10));
          }
        }
      });
    });

    const unsubscribeEvents = subscribeToEvents((events) => {
      const upcomingEvents = events.filter(e => 
        e.startDate && new Date(e.startDate) > new Date()
      );
      
      upcomingEvents.forEach(event => {
        if (event.startDate && event.createdAt) {
          const daysUntilEvent = Math.ceil(
            (new Date(event.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          
          const notificationExists = notifications.some(n => 
            n.id === `event-${event.id}` && n.type === 'event'
          );
          
          if (!notificationExists && daysUntilEvent <= 3 && daysUntilEvent > 0) {
            setNotifications(prev => [{
              id: `event-${event.id}`,
              type: 'event' as const,
              title: 'Upcoming Event',
              message: `"${event.title}" is in ${daysUntilEvent} day${daysUntilEvent > 1 ? 's' : ''}`,
              timestamp: event.createdAt,
              read: false
            }, ...prev].slice(0, 10));
          }
        }
      });
    });

    return () => {
      unsubscribeDonations();
      unsubscribeVolunteers();
      unsubscribeEvents();
    };
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'volunteer':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="border-muted/40 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-7"
            >
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No new notifications</p>
              <p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer hover:bg-accent/50 ${
                    notification.read 
                      ? 'bg-background border-muted/40 opacity-70' 
                      : 'bg-accent/20 border-primary/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{notification.title}</p>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
