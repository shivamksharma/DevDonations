"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn, signInWithGoogle } from '@/lib/firebase/auth';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/context/auth-context';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { LoadingState } from '@/components/ui/loading-state';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.push('/admin');
    }
  }, [user, loading, isAdmin, router]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { user, error } = await signIn(data.email, data.password);
      if (error) {
        toast.error(error);
        return;
      }
      if (user) {
        router.push('/admin');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { user, error } = await signInWithGoogle();
      if (error) {
        toast.error(error);
        return;
      }
      if (user) {
        router.push('/admin');
      }
    } catch (error) {
      toast.error('An error occurred during Google sign-in');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state only during initial auth check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/50">
        <LoadingState label="Verifying authentication..." />
      </div>
    );
  }

  // If user is already authenticated and is admin, redirect to admin dashboard
  if (user && isAdmin) {
    router.push('/admin');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
}