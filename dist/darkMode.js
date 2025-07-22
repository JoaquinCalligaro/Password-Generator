// darkMode.ts
// Este código debe ser agregado al <head> para prevenir parpadeos durante la carga
class DarkModeManager {
    constructor() {
        this.STORAGE_KEY = 'hs_theme';
        this.html = document.documentElement;
        this.init();
    }
    /**
     * Inicializa el tema y previene glitches de carga
     */
    init() {
        const storedTheme = this.getStoredTheme();
        const systemPrefersDark = this.getSystemPreference();
        const isLightOrAuto = storedTheme === 'light' ||
            (storedTheme === 'auto' && !systemPrefersDark) ||
            (!storedTheme && !systemPrefersDark);
        const isDarkOrAuto = storedTheme === 'dark' ||
            (storedTheme === 'auto' && systemPrefersDark) ||
            (!storedTheme && systemPrefersDark);
        // Aplicar tema inmediatamente para prevenir parpadeos
        if (isLightOrAuto) {
            this.html.classList.remove('dark');
            this.html.classList.add('light');
        }
        else if (isDarkOrAuto) {
            this.html.classList.remove('light');
            this.html.classList.add('dark');
        }
    }
    /**
     * Establece el tema y lo guarda en localStorage
     */
    setTheme(theme) {
        if (theme) {
            localStorage.setItem(this.STORAGE_KEY, theme);
        }
        else {
            localStorage.removeItem(this.STORAGE_KEY);
        }
        this.applyTheme();
    }
    /**
     * Obtiene el tema guardado en localStorage
     */
    getStoredTheme() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            const validThemes = ['light', 'dark', 'auto'];
            return validThemes.indexOf(stored || '') !== -1 ? stored : null;
        }
        catch (_a) {
            return null;
        }
    }
    /**
     * Obtiene la preferencia del sistema
     */
    getSystemPreference() {
        try {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        catch (_a) {
            return false;
        }
    }
    /**
     * Aplica el tema basado en la configuración actual
     */
    applyTheme() {
        const storedTheme = this.getStoredTheme();
        const systemPrefersDark = this.getSystemPreference();
        const shouldBeDark = storedTheme === 'dark' ||
            (storedTheme === 'auto' && systemPrefersDark) ||
            (!storedTheme && systemPrefersDark);
        if (shouldBeDark) {
            this.html.classList.remove('light');
            this.html.classList.add('dark');
        }
        else {
            this.html.classList.remove('dark');
            this.html.classList.add('light');
        }
        // Dispatch event para otros componentes
        this.dispatchThemeChange(shouldBeDark ? 'dark' : 'light');
    }
    /**
     * Dispara evento personalizado cuando cambia el tema
     */
    dispatchThemeChange(theme) {
        const event = new CustomEvent('themechange', {
            detail: { theme }
        });
        document.dispatchEvent(event);
        // Actualizar visibilidad de botones después del cambio
        setTimeout(() => {
            if (typeof updateButtonVisibility === 'function') {
                updateButtonVisibility();
            }
        }, 10);
    }
    /**
     * Escucha cambios en la preferencia del sistema
     */
    setupSystemThemeListener() {
        try {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', () => {
                if (this.getStoredTheme() === 'auto' || !this.getStoredTheme()) {
                    this.applyTheme();
                }
            });
        }
        catch (_a) {
            // Silently fail if matchMedia is not supported
        }
    }
}
// Versión simplificada para uso inmediato en <head>
(function () {
    const html = document.documentElement;
    const getStoredTheme = () => {
        try {
            return localStorage.getItem('hs_theme');
        }
        catch (_a) {
            return null;
        }
    };
    const getSystemPreference = () => {
        try {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        catch (_a) {
            return false;
        }
    };
    const storedTheme = getStoredTheme();
    const systemPrefersDark = getSystemPreference();
    const isLightOrAuto = storedTheme === 'light' ||
        (storedTheme === 'auto' && !systemPrefersDark) ||
        (!storedTheme && !systemPrefersDark);
    const isDarkOrAuto = storedTheme === 'dark' ||
        (storedTheme === 'auto' && systemPrefersDark) ||
        (!storedTheme && systemPrefersDark);
    // Aplicar tema inmediatamente
    if (isLightOrAuto) {
        html.classList.remove('dark');
        html.classList.add('light');
    }
    else if (isDarkOrAuto) {
        html.classList.remove('light');
        html.classList.add('dark');
    }
})();
// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new DarkModeManager();
    themeManager.setupSystemThemeListener();
    // Exponer globalmente para uso en botones de toggle
    window.themeManager = themeManager;
    // Configurar los botones de Preline UI
    setupPrelineButtons(themeManager);
});
// Función para configurar los botones de Preline UI
function setupPrelineButtons(themeManager) {
    // Seleccionar todos los botones con clase hs-dark-mode
    const themeButtons = document.querySelectorAll('.hs-dark-mode');
    themeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const clickValue = button.getAttribute('data-hs-theme-click-value');
            if (clickValue === 'dark' || clickValue === 'light') {
                themeManager.setTheme(clickValue);
                updateButtonVisibility();
            }
        });
    });
    // Configurar visibilidad inicial de los botones
    updateButtonVisibility();
}
// Función para actualizar la visibilidad de los botones
function updateButtonVisibility() {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains('dark');
    // Botones para activar modo oscuro (se muestran en modo claro)
    const darkModeButtons = document.querySelectorAll('[data-hs-theme-click-value="dark"]');
    darkModeButtons.forEach(button => {
        if (isDarkMode) {
            button.classList.add('hs-dark-mode-active:hidden', 'hidden');
            button.classList.remove('block');
        }
        else {
            button.classList.remove('hs-dark-mode-active:hidden', 'hidden');
            button.classList.add('block');
        }
    });
    // Botones para activar modo claro (se muestran en modo oscuro)
    const lightModeButtons = document.querySelectorAll('[data-hs-theme-click-value="light"]');
    lightModeButtons.forEach(button => {
        if (isDarkMode) {
            button.classList.remove('hs-dark-mode-active:hidden', 'hidden');
            button.classList.add('hs-dark-mode-active:block', 'block');
        }
        else {
            button.classList.add('hs-dark-mode-active:hidden', 'hidden');
            button.classList.remove('hs-dark-mode-active:block', 'block');
        }
    });
}
// Función de conveniencia para toggle buttons
function toggleTheme() {
    const themeManager = window.themeManager;
    if (themeManager) {
        const currentTheme = themeManager.getStoredTheme();
        const html = document.documentElement;
        const isDark = html.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        themeManager.setTheme(newTheme);
        updateButtonVisibility();
    }
}
// Export para módulos
export { DarkModeManager, toggleTheme };
