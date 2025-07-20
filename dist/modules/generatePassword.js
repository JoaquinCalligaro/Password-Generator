"use strict";
// src/index.ts
// Obtiene elementos del DOM
const passwordInput = document.getElementById("password");
const passwordLengthRange = document.getElementById("passwordLengthRange");
const passwordLength = document.getElementById("passwordLength");
// Checkboxes para incluir tipos de caracteres
const includeUppercase = document.getElementById("check-vertical-list-group1");
const includeLowercase = document.getElementById("check-vertical-list-group2");
const includeNumbers = document.getElementById("check-vertical-list-group3");
const includeSymbols = document.getElementById("check-vertical-list-group4");
// Función para obtener caracteres seleccionados
function getSelectedCharacters() {
    let characters = "";
    if (includeUppercase === null || includeUppercase === void 0 ? void 0 : includeUppercase.checked)
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase === null || includeLowercase === void 0 ? void 0 : includeLowercase.checked)
        characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers === null || includeNumbers === void 0 ? void 0 : includeNumbers.checked)
        characters += "0123456789";
    if (includeSymbols === null || includeSymbols === void 0 ? void 0 : includeSymbols.checked)
        characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    return characters;
}
// Función para generar contraseña aleatoria
function generatePassword(length, characters) {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
// Actualiza el valor y la contraseña
function updatePassword() {
    const length = parseInt(passwordLengthRange.value);
    passwordLength.value = length.toString();
    const characters = getSelectedCharacters();
    passwordInput.value = generatePassword(length, characters);
}
// Eventos: mover slider o cambiar checkbox
passwordLengthRange === null || passwordLengthRange === void 0 ? void 0 : passwordLengthRange.addEventListener("input", updatePassword);
[includeUppercase, includeLowercase, includeNumbers, includeSymbols].forEach(cb => cb === null || cb === void 0 ? void 0 : cb.addEventListener("change", updatePassword));
// Al cargar la página: marcar checkbox y generar contraseña inicial de 12 caracteres
window.addEventListener("DOMContentLoaded", () => {
    includeUppercase.checked = true;
    includeLowercase.checked = true;
    includeNumbers.checked = true;
    includeSymbols.checked = true;
    passwordLengthRange.value = "12";
    updatePassword();
});
