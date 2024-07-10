import axios from "axios";

export const API_KEY = "b7d02a16fdcfc6bac776f429dd3e29c0";

const BASE_URL = 'http://api.openweathermap.org/'



export const axiosInstance = axios.create({
    baseURL:BASE_URL
});


axiosInstance.interceptors.request.use(async(config)=>{
 return config
},(error)=>{
    return Promise.reject(error)
})


