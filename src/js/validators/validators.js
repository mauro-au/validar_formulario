import { MESSAGES } from './../constants/constants';
import { validateEmail } from './emailValidator';
import { validatePhone } from './phoneValidator';

export const FIELD_VALIDATORS = {
  email: (input) => validateEmail(input.value),
  phone: (input) => validatePhone(input.value),
  password: (input) => input.value.length >= 8,
  checkbox: (input) => input.checked,
};

export const validateInput = (input) => {
  if (input.type === 'checkbox') {
    return input.checked
      ? { valid: true }
      : { valid: false, message: MESSAGES.empty };
  }

  if (input.value.trim() === '')
    return { valid: false, message: MESSAGES.empty };

  const validator = FIELD_VALIDATORS[input.id];
  if (validator && !validator(input)) {
    return { valid: false, message: MESSAGES[input.id] };
  }

  return { valid: true };
};

export const handleInput = ({ target }, FIELDS, showError, clearError) => {
  if (!FIELDS.includes(target)) return;
  const result = validateInput(target);

  !result.valid
    ? showError(target, result.message)
    : clearError(target);
};
