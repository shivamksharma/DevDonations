'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/shared/components/navbar';
import { Footer } from '@/shared/components/footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current path is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // For admin routes, render children without navbar/footer
  if (isAdminRoute) {
    return <>{children}</>;
  }
  
  // For non-admin routes, render with navbar and footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}