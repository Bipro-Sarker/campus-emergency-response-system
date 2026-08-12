import axios from 'axios';

// আমাদের ব্যাকএন্ডের মূল URL
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Request Interceptor: এটি প্রতিটি রিকোয়েস্টের সাথে স্বয়ংক্রিয়ভাবে JWT টোকেন যুক্ত করবে
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;