// Authentication Types
export type UserRole = 'user' | 'collector' | 'recycler' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  rewardPoints: number;
  carbonOffset: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

// Pickup Request Types
export type PickupStatus = 'scheduled' | 'in-transit' | 'collected' | 'completed' | 'cancelled';

export interface Device {
  id: string;
  name: string;
  category: string;
  weight?: number;
  photos?: string[];
  description?: string;
  condition: 'working' | 'not-working' | 'partially-working';
}

export interface PickupRequest {
  id: string;
  userId: string;
  collectorId?: string;
  recyclerId?: string;
  devices: Device[];
  pickupAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  pickupDate: Date;
  pickupTimeSlot: string;
  status: PickupStatus;
  qrCode?: string;
  notes?: string;
  rewardPoints: number;
  carbonOffset: number;
  createdAt: Date;
  updatedAt: Date;
}

// Collector Types
export interface Collector extends User {
  registrationNumber: string;
  companyName?: string;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  pickupsCompleted: number;
  rating: number;
  earnings: number;
  totalPickups: number;
}

// Recycler Types
export interface Recycler extends User {
  companyName: string;
  certifications: string[];
  verificationStatus: 'pending' | 'approved' | 'rejected';
  wasteProcessed: number;
  recyclingRate: number;
  csrInitiatives?: string[];
}

// Reward Types
export interface Reward {
  id: string;
  userId: string;
  pointsEarned: number;
  pointsUsed?: number;
  description: string;
  category: 'pickup' | 'referral' | 'badge' | 'recycled';
  createdAt: Date;
  expiresAt?: Date;
}

// Dashboard Analytics
export interface AnalyticsData {
  totalPickups: number;
  totalDevices: number;
  totalRewardPoints: number;
  totalCarbonOffset: number;
  weeklyPickups: Array<{ date: string; count: number }>;
  categoryDistribution: Array<{ category: string; count: number }>;
  monthlyTrend: Array<{ month: string; pickups: number; rewards: number }>;
}

export interface CollectorAnalytics {
  totalPickups: number;
  pendingPickups: number;
  completedPickups: number;
  earnings: number;
  averageRating: number;
  totalDistance: number;
  weeklyRevenue: Array<{ date: string; amount: number }>;
  pickupsByStatus: Record<PickupStatus, number>;
}

export interface RecyclerAnalytics {
  totalWasteProcessed: number;
  recyclingRate: number;
  certsVerified: number;
  activeSources: number;
  monthlyProcessing: Array<{ month: string; weight: number }>;
  wasteByCategory: Array<{ category: string; weight: number }>;
  csrMetrics: {
    communityImpact: number;
    jobsCreated: number;
    wasteDiverted: number;
  };
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'pickup' | 'reward' | 'alert' | 'info';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Impact Types
export interface ImpactMetrics {
  totalEWasteCollected: number;
  carbonEmissionsPrevented: number;
  totalActiveUsers: number;
  certifiedRecyclers: number;
  recyclingRate: number;
  jobsCreated: number;
}
