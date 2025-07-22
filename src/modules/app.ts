// app.ts - Archivo principal que importa generatePassword.ts
import PasswordGenerator, { generatePasswordUtil } from './generatePassword';

// Inicializar el generador de contraseñas
const passwordGenerator = new PasswordGenerator();

// Hacer disponible globalmente para uso desde HTML
(window as any).AppManager = {
  // Acceso al generador principal
  passwordGenerator: passwordGenerator,
  
  // Función utilitaria para generar contraseña
  generatePasswordUtil: generatePasswordUtil
};

console.log('✅ Generador de contraseñas cargado correctamente');