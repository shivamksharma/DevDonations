'use client';

import { ProtectedAdminRoute } from '@/shared/components/auth/protected-admin-route';
import { AppSidebar } from '@/admin/components/app-sidebar';
import { AdminHeader } from '@/admin/components/admin-header';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedAdminRoute>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
          <AppSidebar />
          <SidebarInset className="flex flex-col flex-1">
            <AdminHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="mx-auto max-w-[1600px]">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedAdminRoute>
  );
}