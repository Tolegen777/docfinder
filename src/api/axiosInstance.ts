import axios, {AxiosError, AxiosRequestConfig, AxiosRequestHeaders,} from 'axios';
import {tokenService} from "@/utils/services/tokenService";
// import {authApi} from "@/api/authApi";

type FailedQueue = {
    reject: (error: Error | null) => void;
    resolve: (token: string | null) => void;
};

export const createApiInstance = (navigate?: (url: string) => void) => {
    const axiosInstance = axios.create({
        baseURL: 'https://sandbox.nemerea.com/api/v1/',
    });


    let isRefreshing = false;

    let failedQueue: FailedQueue[] = [];

    const processQueue = (error: Error | null, token: string | null = null) => {
        failedQueue.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        failedQueue = [];
    };

    axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

// @ts-ignore
    axiosInstance.interceptors.request.use((config) => {
        const accessToken = tokenService.getLocalAccessToken()

        // console.log(accessToken, 'ACCESS')

        if (accessToken) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        }

        return config
    })


    axiosInstance.interceptors.response.use(
        ( response ) =>
            response, async ( error ) => {

            const originalRequest: AxiosRequestConfig<AxiosRequestHeaders> & {
                _retry: boolean
            } = error.config

            const errorStatus = error.response.status;
            const errorCode = error.response.data?.code;

            // console.log(errorStatus, !originalRequest._retry, tokenService.getLocalAccessToken())
            if (errorStatus === 401 && !originalRequest._retry && tokenService.getLocalAccessToken() && errorCode === 'token_not_valid') {

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {

                        failedQueue.push({ resolve, reject })


                    }).then((token) => {

                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                        }

                        return axiosInstance(originalRequest)

                    }).catch(err => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                // return new Promise((resolve, reject) => {
                //     void authApi.refreshAccessToken(tokenService.getLocalRefreshToken()).then((response) => {
                //
                //         // Set refresh access and refresh token
                //         tokenService.updateLocalTokenData(response?.access as string, 'access')
                //
                //         axios.defaults.headers.common.Authorization = `Bearer ${response?.access}`;
                //
                //         if (originalRequest && originalRequest.headers) {
                //             originalRequest.headers.Authorization = `Bearer ${response?.access}`;
                //         }
                //
                //         // Send requests without errors, with new access token
                //         processQueue(null, response?.access)
                //         resolve(axiosInstance(originalRequest))
                //
                //     }).catch((err: AxiosError) => {
                //         processQueue(err, null)
                //         reject(error)
                //     }).then(() => {
                //         isRefreshing = false
                //     })
                // })
            }

            if (errorStatus !== 401) {
                const errorMessage = error.response?.data?.detail
                // customNotification({
                //     type: 'error',
                //     message: errorMessage.length ? errorMessage : 'Ошибка сервера'
                // })
            }

            return Promise.reject(error)
        });
    return axiosInstance
};