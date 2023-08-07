import axios from 'axios';

const axiosInterceptorInstance = axios.create({
    baseURL: 'http://localhost:4000/api/v1/', // Replace with your API base URL
});

export default axiosInterceptorInstance;