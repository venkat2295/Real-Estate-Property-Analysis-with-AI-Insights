import axios from 'axios';
import type { AxiosResponse } from 'axios';
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const createProperty = async (data:any):Promise<AxiosResponse<any>> => { return API.post('/properties',data); };
export const getProperties = async ():Promise<AxiosResponse<any>> =>{ return API.get('/properties') };
export const getProperty =async (id:string):Promise<AxiosResponse<any>> =>{ return API.get(`/properties/${id}`)};
export const analyzeProperty = async (id:string):Promise<AxiosResponse<any>> =>{ return API.post(`/properties/${id}/analyze`)};