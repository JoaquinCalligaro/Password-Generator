// PasswordGenerator Module
export class PasswordGenerator {
    constructor() {
        // Elementos del DOM
        this.passwordInput = document.getElementById("password");
        this.passwordLengthRange = document.getElementById("passwordLengthRange");
        this.passwordLength = document.getElementById("passwordLength");
        // Checkboxes
        this.includeUppercase = document.getElementById("check-vertical-list-group1");
        this.includeLowercase = document.getElementById("check-vertical-list-group2");
        this.includeNumbers = document.getElementById("check-vertical-list-group3");
        this.includeSymbols = document.getElementById("check-vertical-list-group4");
        this.init();
    }
    // Construye el conjunto de caracteres disponibles basado en los checkboxes seleccionados
    getSelectedCharacters() {
        var _a, _b, _c, _d;
        let characters = "";
        if ((_a = this.includeUppercase) === null || _a === void 0 ? void 0 : _a.checked)
            characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if ((_b = this.includeLowercase) === null || _b === void 0 ? void 0 : _b.checked)
            characters += "abcdefghijklmnopqrstuvwxyz";
        if ((_c = this.includeNumbers) === null || _c === void 0 ? void 0 : _c.checked)
            characters += "0123456789";
        if ((_d = this.includeSymbols) === null || _d === void 0 ? void 0 : _d.checked)
            characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        return characters;
    }
    // Generación de contraseñas de acuerdo a la longitud indicada por el usuario.
    generatePassword(length, characters) {
        let password = "";
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }
    // Genera y actualiza la contraseña usando los valores actuales de la interfaz (slider)
    updatePassword() {
        const length = parseInt(this.passwordLengthRange.value);
        this.passwordLength.value = length.toString();
        const characters = this.getSelectedCharacters();
        this.passwordInput.value = this.generatePassword(length, characters);
    }
    // Inicializa la aplicación con configuración por defecto
    init() {
        var _a;
        // Escucha cambios en slider y checkboxes para actualizar contraseña automáticamente
        (_a = this.passwordLengthRange) === null || _a === void 0 ? void 0 : _a.addEventListener("input", () => this.updatePassword());
        [this.includeUppercase, this.includeLowercase, this.includeNumbers, this.includeSymbols].forEach(cb => cb === null || cb === void 0 ? void 0 : cb.addEventListener("change", () => this.updatePassword()));
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
export const generatePasswordUtil = (length, characters) => {
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
};
// Instancia por defecto para uso inmediato
export default PasswordGenerator;
