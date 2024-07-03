import { localStorageConstants } from "@/const/localStorageConstants";

export const cityService = {
  getCityId: (): string => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(localStorageConstants.cityId) ?? '';
    }
    return '';
  },

  setCityId: (id: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(localStorageConstants.cityId, id);
    }
  },
};
