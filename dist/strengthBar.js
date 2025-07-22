class PasswordStrengthBar {
    constructor() {
        this.config = {
            weak: { color: 'bg-red-500', threshold: 25 },
            medium: { color: 'bg-orange-500', threshold: 5 },
            strong: { color: 'bg-green-400', threshold: 100 }, // Verde claro para 4 barras
            veryStrong: { color: 'bg-green-600', threshold: 100 } // Verde oscuro para 5 barras
        };
        this.strengthBar = document.getElementById("strengthBar");
        this.bars = this.strengthBar.querySelectorAll("div");
        this.passwordLengthRange = document.getElementById("passwordLengthRange");
        this.checkboxes = [
            document.getElementById("check-vertical-list-group1"), // Uppercase
            document.getElementById("check-vertical-list-group2"), // Lowercase  
            document.getElementById("check-vertical-list-group3"), // Numbers
            document.getElementById("check-vertical-list-group4") // Symbols
        ];
        this.initializeEvents();
    }
    initializeEvents() {
        var _a;
        (_a = this.passwordLengthRange) === null || _a === void 0 ? void 0 : _a.addEventListener("input", () => {
            this.updateStrengthBar();
        });
        this.checkboxes.forEach(checkbox => {
            checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener("change", () => {
                this.updateStrengthBar();
            });
        });
    }
    calculateStrength() {
        const length = parseInt(this.passwordLengthRange.value);
        const checkedCount = this.checkboxes.filter(cb => cb === null || cb === void 0 ? void 0 : cb.checked).length;
        if (checkedCount === 0)
            return 0; // Ningún checkbox marcado - no se pinta nada
        if (length < 8) {
            return 1; // Menos de 8 caracteres → 1 barra roja
        }
        else if (length >= 8 && length <= 10) {
            return 2; // 8 a 10 caracteres → 2 barras naranja
        }
        else if (length >= 12 && length <= 15) {
            return checkedCount >= 3 ? 3 : Math.min(checkedCount, 3); // 12 a 15 con checkboxes → 3 barras naranja
        }
        else if (length >= 16 && length <= 20) {
            return checkedCount === 4 ? 4 : Math.min(checkedCount + 1, 4); // 16 a 20 con todos los checkboxes → 4 barras verdes claras
        }
        else if (length > 20) {
            return checkedCount === 4 ? 5 : 4; // Más de 20 caracteres con TODOS los checkboxes → 5 barras verdes oscuras
        }
        return Math.min(checkedCount, 2); // Default basado en checkboxes marcados
    }
    getStrengthLevel(barsToFill) {
        const length = parseInt(this.passwordLengthRange.value);
        const checkedCount = this.checkboxes.filter(cb => cb === null || cb === void 0 ? void 0 : cb.checked).length;
        // Si no hay checkboxes marcados, no mostrar barras
        if (checkedCount === 0) {
            return { color: '', barsToFill: 0 };
        }
        if (length < 8) {
            return { color: this.config.weak.color, barsToFill };
        }
        else if (length >= 8 && length <= 15) {
            return { color: this.config.medium.color, barsToFill };
        }
        else if (length >= 16 && length <= 20) {
            // Verde claro para 4 barras (16-20 caracteres con todos los checkboxes)
            return { color: this.config.strong.color, barsToFill };
        }
        else if (length > 20 && checkedCount === 4) {
            // Verde oscuro solo si tiene MÁS de 20 caracteres Y todos los checkboxes
            return { color: this.config.veryStrong.color, barsToFill };
        }
        else {
            // Fallback para casos intermedios
            return { color: this.config.strong.color, barsToFill };
        }
    }
    clearBars() {
        this.bars.forEach(bar => {
            bar.className = "flex-1 h-2 bg-gray-200 rounded-xl transition-all duration-300";
        });
    }
    updateStrengthBar() {
        const barsToFill = this.calculateStrength();
        const { color } = this.getStrengthLevel(barsToFill);
        this.clearBars();
        // Solo pintar barras si hay un color definido (checkboxes marcados)
        if (color && barsToFill > 0) {
            for (let i = 0; i < barsToFill; i++) {
                this.bars[i].className = `flex-1 h-2 rounded-xl transition-all duration-300 ${color}`;
            }
        }
    }
    refresh() {
        this.updateStrengthBar();
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const strengthBar = new PasswordStrengthBar();
    setTimeout(() => {
        strengthBar.refresh();
    }, 100);
});
export default PasswordStrengthBar;
