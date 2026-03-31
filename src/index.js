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
const inputPhone = document.getElementById('phone');
const registrar = document.querySelector('.registration-btn');
const PREFIX = '+56 9 ';
const canvas = document.getElementById('confetti-canvas');
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.querySelector('.toggle-btn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const myConfetti = confetti.create(canvas, { resize: false });

// Campos a validar en orden
const FIELDS = [nameInput, email, phone, userName, password, checkbox];

const clearModal = () => {
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }
};

const clearInputs = () => {
  FIELDS.forEach((f) => (f.value = ''));
  checkbox.checked = false;
};

togglePasswordButton.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  if (passwordInput.value !== '') {
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePasswordButton.classList.toggle('visible', isHidden);
    togglePasswordButton.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
  }
})

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
  document.body.classList.add('modal-open');
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
  checkbox: 'Debe aceptar los términos para continuar',
};

const FIELD_VALIDATORS = {
  email: (input) => validateEmail(input.value),
  phone: (input) => validatePhone(input.value),
  password: (input) => input.value.length >= 8,
  checkbox: (input) => input.checked === true,
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

const loader = () => {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  registrar.textContent = ''
  registrar.appendChild(loader);
}

function lanzarConfetti() {
  // Centro lado izquierdo
  myConfetti({
    particleCount: 80,
    angle: 60,
    spread: 60,
    origin: { x: 0, y: 0.5 }
  });

  // Centro lado derecho
  myConfetti({
    particleCount: 80,
    angle: 120,
    spread: 60,
    origin: { x: 1, y: 0.5 }
  });
}

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
    loader()
    setTimeout(() => {
      getValue();
      canvas.showPopover();
      lanzarConfetti();
      modal.classList.add('is-visible');
      const loaderRemove = document.querySelector('.loader');
      loaderRemove.remove()
      registrar.textContent = 'Registrar'
    }, 1000)
  }

  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  fechaActual.innerText = new Date().toLocaleDateString('es-ES', opciones);
});

const closeModal = () => {
  modal.classList.remove('is-visible');
  modal.classList.add("closing");
  setTimeout(() => {
    modal.classList.remove("closing");
    modal.close();
    document.body.classList.remove('modal-open');
    canvas.hidePopover();
    clearModal();
  }, 1000);
  clearInputs();
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});

closeBtn.addEventListener('click', closeModal);
