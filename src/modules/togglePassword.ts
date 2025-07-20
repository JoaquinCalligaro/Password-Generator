window.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password") as HTMLInputElement | null;
  const toggleCheckbox = document.getElementById("togglePasswordCheckbox") as HTMLInputElement | null;

  if (passwordInput && toggleCheckbox) {
    toggleCheckbox.addEventListener("change", () => {
      passwordInput.type = toggleCheckbox.checked ? "text" : "password";
    });
  } else {
    console.error("No se encontraron elementos passwordInput o toggleCheckbox");
  }
});
