export const MESSAGES = {
  empty: 'Completa este campo.',
  email: 'Revisa tu correo, no parece válido.',
  phone: 'Revisa tu número, no parece válido.',
  password: 'Usa al menos 8 caracteres.',
  checkbox: 'Para continuar, acepta los términos.',
};

export const PREFIX = '+56 9 ';
export const REGEX_PHONE = /^\+56 9 \d{8}$/;
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };