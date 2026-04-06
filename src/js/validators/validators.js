import { MESSAGES } from './../constants/constants'
import { validateEmail } from './emailValidator'
import { validatePhone } from './phoneValidator'


export const FIELD_VALIDATORS = {
  email: (input) => validateEmail(input.value),
  phone: (input) => validatePhone(input.value),
  password: (input) => input.value.length >= 8,
  checkbox: (input) => input.checked,
};

export const validateInput = (input) => {
  if (input.value.trim() === '')
    return { valid: false, message: MESSAGES.empty };

  const validator = FIELD_VALIDATORS[input.id];
  if (validator && !validator(input)) {
    return { valid: false, message: MESSAGES[input.id] };
  }

  return { valid: true };
};

export const handleInput = (e, FIELDS, showError, clearError) => {
  const input = e.target;
  if (!FIELDS.includes(input)) return;
  const result = validateInput(input);
  if (!result.valid) showError(input, result.message);
  else clearError(input);
};
