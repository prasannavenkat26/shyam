// API Configuration
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = process.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Feature Flags
export const FEATURES = {
  REAL_TIME_TRACKING: true,
  AI_CHATBOT: true,
  LEADERBOARD: true,
  BADGES_SYSTEM: true,
  QR_VERIFICATION: true,
};

// Reward Points
export const REWARD_POINTS = {
  DEVICE_RECYCLED: 100,
  REFERRAL: 50,
  FIRST_PICKUP: 150,
  MILESTONE_BADGES: {
    FIRST_10: 200,
    FIRST_50: 500,
    FIRST_100: 1000,
  },
};

// Carbon Offset (kg CO2 per device category)
export const CARBON_OFFSET = {
  LAPTOP: 45,
  DESKTOP: 65,
  PHONE: 85,
  TABLET: 35,
  MONITOR: 40,
  PRINTER: 30,
  OTHER: 25,
};

// Device Categories
export const DEVICE_CATEGORIES = [
  'Laptop',
  'Desktop Computer',
  'Mobile Phone',
  'Tablet',
  'Monitor',
  'Printer',
  'TV',
  'Keyboard/Mouse',
  'Charger',
  'Cables',
  'Other Electronics',
];

// Pickup Time Slots
export const PICKUP_TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

// Status Colors
export const STATUS_COLORS = {
  scheduled: 'bg-blue-500',
  'in-transit': 'bg-yellow-500',
  collected: 'bg-purple-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500',
  pending: 'bg-orange-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
};

// Dashboard Routes
export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ABOUT: '/about',
  CONTACT: '/contact',
  HOW_IT_WORKS: '/how-it-works',
  IMPACT: '/impact',

  // User Dashboard
  USER_DASHBOARD: '/dashboard',
  USER_PICKUPS: '/dashboard/pickups',
  USER_REWARDS: '/dashboard/rewards',
  USER_IMPACT: '/dashboard/impact',
  USER_PROFILE: '/dashboard/profile',
  USER_ASSISTANT: '/dashboard/assistant',

  // Collector Dashboard
  COLLECTOR_DASHBOARD: '/collector',
  COLLECTOR_PICKUPS: '/collector/pickups',
  COLLECTOR_EARNINGS: '/collector/earnings',
  COLLECTOR_ANALYTICS: '/collector/analytics',
  COLLECTOR_PROFILE: '/collector/profile',

  // Recycler/Admin Dashboard
  RECYCLER_DASHBOARD: '/recycler',
  RECYCLER_MANAGEMENT: '/recycler/management',
  RECYCLER_ANALYTICS: '/recycler/analytics',
  RECYCLER_VERIFICATION: '/recycler/verification',
  RECYCLER_CSR: '/recycler/csr',
  RECYCLER_SETTINGS: '/recycler/settings',
};

// Sustainability Goals (UN SDGs)
export const SUSTAINABILITY_GOALS = {
  SDG_11: 'Sustainable Cities and Communities',
  SDG_12: 'Responsible Consumption and Production',
  TARGETS: [
    'Reduce e-waste in landfills by 50% by 2030',
    'Create 10,000 green jobs',
    'Process 1,000,000 tons of e-waste',
    'Recover 500,000 tons of valuable materials',
    'Prevent 5M tons of CO2 emissions',
  ],
};

// Empty States Messages
export const EMPTY_STATES = {
  NO_PICKUPS: 'No pickups scheduled yet. Schedule one now!',
  NO_REWARDS: 'No rewards earned yet. Start recycling!',
  NO_NOTIFICATIONS: 'All caught up! No new notifications.',
  NO_DEVICES: 'No devices added yet. Add your first device.',
};
