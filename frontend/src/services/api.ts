import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const createProperty = (data:any)=> API.post('/properties',data);
export const getProperties = ()=> API.get('/properties');
export const getProperty = ()=> (id:string)=>API.get(`/properties/${id}`);
export const analyzeProperty = ()=>(id:string)=>API.get(`/properties/${id}/analyze`);