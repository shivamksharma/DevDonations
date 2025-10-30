"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/lib/context/auth-context';
import { LoadingState } from '@/shared/components/ui/loading-state';

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  console.log('ProtectedAdminRoute render:', { 
    loading, 
    user: user?.email, 
    isAdmin,
    hasUser: !!user 
  });

  useEffect(() => {
    console.log('ProtectedAdminRoute useEffect:', { loading, user: user?.email, isAdmin });
    if (!loading && (!user || !isAdmin)) {
      console.log('Redirecting to admin login');
      router.push('/admin/login');
    }
  }, [user, loading, isAdmin, router]);

  // Show loading state only during initial authentication check
  if (loading) {
    console.log('Showing loading state');
    return <LoadingState label="Verifying authentication..." />;
  }

  // Don't render anything if not authenticated or not admin
  if (!user || !isAdmin) {
    console.log('Not authenticated or not admin, returning null');
    return null;
  }

  console.log('Rendering protected content');
  return <>{children}</>;
} 