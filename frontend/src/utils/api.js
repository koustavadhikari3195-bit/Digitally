import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if it exists
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add admin token if it exists
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken && config.url?.includes('/admin')) {
            config.headers['x-admin-auth'] = adminToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle specific error cases
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 401) {
                // Unauthorized - clear tokens
                localStorage.removeItem('token');
                localStorage.removeItem('adminToken');

                // Redirect to login if on admin page
                if (window.location.pathname.includes('/admin')) {
                    window.location.href = '/admin/login';
                }
            } else if (status === 403) {
                // Forbidden
                console.error('Access forbidden:', data.message);
            } else if (status === 404) {
                // Not found
                console.error('Resource not found:', data.message);
            } else if (status >= 500) {
                // Server error
                console.error('Server error:', data.message);
            }
        } else if (error.request) {
            // Request made but no response
            console.error('No response from server. Please check your connection.');
        } else {
            // Something else happened
            console.error('Request error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
