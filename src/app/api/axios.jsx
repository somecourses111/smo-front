import axios from "axios";

const getAccessTokenFromLocalStorage = () => {
    return localStorage.getItem('access_token');
};

const apiBaseURL = process.env.REACT_APP_API_URL || "https://your-backend-url.a.run.app/api";

const axiosInstance = axios.create({
    baseURL: apiBaseURL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    }
});

// Set the Bearer token when the access token is available
const accessToken = getAccessTokenFromLocalStorage();
console.log(accessToken);
if (accessToken) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export default axiosInstance;
