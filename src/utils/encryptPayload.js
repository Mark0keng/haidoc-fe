import { AES } from 'crypto-js';

export const encryptPayload = (data) => {
  try {
    if (typeof data === 'object') {
      return AES.encrypt(JSON.stringify(data), 'super-secret').toString();
    }
    if (typeof data === 'string') {
      return AES.encrypt(data, 'super-secret').toString();
    }
  } catch (error) {
    Promise.reject(error);
  }
};
