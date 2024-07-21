import axios from 'axios';
import {customNotification} from "@/utils/customNotification";

export const createApiInstance = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://sandbox.nemerea.com/api/v1/',
    });

    axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';


    axiosInstance.interceptors.response.use(
        (response) =>
            response, async (error) => {

            const errorStatus = error.response.status;

            if (errorStatus !== 401) {
                const errorMessage = error.response?.data?.detail ||
                    error?.response?.data?.non_field_errors?.find((item: string) => item) ||
                    error?.response?.data?.errors?.non_field_errors?.find((item: string) => item)
                customNotification({
                    type: 'error',
                    message: errorMessage.length ? errorMessage : 'Ошибка сервера'
                })
            }

            return Promise.reject(error)
        });
    return axiosInstance
};
