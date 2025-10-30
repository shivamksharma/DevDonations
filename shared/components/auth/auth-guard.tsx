"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn } from '@/shared/lib/firebase/auth';
import { LoadingState } from '@/shared/components/ui/loading-state';
import { isAdminUser, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/shared/lib/firebase/admin-auth';
import { toast } from '@/shared/hooks/use-toast';

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
            return;
          }
        } catch (error) {
          console.error('Auth error:', error);
        }
      }
    }

    authenticate();
  }, [user, loading, router, pathname, loggedOut]);

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
    if (pathname === '/admin') {
      return null;
    }
    return null;
  }

  return <>{children}</>;
}