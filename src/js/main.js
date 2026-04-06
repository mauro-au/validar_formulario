import './../css/main.css';

import { PREFIX, DATE_OPTIONS } from './constants/constants';
import { closeModal } from './ui/modal';
import { handleSuccess } from './ui/success';
import { validateInput, handleInput } from './validators/validators';
import { clearAllErrors, showError } from './ui/error';
import { resizeCanvas } from './lib/confetti';

const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const userName = document.querySelector('#userName');
const password = document.querySelector('#password');
const checkbox = document.querySelector('#checkbox');
const modal = document.querySelector('dialog');
const closeBtn = document.querySelector('.modal__close-btn');
const modalContent = document.querySelector('.modal__profile');
const fechaActual = document.querySelector('.modal__date');
const registrar = document.querySelector('.registration-btn');
const canvas = document.getElementById('confetti-canvas');
const togglePasswordButton = document.querySelector('.toggle-btn');
const loaderRemove = document.querySelector('.loader');

// Campos a validar en orden
const FIELDS = [nameInput, email, phone, userName, password, checkbox];

resizeCanvas(canvas);

window.addEventListener('load', () => {
  FIELDS.forEach((field) => clearAllErrors(field));
});

togglePasswordButton.addEventListener('click', () => {
  const isHidden = password.type === 'password';
  if (password.value !== '') {
    password.type = isHidden ? 'text' : 'password';
    togglePasswordButton.classList.toggle('visible', isHidden);
    togglePasswordButton.setAttribute(
      'aria-label',
      isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña'
    );
  }
});

phone.addEventListener('input', () => {
  // Si el usuario intenta borrar el prefijo, se vuelve a poner
  if (!phone.value.startsWith(PREFIX)) {
    phone.value = PREFIX;
  }
});

phone.addEventListener('keydown', (e) => {
  // Evita que el cursor retroceda antes del prefijo con la tecla borrar
  const isDeleting = e.key === 'Backspace' || e.key === 'Delete';
  const isBeforePrefix = phone.selectionStart <= PREFIX.length;

  if (isDeleting && isBeforePrefix) {
    e.preventDefault();
  }
});

phone.addEventListener('click', () => {
  // Si hace clic al inicio, mueve el cursor al final del prefijo
  if (phone.selectionStart < PREFIX.length) {
    phone.setSelectionRange(PREFIX.length, PREFIX.length);
  }
});

form.addEventListener('input', (e) =>
  handleInput(e, FIELDS, showError, clearAllErrors)
);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let allValid = true;

  FIELDS.forEach((field) => {
    const { valid, message } = validateInput(field);
    valid
      ? clearAllErrors(field)
      : (showError(field, message), (allValid = false));
  });

  if (allValid)
    handleSuccess({
      fechaActual,
      DATE_OPTIONS,
      registrar,
      canvas,
      modal,
      loaderRemove,
      userName,
      nameInput,
      email,
      phone,
      modalContent,
    });
});

window.addEventListener('resize', resizeCanvas(canvas));

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal({ modal, canvas, modalContent, FIELDS, checkbox });
  }
});

closeBtn.addEventListener('click', () =>
  closeModal({ modal, canvas, modalContent, FIELDS, checkbox })
);
