import { create } from 'zustand';
import { getAnalytics } from '@/shared/lib/firebase/analytics';

interface AnalyticsStore {
  pageViews: any[];
  loading: boolean;
  error: string | null;
  fetchAnalytics: (startDate?: Date, endDate?: Date) => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  pageViews: [],
  loading: false,
  error: null,
  fetchAnalytics: async (startDate?: Date, endDate?: Date) => {
    try {
      set({ loading: true, error: null });
      console.log("Analytics store: Fetching data with date range:", { startDate, endDate });
      
      const { pageViews, error } = await getAnalytics(startDate, endDate);
      
      if (error) {
        console.error("Analytics store: Error fetching data:", error);
        set({ error, pageViews: [] });
        return;
      }
      
      console.log("Analytics store: Successfully fetched data:", { 
        count: pageViews?.length || 0,
        sample: pageViews?.slice(0, 2) 
      });
      
      set({ pageViews: pageViews || [], error: null });
    } catch (error: any) {
      console.error("Analytics store: Exception during fetch:", error);
      set({ error: error.message || "An unknown error occurred", pageViews: [] });
    } finally {
      set({ loading: false });
    }
  }
})); 