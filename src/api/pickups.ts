import api from './axios';
import { PickupRequest, Device } from '../types';

export const pickupAPI = {
  createPickupRequest: async (data: Partial<PickupRequest>) => {
    const response = await api.post('/pickups', data);
    return response.data;
  },

  getMyPickups: async (userId: string) => {
    const response = await api.get(`/pickups/user/${userId}`);
    return response.data;
  },

  getPickupById: async (pickupId: string) => {
    const response = await api.get(`/pickups/${pickupId}`);
    return response.data;
  },

  updatePickupStatus: async (pickupId: string, status: string) => {
    const response = await api.patch(`/pickups/${pickupId}`, { status });
    return response.data;
  },

  cancelPickup: async (pickupId: string) => {
    const response = await api.post(`/pickups/${pickupId}/cancel`);
    return response.data;
  },

  addDeviceToPickup: async (pickupId: string, device: Device) => {
    const response = await api.post(`/pickups/${pickupId}/devices`, device);
    return response.data;
  },

  removeDeviceFromPickup: async (pickupId: string, deviceId: string) => {
    const response = await api.delete(`/pickups/${pickupId}/devices/${deviceId}`);
    return response.data;
  },

  getAvailableCollectors: async (latitude: number, longitude: number) => {
    const response = await api.get('/collectors/available', {
      params: { latitude, longitude },
    });
    return response.data;
  },

  assignCollector: async (pickupId: string, collectorId: string) => {
    const response = await api.post(`/pickups/${pickupId}/assign`, { collectorId });
    return response.data;
  },
};
