"use client";

import { motion } from "framer-motion";
import { ClipboardList, LogOut } from "lucide-react";
import { signOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/context/auth-context';

export function DashboardHeader() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // Force a hard navigation to ensure the auth state is fully cleared
      window.location.href = '/admin/login';
    } catch (error: any) {
      toast.error('Failed to logout: ' + error.message);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-between mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <ClipboardList className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage donations and track impact</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user?.email}</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </motion.div>
  );
}