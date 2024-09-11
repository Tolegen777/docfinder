import { tokenConstants } from "@/const/tokenConstants";

export const tokenService = {
  getLocalRefreshToken: (): string => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(tokenConstants.refresh) ?? '';
    }
    return '';
  },

  getLocalAccessToken: (): string => {
    if (typeof window !== 'undefined') {
      const token  = localStorage.getItem(tokenConstants.access)
      return token === 'undefined' ? '' : (token ?? '');
    }
    return '';
  },

  updateLocalTokenData: (token: string, tokenType: 'access' | 'refresh'): void => {
    if (typeof window !== 'undefined') {
      const key = tokenType === 'access' ? tokenConstants.access : tokenConstants.refresh;
      localStorage.setItem(key, token);
    }
  },
};
