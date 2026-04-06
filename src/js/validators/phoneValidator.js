import { REGEX_PHONE } from '../constants/constants';

export const validatePhone = (phone) => {
  return REGEX_PHONE.test(phone);
};
