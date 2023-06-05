import axios from 'axios';
import { API_URL } from '@constants/index';
import { AppError } from '@utils/AppError';


const api = axios.create({
    baseURL: API_URL
})


api.interceptors.response.use((response) => {
    return response
}, (error) => {

    if (error.response && error.response.data) {

        const message = error.response.data.message
        const appError = new AppError(message)
        return Promise.reject(appError)
    } else {
        return Promise.reject(error)
    }
})

export { api }