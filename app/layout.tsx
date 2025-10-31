import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/shared/components/navbar';
import { Footer } from '@/shared/components/footer';
import { ThemeProvider } from '@/shared/components/theme/theme-provider';
import { SmoothScroll } from '@/shared/components/ui/smooth-scroll';
import { Toaster as SonnerToaster } from "sonner";
import { ConditionalLayout } from '@/shared/components/conditional-layout';
import { AuthProvider } from '@/shared/lib/context/auth-context';
import { DonateModalProvider } from '@/shared/components/donate-modal-provider';
import { VolunteerModal } from '@/shared/components/volunteer-modal';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'DevDonations - Give Warmth. Share Hope.',
  description: 'Your unused clothes can change lives. Join us in spreading kindness, one donation at a time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <SmoothScroll />
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <SonnerToaster 
              position="top-center" 
              expand={true}
              richColors
              closeButton
            />
            <DonateModalProvider />
            <VolunteerModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}