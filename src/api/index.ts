import api from './axios';
import { Reward, AnalyticsData, CollectorAnalytics, RecyclerAnalytics } from '../types';

export const rewardAPI = {
  getMyRewards: async (userId: string) => {
    const response = await api.get(`/rewards/user/${userId}`);
    return response.data;
  },

  getRewardPoints: async (userId: string): Promise<number> => {
    const response = await api.get(`/rewards/points/${userId}`);
    return response.data.points;
  },

  redeemReward: async (userId: string, points: number) => {
    const response = await api.post(`/rewards/${userId}/redeem`, { points });
    return response.data;
  },

  getAchievements: async (userId: string) => {
    const response = await api.get(`/rewards/achievements/${userId}`);
    return response.data;
  },

  getLeaderboard: async (limit: number = 10) => {
    const response = await api.get('/rewards/leaderboard', { params: { limit } });
    return response.data;
  },
};

export const analyticsAPI = {
  getUserAnalytics: async (userId: string): Promise<AnalyticsData> => {
    const response = await api.get(`/analytics/user/${userId}`);
    return response.data;
  },

  getCollectorAnalytics: async (collectorId: string): Promise<CollectorAnalytics> => {
    const response = await api.get(`/analytics/collector/${collectorId}`);
    return response.data;
  },

  getRecyclerAnalytics: async (recyclerId: string): Promise<RecyclerAnalytics> => {
    const response = await api.get(`/analytics/recycler/${recyclerId}`);
    return response.data;
  },

  getImpactMetrics: async () => {
    const response = await api.get('/analytics/impact');
    return response.data;
  },

  getDashboardStats: async (role: string) => {
    const response = await api.get(`/analytics/stats/${role}`);
    return response.data;
  },
};

export const notificationAPI = {
  getNotifications: async (userId: string) => {
    const response = await api.get(`/notifications/user/${userId}`);
    return response.data;
  },

  markAsRead: async (notificationId: string) => {
    const response = await api.patch(`/notifications/${notificationId}`, { read: true });
    return response.data;
  },

  markAllAsRead: async (userId: string) => {
    const response = await api.post(`/notifications/user/${userId}/mark-all-read`);
    return response.data;
  },

  deleteNotification: async (notificationId: string) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },
};
