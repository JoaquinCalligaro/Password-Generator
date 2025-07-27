/**
 * Controla la funcionalidad de mostrar/ocultar contraseña
 * Alterna entre type="password" y type="text" + cambia iconos visuales
 */
window.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById(
    'password'
  ) as HTMLInputElement | null;
  const toggleButton = document.getElementById('togglePasswordButton');

  if (passwordInput && toggleButton) {
    toggleButton.addEventListener('click', () => {
      // Determina el estado actual del input
      const isPassword = passwordInput.type === 'password';
      // Alterna entre ocultar y mostrar contraseña
      passwordInput.type = isPassword ? 'text' : 'password';
      // Obtiene referencias a ambos iconos
      const eyeOpen = toggleButton.querySelector(
        'img[src="./assets/icons/eye-open.png"]'
      );
      const eyeClosed = toggleButton.querySelector(
        'img[src="./assets/icons/closed-eye.png"]'
      );
      // Muestra el icono apropiado según el estado
      if (isPassword) {
        eyeOpen?.classList.add('hidden');
        eyeClosed?.classList.remove('hidden');
      } else {
        eyeOpen?.classList.remove('hidden');
        eyeClosed?.classList.add('hidden');
      }
    });
  } else {
    console.error('No se encontraron passwordInput o toggleButton');
  }
});
