export function setupTogglePassword(passwordInput) {
    console.log("setupTogglePassword is running!");
    const togglePasswordButton = document.getElementById("togglePassword");
    togglePasswordButton === null || togglePasswordButton === void 0 ? void 0 : togglePasswordButton.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        const eyeOpen = togglePasswordButton.querySelector('img[src="./assets/icons/eye-open.png"]');
        const eyeClosed = togglePasswordButton.querySelector('img[src="./assets/icons/closed-eye.png"]');
        if (type === "password") {
            eyeOpen === null || eyeOpen === void 0 ? void 0 : eyeOpen.classList.remove("hidden");
            eyeClosed === null || eyeClosed === void 0 ? void 0 : eyeClosed.classList.add("hidden");
        }
        else {
            eyeOpen === null || eyeOpen === void 0 ? void 0 : eyeOpen.classList.add("hidden");
            eyeClosed === null || eyeClosed === void 0 ? void 0 : eyeClosed.classList.remove("hidden");
        }
    });
}
