
const form = document.querySelector('fieldset');


const createSmall = (parent, errorText) => {
    const newSmall = document.createElement('small')
    newSmall.textContent = errorText
    parent.appendChild(newSmall)
}


const stringInput = (e) => {
    const parent = e.target.parentElement
    const small = parent.querySelector('small')

    const regex = /^[a-zA-Z\s]+$/;

    if (e.target.type === 'text') {
        if (!small) {
            createSmall(parent, 'El formato de texto es incorrecto');
        }
    }
}
const telInput = (e) => {
    const parent = e.target.parentElement
    const small = parent.querySelector('small')
    // console.log(typeof e.target.value)
    const regexChile = /^\+56 9 \d{8}$/;
    // console.log(regexChile.test(e.target.value))
    if (e.target.type === 'tel' && e.target.value === '') {
        if (!small) {
            createSmall(parent, 'El campo no puede estar vacío')
        }

    } else if (e.target.type === 'tel' && !regexChile.test(e.target.value)) {
        if (!small) {
            createSmall(parent, 'El formato de teléfono es incorrecto')
        }
    } else {
        if (small) small.remove();
    }
}


const targetInput = (e) => {
    const parent = e.target.parentElement
    const small = parent.querySelector('small')
    // console.log(e.target.attributes.type)

    if (e.target.value === '') {
        e.target.classList.add('input-error')
        if (!small) {
            createSmall(parent, 'El campo no puede estar vacío')
        }
    } else {
        e.target.classList.remove('input-error')
        if (small) small.remove()
    }

    stringInput(e);
    telInput(e);
}

form.addEventListener('input', targetInput)
