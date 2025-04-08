"use client";

import { ProtectedAdminRoute } from '@/components/auth/protected-admin-route';
import { AuthProvider } from '@/lib/context/auth-context';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <ProtectedAdminRoute>
          {children}
        </ProtectedAdminRoute>
      )}
    </AuthProvider>
  );
}