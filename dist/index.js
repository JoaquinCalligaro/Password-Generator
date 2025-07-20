"use strict";
// src/index.ts
// Obtiene el elemento de entrada de la contraseña.
const passwordInput = document.getElementById("password");
// Obtiene el botón de generar contraseña.
const generateButton = document.getElementById("generate");
// Agrega un listener al botón de generar contraseña.
generateButton === null || generateButton === void 0 ? void 0 : generateButton.addEventListener("click", () => {
    // Define los conjuntos de caracteres permitidos.
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    // Combina todos los conjuntos de caracteres.
    const allCharacters = uppercase + lowercase + numbers + symbols;
    // Obtiene la longitud de la contraseña del campo de entrada.
    const lengthInput = document.getElementById("passwordLength");
    const length = parseInt(lengthInput.value);
    // Genera una contraseña de la longitud especificada utilizando todos los caracteres permitidos.
    const password = generatePassword(length, allCharacters);
    // Actualiza el valor del campo de entrada de la contraseña.
    passwordInput.value = password;
});
/**
 * Genera una contraseña aleatoria.
 *
 * @param length La longitud de la contraseña.
 * @param characters El conjunto de caracteres permitidos.
 * @returns La contraseña aleatoria generada.
 */
function generatePassword(length, characters) {
    let password = "";
    // Itera sobre la longitud de la contraseña.
    for (let i = 0; i < length; i++) {
        // Agrega un carácter aleatorio a la contraseña.
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
// Obtiene el botón de mostrar/ocultar contraseña.
const togglePasswordButton = document.getElementById("togglePassword");
// Agrega un listener al botón de mostrar/ocultar contraseña.
togglePasswordButton === null || togglePasswordButton === void 0 ? void 0 : togglePasswordButton.addEventListener("click", () => {
    // Obtiene el tipo actual del campo de entrada de la contraseña.
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    // Establece el nuevo tipo del campo de entrada de la contraseña.
    passwordInput.setAttribute("type", type);
    // Obtiene las imágenes de ojo abierto y cerrado.
    const eyeOpen = togglePasswordButton.querySelector('img[src="./assets/icons/eye-open.png"]');
    const eyeClosed = togglePasswordButton.querySelector('img[src="./assets/icons/closed-eye.png"]');
    // Alterna la visibilidad de las imágenes de ojo abierto y cerrado.
    if (type === "password") {
        eyeOpen === null || eyeOpen === void 0 ? void 0 : eyeOpen.classList.remove("hidden");
        eyeClosed === null || eyeClosed === void 0 ? void 0 : eyeClosed.classList.add("hidden");
    }
    else {
        eyeOpen === null || eyeOpen === void 0 ? void 0 : eyeOpen.classList.add("hidden");
        eyeClosed === null || eyeClosed === void 0 ? void 0 : eyeClosed.classList.remove("hidden");
    }
});
