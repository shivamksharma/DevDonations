import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  getEvents, 
  createEvent, 
  updateEvent as updateEventFirebase,
  deleteEvent as deleteEventFirebase,
  type DistributionEvent 
} from '@/lib/firebase/events';

interface EventStore {
  events: DistributionEvent[];
  fetchEvents: () => Promise<void>;
  createEvent: (eventData: Omit<DistributionEvent, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ id: string | null; error: string | null }>;
  updateEvent: (id: string, eventData: Partial<DistributionEvent>) => Promise<{ error: string | null }>;
  deleteEvent: (id: string) => Promise<{ error: string | null }>;
}

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      fetchEvents: async () => {
        const { events, error } = await getEvents();
        if (error) {
          console.error("Error fetching events:", error);
          return;
        }
        set({ events: events as DistributionEvent[] });
      },
      createEvent: async (eventData) => {
        const result = await createEvent(eventData);
        if (result.error) {
          return result;
        }
        set((state) => ({
          events: [...state.events, {
            ...eventData,
            id: result.id!,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }],
        }));
        return result;
      },
      updateEvent: async (id, eventData) => {
        const result = await updateEventFirebase(id, eventData);
        if (result.error) {
          return result;
        }
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...eventData, updatedAt: new Date().toISOString() } : e
          ),
        }));
        return result;
      },
      deleteEvent: async (id) => {
        const result = await deleteEventFirebase(id);
        if (result.error) {
          return result;
        }
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        }));
        return result;
      },
    }),
    {
      name: 'events-storage',
    }
  )
); 