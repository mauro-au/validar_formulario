import { loader } from './loader';
import { createModal } from './modal';
import { launchConfetti } from '../lib/confetti';

export const handleSuccess = ({
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
}) => {
  fechaActual.innerText = new Date().toLocaleDateString('es-ES', DATE_OPTIONS);

  loader(registrar);

  setTimeout(() => {
    createModal({userName, nameInput, email, phone, modalContent, modal});
    canvas.showPopover();
    launchConfetti(canvas);
    modal.classList.add('is-visible');
    loaderRemove?.remove();
    registrar.textContent = 'Registrar';
  }, 1000);
};
