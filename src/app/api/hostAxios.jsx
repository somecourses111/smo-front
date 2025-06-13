import axios from "axios";

const getAccessTokenFromLocalStorage = () => {
    return localStorage.getItem('access_token');
};

const hostAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL2,
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
    hostAxios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export default hostAxios;
