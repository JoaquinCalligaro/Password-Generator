"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const toggleCheckbox = document.getElementById("togglePasswordCheckbox");
    if (passwordInput && toggleCheckbox) {
        toggleCheckbox.addEventListener("change", () => {
            passwordInput.type = toggleCheckbox.checked ? "text" : "password";
        });
    }
    else {
        console.error("No se encontraron elementos passwordInput o toggleCheckbox");
    }
});
