export function setupTogglePassword(passwordInput: HTMLInputElement) {
  // Obtiene el botón de mostrar/ocultar contraseña.
const togglePasswordButton = document.getElementById("togglePassword");
// Agrega un listener al botón de mostrar/ocultar contraseña.
togglePasswordButton?.addEventListener("click", () => {
  // Obtiene el tipo actual del campo de entrada de la contraseña.
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  // Establece el nuevo tipo del campo de entrada de la contraseña.
  passwordInput.setAttribute("type", type);

  // Obtiene las imágenes de ojo abierto y cerrado.
  const eyeOpen = togglePasswordButton.querySelector('img[src="./assets/icons/eye-open.png"]');
  const eyeClosed = togglePasswordButton.querySelector('img[src="./assets/icons/closed-eye.png"]');

  // Alterna la visibilidad de las imágenes de ojo abierto y cerrado.
  if (type === "password") {
    eyeOpen?.classList.remove("hidden");
    eyeClosed?.classList.add("hidden");
  } else {
    eyeOpen?.classList.add("hidden");
    eyeClosed?.classList.remove("hidden");
  }
});
}
