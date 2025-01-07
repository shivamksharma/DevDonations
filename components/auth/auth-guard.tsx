"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn } from '@/lib/firebase/auth';
import { LoadingState } from '@/components/ui/loading-state';
import { isAdminUser, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/lib/firebase/admin-auth';
import { toast } from '@/hooks/use-toast';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    async function authenticate() {
      if (!loading && !user && !loggedOut) {
        try {
          const { user: adminUser, error } = await signIn(ADMIN_EMAIL, ADMIN_PASSWORD);
          if (error || !adminUser) {
            // Redirect to login page if auto sign-in fails
            if (pathname !== '/admin/login') {
              router.push('/admin/login');
            }
            return;
          }
        } catch (error) {
          console.error('Auth error:', error);
          if (pathname !== '/admin/login') {
            router.push('/admin/login');
          }
        }
      }
    }

    authenticate();
  }, [user, loading, router, pathname, loggedOut]);

  useEffect(() => {
    if (!loading && (!user || !isAdminUser(user?.email || ''))) {
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [user, loading, router, pathname]);

  useEffect(() => {
    if (user === null) {
      setLoggedOut(true);
    } else {
      setLoggedOut(false);
    }
  }, [user]);

  if (loading) {
    return <LoadingState label="Verifying authentication..." />;
  }

  if (!user || !isAdminUser(user.email || '')) {
    // Redirect to login page if not authenticated or not admin
    if (pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    return null;
  }

  return <>{children}</>;
}