import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Property, PropertyFormData, ApiResponse } from '../types';
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

type ApiPromise<T> = Promise<AxiosResponse<ApiResponse<T>>>;
export const createProperty = (data: PropertyFormData): ApiPromise<Property> => {
  return API.post('/properties', data);
};

export const getProperties = (): ApiPromise<Property[]> => {
  return API.get('/properties');
};

export const getProperty = (id: string): ApiPromise<Property> => {
  return API.get(`/properties/${id}`);
};

export const analyzeProperty = (id: string): ApiPromise<Property> => {
  return API.post(`/properties/${id}/analyze`);
};

export const deleteProperty = (id: string): ApiPromise<void> => {
  return API.delete(`/properties/${id}`);
};

export const updateProperty = (id: string, data: Partial<PropertyFormData>): ApiPromise<Property> => {
  return API.put(`/properties/${id}`, data);
};