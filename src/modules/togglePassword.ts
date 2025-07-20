window.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password") as HTMLInputElement | null;
  const toggleButton = document.getElementById("togglePasswordButton");

  if (passwordInput && toggleButton) {
    toggleButton.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      const eyeOpen = toggleButton.querySelector('img[src="./assets/icons/eye-open.png"]');
      const eyeClosed = toggleButton.querySelector('img[src="./assets/icons/closed-eye.png"]');

      if (isPassword) {
        eyeOpen?.classList.add("hidden");
        eyeClosed?.classList.remove("hidden");
      } else {
        eyeOpen?.classList.remove("hidden");
        eyeClosed?.classList.add("hidden");
      }
    });
  } else {
    console.error("No se encontraron passwordInput o toggleButton");
  }
});
