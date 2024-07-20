import type { ILoginInput, IAuthResponse } from '@/types/authTypes';
import axios from "axios";
import {axiosInstanceWithTokenLogic} from "@/api/axiosInstanceWithTokenLogic";
import {resetService} from "@/utils/services/resetService";
import {customConfirmAction} from "@/utils/customConfirmAction";

export const authApi = {
  signInUser: async (user: ILoginInput) => {
    const response = await axiosInstanceWithTokenLogic.post<IAuthResponse>('patients/auth/patient-login-with-email/', user);
    return response.data
  },

  registerUser: async (user: ILoginInput) => {
    const response = await axiosInstanceWithTokenLogic.post<IAuthResponse>('patients/auth/patient-register/', user);
    return response.data
  },

  signOutUser: async () => {
    const response = await axiosInstanceWithTokenLogic.post<IAuthResponse>('patients/auth/patient-logout/');
    return response.data
  },

  refreshAccessToken: async (refresh_token: string): Promise<IAuthResponse | null> => {
    try {
      const BASE_URL = 'https://sandbox.nemerea.com/api/v1/';
      const response = await axios.post<IAuthResponse>(BASE_URL + 'patients/auth/refresh-token/', { refresh: refresh_token });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Обработка ошибок, связанных с axios
        const errorMessage = error.response?.data?.find((item: string) => item)
        if (errorMessage === 'Refresh token is invalid or expired') {
          customConfirmAction({
            message: 'Время вашего сеанса истекло, пожалуйста, войдите снова!',
            action: resetService,
            alignTop: true,
            hideCancelButton: true,
            okBtnText: 'Выйти'
          })
        }
      } else {
        // Обработка других ошибок
        console.log('Произошла ошибка:', error);
      }
      return null; // Возвращаем null или другое значение, чтобы указать, что обновление токена не удалось
    }
  }
};
