export const PICKUP_TYPES = [
  { id: "pickup", label: "Home Pickup" },
  { id: "dropoff", label: "Drop-off at Center" },
] as const;

export const TIME_SLOTS = [
  { id: "morning", label: "Morning (9 AM - 12 PM)" },
  { id: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
  { id: "evening", label: "Evening (4 PM - 7 PM)" },
] as const;

export const DROP_OFF_LOCATIONS = [
  {
    id: "main-center",
    name: "Main Donation Center",
    address: "123 Charity Street, Downtown",
    hours: "Mon-Sat: 9 AM - 7 PM",
    phone: "+1 (555) 123-4567",
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: "north-center",
    name: "North Community Center",
    address: "456 Helper Avenue, Northside",
    hours: "Mon-Fri: 10 AM - 6 PM",
    phone: "+1 (555) 234-5678",
    coordinates: { lat: 40.7328, lng: -73.9860 },
  },
] as const;