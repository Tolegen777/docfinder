import {localStorageConstants} from "@/const/localStorageConstants";

export const cityService = {
  getCityId: (): string => {
    return localStorage.getItem(localStorageConstants.cityId) ?? '';
  },

  setCityId: (id: string): void => {
    localStorage.setItem(localStorageConstants.cityId, id);
  },
};
