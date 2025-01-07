"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn } from '@/lib/firebase/auth';
import { LoadingState } from '@/components/ui/loading-state';
import { isAdminUser, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/lib/firebase/admin-auth';
import { toast } from '@/hooks/use-toast';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    async function authenticate() {
      if (!loading && !user) {
        try {
          const { user: adminUser, error } = await signIn(ADMIN_EMAIL, ADMIN_PASSWORD);
          if (error) {
            toast.error('Authentication failed: ' + error);
            router.push('/');
            return;
          }
          if (!adminUser) {
            toast.error('Authentication failed');
            router.push('/');
            return;
          }
        } catch (error) {
          console.error('Auth error:', error);
          toast.error('Authentication failed');
          router.push('/');
        }
      }
    }

    authenticate();
  }, [user, loading, router]);

  if (loading) {
    return <LoadingState label="Verifying authentication..." />;
  }

  if (!user || !isAdminUser(user.email || '')) {
    return null;
  }

  return <>{children}</>;
}