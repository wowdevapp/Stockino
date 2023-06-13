import axios from 'axios';
import authConfig from 'src/configs/auth';
import backend from 'src/configs/backend';

// Create an instance of Axios
const api = axios.create({
  baseURL: backend.path
});
if (typeof window !== 'undefined') {
    api.defaults.headers.common['Authorization'] =`Bearer ${window.localStorage.getItem(
        authConfig.storageTokenKeyName
    )}`;
}


export default api;
