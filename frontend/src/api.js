import axios from "axios"
import {ACCESS_TOKEN} from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_uRL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOEKN);
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api