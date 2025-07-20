import { setupTogglePassword } from './modules/togglePassword';

const passwordInput = document.getElementById("password") as HTMLInputElement;

// Se llama a la funcion
setupTogglePassword(passwordInput);
