# 🔐 Password Generator

Un generador de contraseñas moderno y seguro con interfaz elegante desarrollado con TypeScript y Tailwind CSS v4.

## 📱 Vista Previa

### 🖥️ Versión Desktop

#### ☀️ Modo Claro
<div align="center">
  <img src="https://github.com/user-attachments/assets/32495b42-719a-4021-a174-16ac0b23345d" alt="Desktop - Modo Claro" width="70%">
</div>


#### 🌙 Modo Oscuro
<div align="center">

<img src="https://github.com/user-attachments/assets/67c7613a-0d3f-47f3-8676-99e879c114e9" alt="Desktop - Modo Oscuro" width="70%">
</div>

---

### 📱 Versión Mobile (Samsung S22 Ultra)

#### ☀️ Modo Claro
<div align="center">
  <img src="https://github.com/user-attachments/assets/8e50216c-e003-48cc-a535-d9ecb1074969" alt="Mobile - Modo Claro" width="25%">
</div>


#### 🌙 Modo Oscuro
<div align="center">
  <img src="https://github.com/user-attachments/assets/e0e30356-0faf-4817-bcd1-cdc75303e99b" alt="Mobile - Modo Oscuro" width="25%">
</div>

---

## ✨ Características

- 🎯 **Generación personalizable**: Controla longitud y tipos de caracteres
- 📊 **Indicador de fortaleza**: Sistema visual de 5 niveles de seguridad
- 🌓 **Modo oscuro/claro**: Detección automática de preferencias del sistema
- 👁️ **Toggle de visibilidad**: Muestra/oculta contraseña fácilmente
- 🎨 **Interfaz moderna**: Diseño glassmorphism con efectos de blur
- 📱 **Completamente responsiva**: Optimizada para todos los dispositivos
- ⚡ **Sin dependencias**: Código vanilla TypeScript
- 🎭 **Animaciones fluidas**: Efectos de fondo dinámicos y transiciones suaves

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| HTML5 | - | Estructura semántica |
| CSS3 | - | Estilos base y animaciones |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Framework de utilidades CSS |
| [TypeScript](https://www.typescriptlang.org/) | - | Tipado estático y modularidad |

### Plugins de Tailwind utilizados:
- `@midudev/tailwind-animations`
- `tailwindcss-motion`
- `tailwindcss-animated`

## 🚀 Demo

[🔗 Ver Demo en Vivo](https://password-generatorjc.netlify.app/)

## 📦 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/JoaquinCalligaro/Password-Generator.git
   cd Password-Generator
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Compila TypeScript y Tailwind**
   ```bash
   npm run build
   # o
   yarn build
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abre tu navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
Password-Generator/
├── 📁 assets/
│   └── 📁 icons/
│       ├── favicon.png
│       ├── eye-open.png
│       └── closed-eye.png
├── 📁 dist/
│   ├── output.css
│   ├── darkMode.js
│   └── 📁 modules/
├── 📁 src/
│   ├── input.css
│   └── 📁 modules/
│       ├── darkMode.ts
│       ├── generatePassword.ts
│       ├── strengthBar.ts
│       └── togglePassword.ts
├── index.html
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Uso

### Generación Básica
1. Ajusta la longitud usando el slider (1-30 caracteres)
2. Selecciona los tipos de caracteres deseados:
   - ✅ Mayúsculas (A-Z)
   - ✅ Minúsculas (a-z)
   - ✅ Números (0-9)
   - ✅ Símbolos (!@#$%^&*)
3. La contraseña se genera automáticamente

### Indicador de Fortaleza
El sistema evalúa la fortaleza basándose en:

| Nivel | Barras | Color | Criterios |
|-------|--------|-------|-----------|
| Muy Débil | 1 | 🔴 Rojo | < 8 caracteres |
| Débil | 2 | 🟠 Naranja | 8-10 caracteres |
| Media | 3 | 🟠 Naranja | 12-15 caracteres + 3 tipos |
| Fuerte | 4 | 🟢 Verde claro | 16-20 caracteres + 4 tipos |
| Muy Fuerte | 5 | 🟢 Verde oscuro | >20 caracteres + 4 tipos |

## 🎨 Personalización

### Modificar colores del tema
Edita las variables en `src/input.css`:

```css
/* Fondo modo claro */
.area {
  background: linear-gradient(274deg, #cbd04c, #fc3b76, #4f29dc, #8a35d0);
}

/* Fondo modo oscuro */
.dark .area {
  background: linear-gradient(130deg, #06002b, #0b0053, #230036, #360000);
}
```

### Ajustar configuración de fortaleza
Modifica `src/modules/strengthBar.ts`:

```typescript
private config: StrengthConfig = {
  weak: { color: 'bg-red-500', threshold: 25 },
  medium: { color: 'bg-orange-500', threshold: 50 },
  strong: { color: 'bg-green-400', threshold: 75 },
  veryStrong: { color: 'bg-green-600', threshold: 100 }
};
```

## 🧩 Módulos

### DarkModeManager
Gestiona el sistema de temas con:
- Detección automática de preferencias del sistema
- Persistencia en localStorage
- Prevención de parpadeos durante la carga

### PasswordGenerator
Clase principal que maneja:
- Generación de contraseñas seguras
- Sincronización con la interfaz
- Validación de parámetros

### StrengthBar
Evalúa y visualiza la fortaleza:
- Algoritmo de puntuación inteligente
- Actualización en tiempo real
- Feedback visual progresivo

### TogglePassword
Controla la visibilidad:
- Alternancia entre text/password
- Cambio de iconos dinámico
- Accesibilidad mejorada

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de contribución
- Utiliza TypeScript para nuevas funcionalidades
- Mantén la consistencia con el estilo de código existente
- Agrega tests para nuevas características
- Actualiza la documentación cuando sea necesario

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run watch        # Observa cambios en TypeScript

# Construcción
npm run build        # Compila para producción
npm run build:css    # Solo compila Tailwind CSS
npm run build:ts     # Solo compila TypeScript

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
npm run type-check   # Verifica tipos de TypeScript
```

## 🔒 Seguridad

### Generación de contraseñas
- Utiliza `Math.random()` para la selección de caracteres
- No almacena contraseñas generadas
- Funciona completamente del lado del cliente

### Recomendaciones
- Para uso empresarial, considera implementar `crypto.getRandomValues()`
- Las contraseñas no se envían a ningún servidor
- Recomendamos longitudes mínimas de 12 caracteres


## 👨‍💻 Autor

**Joaquín Calligaro**
- GitHub: [@JoaquinCalligaro](https://github.com/JoaquinCalligaro)
- LinkedIn: [joaquincalligaro](https://www.linkedin.com/in/joaquincalligaro/)
- Instagram: [@joaquin.caligaro](https://www.instagram.com/joaquin.caligaro/)

## 🙏 Agradecimientos

- [Tailwind CSS](https://tailwindcss.com/) por el excelente framework
- [Midudev](https://github.com/midudev) por los plugins de animaciones
- [Heroicons](https://heroicons.com/) por los iconos utilizados
- La comunidad de desarrolladores por la inspiración

## 📊 Estado del Proyecto

![GitHub last commit](https://img.shields.io/github/last-commit/JoaquinCalligaro/Password-Generator)
![GitHub issues](https://img.shields.io/github/issues/JoaquinCalligaro/Password-Generator)
![GitHub stars](https://img.shields.io/github/stars/JoaquinCalligaro/Password-Generator)
![GitHub forks](https://img.shields.io/github/forks/JoaquinCalligaro/Password-Generator)

---

⭐ **¡Si te gusta este proyecto, dale una estrella!** ⭐
