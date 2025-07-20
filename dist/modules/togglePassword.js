"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("togglePasswordButton");
    if (passwordInput && toggleButton) {
        toggleButton.addEventListener("click", () => {
            const isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";
            const eyeOpen = toggleButton.querySelector('img[src="./assets/icons/eye-open.png"]');
            const eyeClosed = toggleButton.querySelector('img[src="./assets/icons/closed-eye.png"]');
            if (isPassword) {
                eyeOpen === null || eyeOpen === void 0 ? void 0 : eyeOpen.classList.add("hidden");
                eyeClosed === null || eyeClosed === void 0 ? void 0 : eyeClosed.classList.remove("hidden");
            }
            else {
                eyeOpen === null || eyeOpen === void 0 ? void 0 : eyeOpen.classList.remove("hidden");
                eyeClosed === null || eyeClosed === void 0 ? void 0 : eyeClosed.classList.add("hidden");
            }
        });
    }
    else {
        console.error("No se encontraron passwordInput o toggleButton");
    }
});
