// PasswordGenerator Module
export class PasswordGenerator {
  private passwordInput: HTMLInputElement;
  private passwordLengthRange: HTMLInputElement;
  private passwordLength: HTMLInputElement;
  private includeUppercase: HTMLInputElement;
  private includeLowercase: HTMLInputElement;
  private includeNumbers: HTMLInputElement;
  private includeSymbols: HTMLInputElement;

  constructor() {
    // Elementos del DOM
    this.passwordInput = document.getElementById("password") as HTMLInputElement;
    this.passwordLengthRange = document.getElementById("passwordLengthRange") as HTMLInputElement;
    this.passwordLength = document.getElementById("passwordLength") as HTMLInputElement;
    
    // Checkboxes
    this.includeUppercase = document.getElementById("check-vertical-list-group1") as HTMLInputElement;
    this.includeLowercase = document.getElementById("check-vertical-list-group2") as HTMLInputElement;
    this.includeNumbers = document.getElementById("check-vertical-list-group3") as HTMLInputElement;
    this.includeSymbols = document.getElementById("check-vertical-list-group4") as HTMLInputElement;
    
    this.init();
  }

  // Construye el conjunto de caracteres disponibles basado en los checkboxes seleccionados
  public getSelectedCharacters(): string {
    let characters = "";
    if (this.includeUppercase?.checked) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (this.includeLowercase?.checked) characters += "abcdefghijklmnopqrstuvwxyz";
    if (this.includeNumbers?.checked) characters += "0123456789";
    if (this.includeSymbols?.checked) characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    return characters;
  }

  // Generación de contraseñas de acuerdo a la longitud indicada por el usuario.
  public generatePassword(length: number, characters: string): string {
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }

  // Genera y actualiza la contraseña usando los valores actuales de la interfaz (slider)
  public updatePassword(): void {
    const length = parseInt(this.passwordLengthRange.value);
    this.passwordLength.value = length.toString();
    const characters = this.getSelectedCharacters();
    this.passwordInput.value = this.generatePassword(length, characters);
  }

  // Inicializa la aplicación con configuración por defecto
  private init(): void {
    // Escucha cambios en slider y checkboxes para actualizar contraseña automáticamente
    this.passwordLengthRange?.addEventListener("input", () => this.updatePassword());
    [this.includeUppercase, this.includeLowercase, this.includeNumbers, this.includeSymbols].forEach(cb =>
      cb?.addEventListener("change", () => this.updatePassword())
    );

    // Configuración inicial al cargar la página (Password = 12 y checkboxes marcadas)
    window.addEventListener("DOMContentLoaded", () => {
      this.includeUppercase.checked = true;
      this.includeLowercase.checked = true;
      this.includeNumbers.checked = true;
      this.includeSymbols.checked = true;

      this.passwordLengthRange.value = "12";
      this.updatePassword();
    });
  }
}

// Funciones utilitarias exportadas independientes
export const generatePasswordUtil = (length: number, characters: string): string => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};

// Instancia por defecto para uso inmediato
export default PasswordGenerator;