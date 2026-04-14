const clearModal = (modalContent) => {
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }
};

const clearInputsModal = (FIELDS, checkbox) => {
  FIELDS.forEach((f) => {
    if (f.type !== 'checkbox') {
      f.value = '';
    }
  });
  checkbox.checked = false;
};

export const closeModal = ({modal, canvas, modalContent, FIELDS, checkbox}) => {
  modal.classList.remove('is-visible');
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('closing');
    modal.close();
    document.body.classList.remove('modal-open');
    canvas.hidePopover();
    clearModal(modalContent);
  }, 1000);
  clearInputsModal(FIELDS, checkbox);
};

export const createModal = ({
  userName,
  nameInput,
  email,
  phone,
  modalContent,
  modal,
}) => {
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="modal__card">
      <figure class="modal__avatar">
        <img src="https://static.photos/nature/200x200" width="70" alt="Avatar del usuario">
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
