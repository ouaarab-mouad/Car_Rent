import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

// Add a request interceptor
instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // For non-GET requests, ensure we have a CSRF token
        if (config.method !== 'get') {
            try {
                // Get fresh CSRF token
                await axios.get('/sanctum/csrf-cookie', {
                    baseURL: 'http://127.0.0.1:8000',
                    withCredentials: true
                });
                
                // Get the XSRF-TOKEN cookie value
                const xsrfToken = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];
                    
                if (xsrfToken) {
                    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
                }
            } catch (error) {
                console.error('Error getting CSRF token:', error);
            }
        }
        
        console.log('Making request to:', config.url);
        console.log('Request headers:', config.headers);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        console.log('Response received:', response);
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        console.error('Error response:', error.response);
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance; 