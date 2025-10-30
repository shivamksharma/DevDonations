"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/lib/context/auth-context';
import { LoadingState } from '@/shared/components/ui/loading-state';

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  console.log('ProtectedAdminRoute render:', { 
    loading, 
    user: user?.email, 
    isAdmin,
    hasUser: !!user,
    isRedirecting
  });

  useEffect(() => {
    console.log('ProtectedAdminRoute useEffect:', { loading, user: user?.email, isAdmin });
    if (!loading && (!user || !isAdmin)) {
      console.log('Redirecting to admin login');
      setIsRedirecting(true);
      router.push('/admin/login');
    }
  }, [user, loading, isAdmin, router]);

  // Show loading state during initial authentication check
  if (loading) {
    console.log('Showing loading state');
    return <LoadingState label="Verifying authentication..." />;
  }

  // Show redirecting state when redirecting to login
  if (isRedirecting || (!user || !isAdmin)) {
    console.log('Showing redirect state');
    return <LoadingState label="Redirecting..." />;
  }

  console.log('Rendering protected content');
  return <>{children}</>;
} 