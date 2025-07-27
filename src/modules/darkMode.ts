// darkMode.ts
// Este modulo debe ser agregado al <head> para prevenir parpadeos durante la carga

type ThemeMode = 'light' | 'dark' | 'auto' | null;
//null = fallback

// API para manejar temas (light, dark y auto) con soporte para sistema y localStorage
interface ThemeManager {
  init(): void;
  setTheme(theme: ThemeMode): void;
  getStoredTheme(): ThemeMode;
  getSystemPreference(): boolean;
}
/**  Gestor principal de temas
 * - Aplica temas rapido y evita los parpadeos en pantalla
 * - Detecta preferencias del sistema automáticamente
 * - Persiste la configuracion en localStorage
 * - Sincroniza los cambios de tema con el sistema en tiempo real */
class DarkModeManager implements ThemeManager {
  // clave para almacenar tema en localStorage
  private readonly STORAGE_KEY = 'hs_theme';
  //Referencia al elemento HTML raiz para aplicar las clases en css(tailwind)
  private readonly html: HTMLElement;

  constructor() {
    this.html = document.documentElement;
    this.init();
  }

  /**
   * Inicializa el tema y previene glitches de carga
   */
  init(): void {
    const storedTheme = this.getStoredTheme();
    const systemPrefersDark = this.getSystemPreference();

    const isLightOrAuto =
      storedTheme === 'light' ||
      (storedTheme === 'auto' && !systemPrefersDark) ||
      (!storedTheme && !systemPrefersDark);

    const isDarkOrAuto =
      storedTheme === 'dark' ||
      (storedTheme === 'auto' && systemPrefersDark) ||
      (!storedTheme && systemPrefersDark);

    // Aplicar tema inmediatamente para prevenir parpadeos
    if (isLightOrAuto) {
      this.html.classList.remove('dark');
      this.html.classList.add('light');
    } else if (isDarkOrAuto) {
      this.html.classList.remove('light');
      this.html.classList.add('dark');
    }
  }

  /**
   * Establece el tema y lo guarda en localStorage
   */
  setTheme(theme: ThemeMode): void {
    if (theme) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } else {
      //Elimina o remueve la configuracion manual, usar la del sistema por defecto
      localStorage.removeItem(this.STORAGE_KEY);
    }
    //Se aplican los cambios visibles inmediatamente
    this.applyTheme();
  }

  /**
   * Obtiene el tema guardado en localStorage
   */
  getStoredTheme(): ThemeMode {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY) as ThemeMode;
      const validThemes: string[] = ['light', 'dark', 'auto'];
      //Validar que el valor almacenado sea un tema valido
      return validThemes.indexOf(stored || '') !== -1 ? stored : null;
    } catch {
      //fallar o entrar por fallback si el sistema localStorage no está disponible
      return null;
    }
  }

  /**
   * Obtiene la preferencia del sistema
   */
  getSystemPreference(): boolean {
    try {
      //CSS Media Query para detectar la preferencia del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      //Fallback para navegadores sin soporte
      return false;
    }
  }

  /**
   * Aplica el tema basado en la configuración actual
   */
  private applyTheme(): void {
    const storedTheme = this.getStoredTheme();
    const systemPrefersDark = this.getSystemPreference();
    //Calcula si debe usar el tema oscuro
    const shouldBeDark =
      storedTheme === 'dark' ||
      (storedTheme === 'auto' && systemPrefersDark) ||
      (!storedTheme && systemPrefersDark);
    //Se aplican las clases de css
    if (shouldBeDark) {
      this.html.classList.remove('light');
      this.html.classList.add('dark');
    } else {
      this.html.classList.remove('dark');
      this.html.classList.add('light');
    }

    // notifica el cambio a otros componentes
    this.dispatchThemeChange(shouldBeDark ? 'dark' : 'light');
  }

  /**
   * Dispara evento personalizado cuando cambia el tema
   */
  private dispatchThemeChange(theme: 'light' | 'dark'): void {
    const event = new CustomEvent('themechange', {
      detail: { theme },
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
  setupSystemThemeListener(): void {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.getStoredTheme() === 'auto' || !this.getStoredTheme()) {
          this.applyTheme();
        }
      });
    } catch {
      // Silently fail if matchMedia is not supported
    }
  }
}

/**
 * !Script que se ejecuta de manera inmediata para evitar parpadeos del tema
 * !se ejecuta antes que el DOM este listo por lo tanto esta funcion se la llama en el head
 */
(function () {
  const html = document.documentElement;
  const getStoredTheme = (): string | null => {
    try {
      return localStorage.getItem('hs_theme');
    } catch {
      return null;
    }
  };
  //Obtiene tema guardado sin dependencias externas
  const getSystemPreference = (): boolean => {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  };

  const storedTheme = getStoredTheme();
  const systemPrefersDark = getSystemPreference();
  // Lógica de decisión duplicada pero necesaria para timing crítico
  const isLightOrAuto =
    storedTheme === 'light' ||
    (storedTheme === 'auto' && !systemPrefersDark) ||
    (!storedTheme && !systemPrefersDark);

  const isDarkOrAuto =
    storedTheme === 'dark' ||
    (storedTheme === 'auto' && systemPrefersDark) ||
    (!storedTheme && systemPrefersDark);

  // Aplicar tema inmediatamente antes que cualquier css se renderice
  if (isLightOrAuto) {
    html.classList.remove('dark');
    html.classList.add('light');
  } else if (isDarkOrAuto) {
    html.classList.remove('light');
    html.classList.add('dark');
  }
})();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const themeManager = new DarkModeManager();
  themeManager.setupSystemThemeListener();

  // Exponer globalmente para uso en botones de toggle
  (window as any).themeManager = themeManager;

  // Configurar los botones de Preline UI
  setupPrelineButtons(themeManager);
});

// Función para configurar los botones de Preline UI
function setupPrelineButtons(themeManager: DarkModeManager): void {
  // Seleccionar todos los botones con clase hs-dark-mode
  const themeButtons = document.querySelectorAll('.hs-dark-mode');

  themeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const clickValue = button.getAttribute('data-hs-theme-click-value');

      if (clickValue === 'dark' || clickValue === 'light') {
        themeManager.setTheme(clickValue as ThemeMode);
        updateButtonVisibility();
      }
    });
  });

  // Configurar visibilidad inicial de los botones
  updateButtonVisibility();
}

// Función para actualizar la visibilidad de los botones
function updateButtonVisibility(): void {
  const html = document.documentElement;
  const isDarkMode = html.classList.contains('dark');

  // Botones para activar modo oscuro (se muestran en modo claro)
  const darkModeButtons = document.querySelectorAll(
    '[data-hs-theme-click-value="dark"]'
  );
  darkModeButtons.forEach((button) => {
    if (isDarkMode) {
      button.classList.add('hs-dark-mode-active:hidden', 'hidden');
      button.classList.remove('block');
    } else {
      button.classList.remove('hs-dark-mode-active:hidden', 'hidden');
      button.classList.add('block');
    }
  });

  // Botones para activar modo claro (se muestran en modo oscuro)
  const lightModeButtons = document.querySelectorAll(
    '[data-hs-theme-click-value="light"]'
  );
  lightModeButtons.forEach((button) => {
    if (isDarkMode) {
      button.classList.remove('hs-dark-mode-active:hidden', 'hidden');
      button.classList.add('hs-dark-mode-active:block', 'block');
    } else {
      button.classList.add('hs-dark-mode-active:hidden', 'hidden');
      button.classList.remove('hs-dark-mode-active:block', 'block');
    }
  });
}

// Función de conveniencia para toggle buttons
function toggleTheme(): void {
  const themeManager = (window as any).themeManager as DarkModeManager;
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
export type { ThemeMode, ThemeManager };
