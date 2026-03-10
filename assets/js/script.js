const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const userName = document.querySelector("#userName");
const password = document.querySelector("#password");
const checkbox = document.querySelector("#checkbox");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".closeModal");
const modalContent = document.querySelector(".modalContent");
const fechaActual = document.querySelector(".fecha_actual");

// Campos a validar en orden
const FIELDS = [nameInput, email, phone, userName, password];

const clearModal = () => {
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }
};

const clearInputs = () => {
  FIELDS.forEach((f) => (f.value = ""));
  checkbox.checked = false;
};

const getValue = () => {
  const template = document.createElement("template");
  template.innerHTML = `
    <figure class="avatar_modal">
      <img src="https://i.pravatar.cc/70" alt="">
    </figure>
    <div class="info">
      <div class="info__user">
        <h3 class="name">${nameInput.value}</h3>
        <small>${email.value}</small>
      </div>
      <div class="info_icon">
        <i class="ti ti-user" style="color: rgb(148, 148, 148);"></i>
        <i class="ti ti-device-mobile" style="color: rgb(148, 148, 148);"></i>
      </div>
    </div>
  `;

  modalContent.appendChild(template.content.cloneNode(true));
  modal.showModal();
};

const createError = (parent, message) => {
  const newSmall = document.createElement("small");
  newSmall.textContent = message;
  parent.appendChild(newSmall);
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^\+56 9 \d{8}$/;
  return regex.test(phone);
};

// Mensajes y validadores reutilizables
const MESSAGES = {
  empty: "El campo no puede estar vacío",
  email: "El formato de correo es incorrecto",
  phone: "El formato de teléfono es incorrecto",
  password: "El password debe tener 8 o mas caracteres",
};

const FIELD_VALIDATORS = {
  email: (input) => validateEmail(input.value),
  phone: (input) => validatePhone(input.value),
  password: (input) => input.value.length >= 8,
};

// Helpers para mostrar/ocultar errores
const showError = (input, message) => {
  const parent = input.parentElement;
  const existingError = parent.querySelector("small");
  input.classList.add("input-error");
  if (!existingError) {
    createError(parent, message);
  } else {
    existingError.textContent = message;
  }
};

const clearError = (input) => {
  const parent = input.parentElement;
  const existingError = parent.querySelector("small");
  input.classList.remove("input-error");
  existingError?.remove();
};

// Validador central por campo. Devuelve { valid, message }
const validateInput = (input) => {
  if (input.value.trim() === "")
    return { valid: false, message: MESSAGES.empty };

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

form.addEventListener("input", handleInput);

form.addEventListener("submit", (e) => {
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

  const opciones = { year: "numeric", month: "long", day: "numeric" };
  fechaActual.innerText = new Date().toLocaleDateString("es-ES", opciones);
});

closeBtn.addEventListener("click", () => {
  modal.close();
  clearInputs();
  clearModal();
});
