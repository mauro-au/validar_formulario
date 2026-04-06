export const createError = (parent, message) => {
  const newSmall = document.createElement('small');
  newSmall.textContent = message;
  parent.appendChild(newSmall);
};

// Helpers para mostrar/ocultar errores
export const showError = (input, message) => {
  const parent = input.parentElement;
  const existingError = parent.querySelector('small');
  input.classList.add('input-error');
  if (!existingError) {
    createError(parent, message);
  } else {
    existingError.textContent = message;
  }
};

export const clearAllErrors = (input) => {
  const parent = input.parentElement;
  const existingError = parent.querySelector('small');
  input.classList.remove('input-error');
  if (existingError) {
    existingError.remove();
  }
};
