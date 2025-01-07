// Admin credentials
export const ADMIN_EMAIL = "admin@devdonations.org";
export const ADMIN_PASSWORD = "admin123456"; // This is just for demo purposes

// Function to check if user is admin
export const isAdminUser = (email: string) => {
  return email === ADMIN_EMAIL;
};