// Re-export from main Firebase config to avoid duplicate initialization
// This ensures there's only ONE Firebase app instance across the entire application
export { app, db, auth } from '@/lib/firebase';