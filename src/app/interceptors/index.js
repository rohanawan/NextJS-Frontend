import axios from 'axios';
import {env} from '../config/environment-config';

export const api = axios.create({
    baseURL: env.EXTERNAL_API_ENDPOINT_URL,
    timeout: 60000
});

export const localApi = axios.create({
    baseURL: env.API_ENDPOINT_URL,
    timeout: 60000
});

// Local API request interceptor
localApi.interceptors.request.use(config => {
    return config;
  }, error => {
    return Promise.reject(error);
  });
  
  // Local API response interceptor
  localApi.interceptors.response.use(response => {
    return response.data;
  }, error => {
    return Promise.reject({ message: error?.response?.data?.message || error?.response?.data });
});

// API request interceptor
api.interceptors.request.use(config => {
    return config;
}, error => {
    // Handle request error here
    return Promise.reject(error);
})

// API response interceptor
api.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    // Handle response error here
    return Promise.reject({message: error?.response?.data?.message || error?.response?.data});
});