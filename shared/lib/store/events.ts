import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  getEvents, 
  createEvent, 
  updateEvent as updateEventFirebase,
  deleteEvent as deleteEventFirebase,
  subscribeToEvents,
  type DistributionEvent 
} from '@/shared/lib/firebase/events';

interface EventStore {
  events: DistributionEvent[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  subscribeToEvents: () => () => void;
  createEvent: (eventData: Omit<DistributionEvent, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ id: string | null; error: string | null }>;
  updateEvent: (id: string, eventData: Partial<DistributionEvent>) => Promise<{ error: string | null }>;
  deleteEvent: (id: string) => Promise<{ error: string | null }>;
}

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: [],
      loading: false,
      error: null,
      fetchEvents: async () => {
        try {
          set({ loading: true, error: null });
          const { events, error } = await getEvents();
          if (error) {
            set({ error });
            return;
          }
          set({ events: events as DistributionEvent[] });
        } catch (error: any) {
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },
      subscribeToEvents: () => {
        return subscribeToEvents((events) => {
          set({ events });
        });
      },
      createEvent: async (eventData) => {
        try {
          set({ loading: true, error: null });
          const result = await createEvent(eventData);
          if (result.error) {
            set({ error: result.error });
            return result;
          }
          return result;
        } catch (error: any) {
          set({ error: error.message });
          return { id: null, error: error.message };
        } finally {
          set({ loading: false });
        }
      },
      updateEvent: async (id, eventData) => {
        try {
          set({ loading: true, error: null });
          const result = await updateEventFirebase(id, eventData);
          if (result.error) {
            set({ error: result.error });
          }
          return result;
        } catch (error: any) {
          set({ error: error.message });
          return { error: error.message };
        } finally {
          set({ loading: false });
        }
      },
      deleteEvent: async (id) => {
        try {
          set({ loading: true, error: null });
          const result = await deleteEventFirebase(id);
          if (result.error) {
            set({ error: result.error });
          }
          return result;
        } catch (error: any) {
          set({ error: error.message });
          return { error: error.message };
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'events-storage',
    }
  )
); 