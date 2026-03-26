const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const userName = document.querySelector('#userName');
const password = document.querySelector('#password');
const checkbox = document.querySelector('#terms');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal__close-btn');
const modalContent = document.querySelector('.modal__profile');
const fechaActual = document.querySelector('.modal__date');
const inputPhone = document.getElementById('phone');
const PREFIX = '+56 9 ';

// Campos a validar en orden
const FIELDS = [nameInput, email, phone, userName, password];

const clearModal = () => {
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }
};

const clearInputs = () => {
  FIELDS.forEach((f) => (f.value = ''));
  checkbox.checked = false;
};

const getValue = () => {
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="modal__card">
      <figure class="modal__avatar">
        <img src="https://static.photos/nature/200x200" width="70" alt="Imagen aleatoria de naturaleza para el avatar">
      </figure>
      <div class="modal__info">
        <span class="modal__chip">${userName.value}</span>
        <h3 class="modal__name">${nameInput.value}</h3>
        <p>
          <i class="ti ti-mail-check modal__icon-info"></i>${email.value}
        </p>
        <p>
          <i class="ti ti-device-mobile-check modal__icon-info"></i>${phone.value}
        </p>
      </div>
    </div>
  `;

  modalContent.appendChild(template.content.cloneNode(true));
  modal.showModal();
};

const createError = (parent, message) => {
  const newSmall = document.createElement('small');
  newSmall.textContent = message;
  parent.appendChild(newSmall);
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^\+56 9 \d{8}$/;
  return regex.test(phone);
};

// Mensajes y validadores reutilizables
const MESSAGES = {
  empty: 'El campo no puede estar vacío',
  email: 'El formato de correo es incorrecto',
  phone: 'El formato de teléfono es incorrecto',
  password: 'El password debe tener 8 o mas caracteres',
};

const FIELD_VALIDATORS = {
  email: (input) => validateEmail(input.value),
  phone: (input) => validatePhone(input.value),
  password: (input) => input.value.length >= 8,
};

// Helpers para mostrar/ocultar errores
const showError = (input, message) => {
  const parent = input.parentElement;
  const existingError = parent.querySelector('small');
  input.classList.add('input-error');
  if (!existingError) {
    createError(parent, message);
  } else {
    existingError.textContent = message;
  }
};

const clearError = (input) => {
  const parent = input.parentElement;
  const existingError = parent.querySelector('small');
  input.classList.remove('input-error');
  existingError?.remove();
};

// Validador central por campo. Devuelve { valid, message }
const validateInput = (input) => {
  if (input.value.trim() === '') return { valid: false, message: MESSAGES.empty };

  const validator = FIELD_VALIDATORS[input.id];
  if (validator && !validator(input)) {
    return { valid: false, message: MESSAGES[input.id] };
  }

  return { valid: true };
};

// Handler para eventos `input`
const handleInput = (e) => {
  const input = e.target;
  // solo procesar si es uno de los campos manejados
  if (!FIELDS.includes(input)) return;
  const result = validateInput(input);
  if (!result.valid) showError(input, result.message);
  else clearError(input);
};

inputPhone.addEventListener('input', function() {
  // Si el usuario intenta borrar el prefijo, se vuelve a poner
  if (!inputPhone.value.startsWith(PREFIX )) {
      inputPhone.value = PREFIX ;
  }
});

inputPhone.addEventListener('keydown', function(e) {
  // Evita que el cursor retroceda antes del prefijo con la tecla borrar
  const isDeleting = e.key === 'Backspace' || e.key === 'Delete';
  const isBeforePrefix = inputPhone.selectionStart <= PREFIX.length;

  if (isDeleting && isBeforePrefix) {
    e.preventDefault();
  }
});

inputPhone.addEventListener('click', function() {
  // Si hace clic al inicio, mueve el cursor al final del prefijo
  if (inputPhone.selectionStart < PREFIX.length) {
      inputPhone.setSelectionRange(PREFIX.length, PREFIX.length);
  }
});

form.addEventListener('input', handleInput);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let allValid = true;
  FIELDS.forEach((field) => {
    const { valid, message } = validateInput(field);
    if (!valid) {
      showError(field, message);
      allValid = false;
    } else {
      clearError(field);
    }
  });

  if (allValid) {
    getValue();
  }

  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  fechaActual.innerText = new Date().toLocaleDateString('es-ES', opciones);
});

closeBtn.addEventListener('click', () => {
  modal.close();
  clearInputs();
  clearModal();
});
