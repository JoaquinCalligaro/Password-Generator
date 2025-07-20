import { setupTogglePassword } from './modules/togglePassword';

const passwordInput = document.getElementById("password") as HTMLInputElement;

// Esta línea es CLAVE
setupTogglePassword(passwordInput);
