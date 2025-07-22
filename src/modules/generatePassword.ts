// Elementos del DOM
// En este primer bloque defino los elementos por ID del html. (Valores de entradas)
const passwordInput = document.getElementById("password") as HTMLInputElement;
const passwordLengthRange = document.getElementById("passwordLengthRange") as HTMLInputElement;
const passwordLength = document.getElementById("passwordLength") as HTMLInputElement;


// Se Defininen los elementos del HTML (Checkboxes)
const includeUppercase = document.getElementById("check-vertical-list-group1") as HTMLInputElement;
const includeLowercase = document.getElementById("check-vertical-list-group2") as HTMLInputElement;
const includeNumbers = document.getElementById("check-vertical-list-group3") as HTMLInputElement;
const includeSymbols = document.getElementById("check-vertical-list-group4") as HTMLInputElement;


// Construye el conjunto de caracteres disponibles basado en los checkboxes seleccionados
function getSelectedCharacters(): string {
  let characters = "";
  if (includeUppercase?.checked) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase?.checked) characters += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers?.checked) characters += "0123456789";
  if (includeSymbols?.checked) characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  return characters;
}

// Generación de contraseñas de acuerdo a la longitud indicada por el usuario.
function generatePassword(length: number, characters: string): string {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

// Genera y actualiza la contraseña usando los valores actuales de la interfaz (slider)
// `void` indica que la función no devuelve ningún valor
function updatePassword(): void {
  const length = parseInt(passwordLengthRange.value);
  passwordLength.value = length.toString();
  const characters = getSelectedCharacters();
  passwordInput.value = generatePassword(length, characters);
}


// Escucha cambios en slider y checkboxes para actualizar contraseña automáticamente
passwordLengthRange?.addEventListener("input", updatePassword);
[includeUppercase, includeLowercase, includeNumbers, includeSymbols].forEach(cb =>
  cb?.addEventListener("change", updatePassword)
);


// Inicializa la aplicación con configuración por defecto al cargar la página (Password = 12 y checkboxes marcadas)
window.addEventListener("DOMContentLoaded", () => {
  includeUppercase.checked = true;
  includeLowercase.checked = true;
  includeNumbers.checked = true;
  includeSymbols.checked = true;

  passwordLengthRange.value = "12";
  updatePassword();
});
