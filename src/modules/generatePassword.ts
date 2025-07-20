// src/index.ts

// Obtiene elementos del DOM
const passwordInput = document.getElementById("password") as HTMLInputElement;
const passwordLengthRange = document.getElementById("passwordLengthRange") as HTMLInputElement;
const passwordLength = document.getElementById("passwordLength") as HTMLInputElement;

// Checkboxes para incluir tipos de caracteres
const includeUppercase = document.getElementById("check-vertical-list-group1") as HTMLInputElement;
const includeLowercase = document.getElementById("check-vertical-list-group2") as HTMLInputElement;
const includeNumbers = document.getElementById("check-vertical-list-group3") as HTMLInputElement;
const includeSymbols = document.getElementById("check-vertical-list-group4") as HTMLInputElement;

// Función para obtener caracteres seleccionados
function getSelectedCharacters(): string {
  let characters = "";
  if (includeUppercase?.checked) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase?.checked) characters += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers?.checked) characters += "0123456789";
  if (includeSymbols?.checked) characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  return characters;
}

// Función para generar contraseña aleatoria
function generatePassword(length: number, characters: string): string {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

// Actualiza el valor y la contraseña
function updatePassword(): void {
  const length = parseInt(passwordLengthRange.value);
  passwordLength.value = length.toString();
  const characters = getSelectedCharacters();
  passwordInput.value = generatePassword(length, characters);
}

// Eventos: mover slider o cambiar checkbox
passwordLengthRange?.addEventListener("input", updatePassword);
[includeUppercase, includeLowercase, includeNumbers, includeSymbols].forEach(cb =>
  cb?.addEventListener("change", updatePassword)
);

// Al cargar la página: marcar checkbox y generar contraseña inicial de 12 caracteres
window.addEventListener("DOMContentLoaded", () => {
  includeUppercase.checked = true;
  includeLowercase.checked = true;
  includeNumbers.checked = true;
  includeSymbols.checked = true;

  passwordLengthRange.value = "12";
  updatePassword();
});
