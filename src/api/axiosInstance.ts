import axios from 'axios';
import {customNotification} from "@/utils/customNotification";

export const createApiInstance = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://sandbox.nemerea.com/api/v1/',
    });

    axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';


    axiosInstance.interceptors.response.use(
        ( response ) =>
            response, async ( error ) => {

            const errorStatus = error.response.status;

            if (errorStatus !== 401) {
                const errorMessage = error.response?.data?.detail
                customNotification({
                    type: 'error',
                    message: errorMessage.length ? errorMessage : 'Ошибка сервера'
                })
            }

            return Promise.reject(error)
        });
    return axiosInstance
};
