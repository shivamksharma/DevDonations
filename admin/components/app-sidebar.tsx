"use client";

import { 
  BarChart3,
  Calendar,
  Gift,
  Home,
  LogOut,
  Settings,
  Users,
  Package,
  FileText,
  MapPin,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarSeparator,
} from "@/shared/components/ui/sidebar";
import { useAuth } from "@/shared/lib/context/auth-context";
import { signOut } from "@/shared/lib/firebase/auth";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { subscribeToDonations } from '@/services/firebase/donations';
import { subscribeToVolunteers } from '@/services/firebase/volunteers';
import { subscribeToEvents } from '@/services/firebase/events';

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  
  // Real-time counts from Firebase
  const [counts, setCounts] = useState({
    donations: 0,
    pendingDonations: 0,
    volunteers: 0,
    pendingVolunteers: 0,
    events: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    // Subscribe to real-time donation counts
    const unsubscribeDonations = subscribeToDonations((donations) => {
      setCounts(prev => ({
        ...prev,
        donations: donations.length,
        pendingDonations: donations.filter(d => d.status === 'pending').length,
      }));
    });

    // Subscribe to real-time volunteer counts
    const unsubscribeVolunteers = subscribeToVolunteers((volunteers) => {
      setCounts(prev => ({
        ...prev,
        volunteers: volunteers.length,
        pendingVolunteers: volunteers.filter(v => v.status === 'pending').length,
      }));
    });

    // Subscribe to real-time event counts
    const unsubscribeEvents = subscribeToEvents((events) => {
      setCounts(prev => ({
        ...prev,
        events: events.length,
        upcomingEvents: events.filter(e => 
          e.startDate && new Date(e.startDate) > new Date()
        ).length,
      }));
    });

    return () => {
      unsubscribeDonations();
      unsubscribeVolunteers();
      unsubscribeEvents();
    };
  }, []);

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Home,
      badge: null,
    },
    {
      name: "Donations",
      href: "/admin/donations",
      icon: Gift,
      badge: counts.pendingDonations > 0 ? counts.pendingDonations.toString() : null,
    },
    {
      name: "Volunteers",
      href: "/admin/volunteers",
      icon: Users,
      badge: counts.pendingVolunteers > 0 ? counts.pendingVolunteers.toString() : null,
    },
    {
      name: "Events",
      href: "/admin/events",
      icon: Calendar,
      badge: counts.upcomingEvents > 0 ? counts.upcomingEvents.toString() : null,
    },
    {
      name: "Locations",
      href: "/admin/locations",
      icon: MapPin,
      badge: null,
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
      icon: FileText,
      badge: null,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/admin/login";
    } catch (error: any) {
      toast.error("Failed to logout: " + error.message);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DevDonations</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={item.name}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.email?.split("@")[0] || "Admin"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              tooltip="Logout"
              className="w-full"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}