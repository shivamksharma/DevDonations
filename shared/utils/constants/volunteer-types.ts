export const VOLUNTEER_ROLES = [
  {
    id: "distribution",
    label: "Distribution Helper",
    description: "Help sort and distribute clothes to beneficiaries"
  },
  {
    id: "pickup",
    label: "Pickup Coordinator",
    description: "Coordinate and assist with donation pickups"
  },
  {
    id: "sorting",
    label: "Sorting Assistant",
    description: "Sort and organize donated clothes"
  },
  {
    id: "outreach",
    label: "Community Outreach",
    description: "Help identify and connect with communities in need"
  }
] as const;

export const AVAILABILITY_OPTIONS = [
  { id: "weekday_morning", label: "Weekday Mornings" },
  { id: "weekday_afternoon", label: "Weekday Afternoons" },
  { id: "weekday_evening", label: "Weekday Evenings" },
  { id: "weekend_morning", label: "Weekend Mornings" },
  { id: "weekend_afternoon", label: "Weekend Afternoons" },
  { id: "weekend_evening", label: "Weekend Evenings" }
] as const;

export type VolunteerRole = typeof VOLUNTEER_ROLES[number];
export type AvailabilityOption = typeof AVAILABILITY_OPTIONS[number];