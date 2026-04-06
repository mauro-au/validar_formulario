import { REGEX_EMAIL } from '../constants/constants';

export const validateEmail = (email) => {
  return REGEX_EMAIL.test(email);
};
