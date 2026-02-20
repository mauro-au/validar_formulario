const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const userName = document.querySelector("#userName");
const password = document.querySelector("#password");
const checkbox = document.querySelector("#checkbox");
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.closeModal');
const modalContent = document.querySelector('.modalContent');
const fechaActual = document.querySelector('.fecha_actual');

const clearModal = () => {
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild)
  }
}

const clearInputs = () => {
  name.value = ''
  email.value = ''
  phone.value = ''
  userName.value = ''
  password.value = ''
  checkbox.checked = false
}

const getValue = () => {
  const template = document.createElement('template');
  template.innerHTML = `
    <figure class="avatar_modal">
      <img src="https://i.pravatar.cc/70" alt="">
    </figure>
    <div class="info">
      <div class="info__user">
        <h3 class="name">${name.value}</h3>
        <small>${email.value}</small>
      </div>
      <div class="info_icon">
        <i class="fa-solid fa-mobile-button" style="color: rgb(148, 148, 148);"></i>
        <i class="fa-solid fa-user" style="color: rgb(148, 148, 148);"></i>
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

const validator = (input, validate, message = "El campo no puede estar vacío") => {
  const parent = input.parentElement;
  const existingError = parent.querySelector("small");

  if (validate) {
    input.classList.add("input-error");
    if (!existingError) {
      createError(parent, message);
    } else {
      existingError.textContent = message;
    }
    return;
  }

  input.classList.remove("input-error");
  existingError?.remove();
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^\+56 9 \d{8}$/;
  return regex.test(phone);
};

// Agregar validación en tiempo real a cada campo
name.addEventListener("input", () => validator(name, name.value === "" ? true : false));
email.addEventListener("input", () => {
  validator(
    email, email.value === "" ? true : !validateEmail(email.value),
    email.value === "" ? "El campo no puede estar vacío" : "El formato de correo es incorrecto");
});
phone.addEventListener("input", () => {
  validator(
    phone, phone.value === "" ? true : !validatePhone(phone.value),
    phone.value === "" ? "El campo no puede estar vacío" : "El formato de teléfono es incorrecto");
});
userName.addEventListener("input", () => validator(userName, userName.value === "" ? true : false));
password.addEventListener("input", () => {
  validator(
    password, password.value === "" ? true : password.value.length < 8,
    password.value === "" ? "El campo no puede estar vacío" : "El password debe tener 8 o mas caracteres");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Si todo es válido, mostrar datos
  if (
    form.checkValidity() &&
    name.value &&
    email.value &&
    validateEmail(email.value) &&
    phone.value &&
    userName.value &&
    password.value
  ) {
    getValue();
  }
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  fechaActual.innerText = new Date().toLocaleDateString('es-ES', opciones);
});

closeBtn.addEventListener('click', () => {
  modal.close()
  clearInputs()
  clearModal()
});

