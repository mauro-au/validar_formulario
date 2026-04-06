export const loader = (registrar) => {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  registrar.textContent = '';
  registrar.appendChild(loader);
};
