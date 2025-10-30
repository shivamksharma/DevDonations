'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/shared/lib/context/auth-context';
import { signOut } from '@/shared/lib/firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import { Separator } from '@/shared/components/ui/separator';
import { SidebarTrigger } from '@/shared/components/ui/sidebar';
import { Badge } from '@/shared/components/ui/badge';
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User, 
  Shield,
  Package,
  Users,
  Calendar,
  Command,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from '@/shared/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { subscribeToDonations } from '@/services/firebase/donations';
import { subscribeToVolunteers } from '@/services/firebase/volunteers';
import { subscribeToEvents } from '@/services/firebase/events';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'donation' | 'volunteer' | 'event' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter(path => path !== '');
  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    return { href, label };
  });
  return breadcrumbs;
}

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const breadcrumbs = generateBreadcrumbs(pathname);
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Subscribe to real-time notifications
    const unsubscribeDonations = subscribeToDonations((donations) => {
      const pendingDonations = donations.filter(d => d.status === 'pending');
      
      pendingDonations.forEach(donation => {
        const notificationExists = notifications.some(n => 
          n.id === `donation-${donation.id}`
        );
        
        if (!notificationExists && donation.createdAt) {
          const isNew = (new Date().getTime() - donation.createdAt.getTime()) < 5 * 60 * 1000;
          
          if (isNew) {
            setNotifications(prev => [{
              id: `donation-${donation.id}`,
              type: 'donation' as const,
              title: 'New Donation Request',
              message: `${donation.donorName} submitted ${donation.totalItems} items`,
              timestamp: donation.createdAt,
              read: false
            }, ...prev].slice(0, 10));
          }
        }
      });
    });

    const unsubscribeVolunteers = subscribeToVolunteers((volunteers) => {
      const pendingVolunteers = volunteers.filter(v => v.status === 'pending');
      
      pendingVolunteers.forEach(volunteer => {
        const notificationExists = notifications.some(n => 
          n.id === `volunteer-${volunteer.id}`
        );
        
        if (!notificationExists && volunteer.joinedAt) {
          const isNew = (new Date().getTime() - volunteer.joinedAt.getTime()) < 5 * 60 * 1000;
          
          if (isNew) {
            setNotifications(prev => [{
              id: `volunteer-${volunteer.id}`,
              type: 'volunteer' as const,
              title: 'New Volunteer Application',
              message: `${volunteer.name} applied to volunteer`,
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
          
          if (daysUntilEvent <= 3 && daysUntilEvent > 0) {
            const notificationExists = notifications.some(n => 
              n.id === `event-${event.id}`
            );
            
            if (!notificationExists) {
              setNotifications(prev => [{
                id: `event-${event.id}`,
                type: 'event' as const,
                title: 'Upcoming Event',
                message: `"${event.title}" in ${daysUntilEvent} day${daysUntilEvent > 1 ? 's' : ''}`,
                timestamp: event.createdAt,
                read: false
              }, ...prev].slice(0, 10));
            }
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

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'volunteer':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search logic here
      toast.info(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all">
      <div className="flex items-center gap-2 px-4 flex-1">
        <SidebarTrigger className="-ml-1 hover:bg-accent rounded-md transition-colors" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.href} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator className="text-muted-foreground/40" />}
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage className="font-semibold text-foreground">
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={breadcrumb.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center gap-2 px-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search (⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-[200px] lg:w-[300px] pl-9 pr-4 transition-all ${
              isSearchFocused ? 'ring-2 ring-primary/20' : ''
            }`}
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
            <Command className="h-3 w-3" />K
          </kbd>
        </form>
        
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-accent transition-colors"
            >
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge 
                    variant="destructive" 
                    className="h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                </motion.div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">Notifications</h4>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="h-5 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs h-7 px-2"
                >
                  Mark all read
                </Button>
              )}
            </div>
            <ScrollArea className="h-[400px]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <div className="rounded-full bg-muted p-3 mb-3">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">No notifications</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    You're all caught up!
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-accent mb-2 ${
                        notification.read 
                          ? 'opacity-60' 
                          : 'bg-accent/30 border border-primary/10'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-tight">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-snug">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>
        
        {/* Settings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-accent transition-colors"
            >
              <Settings className="h-[18px] w-[18px]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light
                {theme === 'light' && <DropdownMenuShortcut>✓</DropdownMenuShortcut>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
                {theme === 'dark' && <DropdownMenuShortcut>✓</DropdownMenuShortcut>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 h-4 w-4" />
                System
                {theme === 'system' && <DropdownMenuShortcut>✓</DropdownMenuShortcut>}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-9 w-9 rounded-full hover:bg-accent transition-colors"
            >
              <Avatar className="h-9 w-9 border-2 border-primary/10">
                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'Admin'} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-3 py-2">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'Admin'} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1 flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-none truncate">
                    {user?.displayName || 'Admin User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Administrator
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
                <User className="mr-2 h-4 w-4" />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}