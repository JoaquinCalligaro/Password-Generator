export function setupTogglePassword(passwordInput: HTMLInputElement) {
  const togglePasswordButton = document.getElementById("togglePassword");

  togglePasswordButton?.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    const eyeOpen = togglePasswordButton.querySelector('img[src="./assets/icons/eye-open.png"]');
    const eyeClosed = togglePasswordButton.querySelector('img[src="./assets/icons/closed-eye.png"]');

    if (type === "password") {
      eyeOpen?.classList.remove("hidden");
      eyeClosed?.classList.add("hidden");
    } else {
      eyeOpen?.classList.add("hidden");
      eyeClosed?.classList.remove("hidden");
    }
  });
}
