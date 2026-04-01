<div align="center">

◆ &nbsp; PROYECTO &nbsp; ◆

```
██████╗ ███████╗ ██████╗ ██╗███████╗████████╗███████╗██████╗
██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   █████╗  ██████╔╝
██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║  ██║███████╗╚██████╔╝██║███████║   ██║   ███████╗██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
```
———————— ● ————————

### Interfaz de registro — construida sin frameworks.



<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Stylelint](https://img.shields.io/badge/Stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

<br/>

</div>

## 📝 Descripción

Página de registro completamente artesanal que demuestra técnicas modernas de frontend sin usar ningún framework. Cada animación, interacción y componente está escrito en HTML, CSS y JavaScript vanilla — con foco en arquitectura limpia y calidad de producción.

> Construido como exploración profunda de las capacidades modernas de CSS y JS: CSS nesting, `@starting-style`, ES modules, y más.

## ✨ Funcionalidades

<table>
<tr>
<td width="50%">

### 🎨 UI & Animaciones

- Animaciones de entrada/salida del modal con CSS `@keyframes`, toggling de clases `.opening` / `.closing` y limpieza con `animationend`
- `@starting-style` para transiciones nativas del backdrop del `<dialog>`
- Efecto confetti con `canvas-confetti` resuelto a través de la **Popover API** para escapar el problema de apilamiento del Top Layer con `<dialog>`
- Scroll-lock con `scrollbar-gutter` para evitar layout shift al abrir el modal

</td>
<td width="50%">

### 🔐 Formulario & Validación

- Toggle de contraseña con iconos SVG animados (ojo / ojo-tachado)
- Validación cruzada del campo de confirmación
- Inputs accesibles con integración de íconos izquierda/derecha usando wrappers `position: relative` y clases modificadoras
- Checkbox personalizado con CSS puro

</td>
</tr>
<tr>
<td width="50%">

### 🏗️ Arquitectura CSS

- CSS nesting para estilos co-ubicados por componente
- Breakpoints con `@custom-media` vía PostCSS — fuente única de verdad
- `color-mix()` para variantes transparentes derivadas de tokens
- Custom properties locales con prefijo `--_`
- `clamp()` para tipografía fluida

</td>
<td width="50%">

### ⚙️ Toolchain

- **Vite** — servidor de desarrollo + build
- **ESLint** flat config (`eslint.config.js`)
- **Prettier** — formateo de código
- **Stylelint** — linting CSS
- **ES Modules** — JS dividido en módulos lógicos
- **pnpm** — gestor de paquetes rápido y eficiente en disco

</td>
</tr>
</table>

## 📁 Estructura del proyecto

```
├── assets/
│   ├── img/
│   │   ├── background-site.jpg
│   │   └── background-modal.jpg
│   └── fonts/
│       ├── RobotoLt.woff2
│       └── CreatoDisplayBl.woff2
│
├── src/
│   ├── js/
│   │   ├── main.js          # punto de entrada
│   │   ├── modal.js         # apertura/cierre del dialog + animaciones
│   │   ├── confetti.js      # canvas-confetti vía Popover API
│   │   ├── password.js      # toggle, medidor de fortaleza, validación
│   │   └── form.js          # orquestación de validación
│   │
│   └── css/
│       ├── main.css          # declaración de @layer + imports
│       ├── tokens.css        # custom properties
│       ├── base.css          # html, body, tipografía
│       ├── layout.css        # grilla de register-page
│       └── components/
│           ├── form.css
│           ├── dialog.css
│           ├── modal.css
│           └── loader.css
│
├── index.html
├── vite.config.js
├── postcss.config.js
├── eslint.config.js
├── .prettierrc
└── .stylelintrc.json
```

## 🎉Vista Proyecto

<img width="2427" height="1320" alt="imagen" src="https://github.com/user-attachments/assets/df12411f-97e8-43bb-b87d-5947500b4b59" />


## 🚀 Cómo empezar

### Requisitos

- Node.js `>=18`
- pnpm `>=9` — [Instalación](https://pnpm.io/installation)

> **¿Por qué pnpm?** Usa un almacén de paquetes compartido en disco, instala más rápido que npm/yarn y evita instalaciones duplicadas entre proyectos.

### Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/mauro-au/validar_formulario.git
cd register-page

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

### Scripts disponibles

```bash
pnpm dev        # Servidor Vite con HMR
pnpm build      # Build de producción → /dist
pnpm preview    # Preview del build de producción en local
pnpm lint       # ESLint + Stylelint
pnpm format     # Prettier
```

Decisiones técnicas destacadas

### Animación del dialog con `@starting-style`

La entrada del modal usa CSS nativo — sin necesidad de togglear clases con JS para el estado de apertura:

```css
dialog {
  transition:
    opacity 0.4s ease,
    filter 0.4s ease,
    transform 0.4s ease;

  &[open] {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }

  @starting-style {
    &[open] {
      opacity: 0;
      filter: blur(7px);
      transform: translateY(-5%);
    }
  }
}
```

La salida aún usa una clase `.closing` + `transitionend` por seguridad cross-browser — el soporte de `overlay allow-discrete` en Firefox es incompleto a 2025.

### Confetti vía Popover API

`canvas-confetti` necesita renderizar en un `<canvas>` por encima del Top Layer del `<dialog>`. Envolviéndolo en un elemento `popover` lo promueve al Top Layer _después_ del dialog, resolviendo el conflicto de apilamiento sin hacks:

```html
<div id="confetti-host" popover>
  <canvas id="confetti-canvas"></canvas>
</div>
```

## 🌐 Compatibilidad con navegadores

| Feature            | Chrome  | Firefox    | Safari   |
| ------------------ | ------- | ---------- | -------- |
| CSS Nesting        | ✅ 112+ | ✅ 117+    | ✅ 16.5+ |
| `@starting-style`  | ✅ 117+ | ⚠️ parcial | ✅ 17.4+ |
| `color-mix()`      | ✅ 111+ | ✅ 113+    | ✅ 16.2+ |
| Popover API        | ✅ 114+ | ✅ 125+    | ✅ 17+   |
| `scrollbar-gutter` | ✅ 94+  | ✅ 97+     | ✅ 15.4+ |

> `@starting-style` usa `@supports (transition-behavior: allow-discrete)` como proxy de detección de features, con fallback a animación basada en clases JS para Firefox.

<div align="center">

## Autor 😎

Application developed by [**MauroDev**](https://github.com/mauro-au) 🤘​

</div>
