// ============================================
// MAIN APPLICATION CONTROLLER
// Orchestrates all modules and handles navigation
// ============================================

const App = {
    currentSection: 'library',

    // Initialize the application
    init() {
        console.log('🌍 Global Numeral Systems Explorer - Initializing...');

        // Initialize all modules
        this.initializeModules();

        // Set up navigation
        this.setupNavigation();

        // Set up converter
        this.setupConverter();

        console.log('✅ Application ready!');
    },

    // Initialize all modules
    initializeModules() {
        // Initialize library
        if (typeof Library !== 'undefined') {
            Library.init();
            console.log('📚 Library module initialized');
        }

        // Initialize practice zone
        if (typeof Practice !== 'undefined') {
            Practice.init();
            console.log('🧩 Practice module initialized');
        }

        // Populate converter system dropdown
        this.populateConverterSystems();
    },

    // Setup navigation between sections
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');

        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.switchSection(section);
            });
        });
    },

    // Switch between main sections
    switchSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(`section-${sectionName}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionName) {
                btn.classList.add('active');
            }
        });

        this.currentSection = sectionName;
    },

    // Populate converter system dropdown
    populateConverterSystems() {
        const select = document.getElementById('converter-system');
        if (!select) return;

        const systems = Object.values(numeralSystems);
        select.innerHTML = systems.map(system =>
            `<option value="${system.id}">${system.name}</option>`
        ).join('');
    },

    // Setup converter functionality
    setupConverter() {
        const convertBtn = document.getElementById('convert-btn');
        const input = document.getElementById('converter-input');

        if (convertBtn) {
            convertBtn.addEventListener('click', () => this.performConversion());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performConversion();
                }
            });
        }

        // Update placeholder when direction changes
        const directionSelect = document.getElementById('conversion-direction');
        if (directionSelect) {
            directionSelect.addEventListener('change', (e) => {
                const input = document.getElementById('converter-input');
                if (e.target.value === 'to-cultural') {
                    input.placeholder = 'e.g., 2025';
                } else {
                    input.placeholder = 'e.g., MMXXV';
                }
            });
        }
    },

    // Perform number conversion
    performConversion() {
        const systemSelect = document.getElementById('converter-system');
        const directionSelect = document.getElementById('conversion-direction');
        const input = document.getElementById('converter-input');
        const resultsDiv = document.getElementById('converter-results');
        const resultDisplay = document.getElementById('result-display');
        const explanationSteps = document.getElementById('explanation-steps');

        if (!systemSelect || !directionSelect || !input) return;

        const systemId = systemSelect.value;
        const direction = directionSelect.value;
        const inputValue = input.value.trim();

        if (!inputValue) {
            this.showError('Please enter a number to convert');
            return;
        }

        // Perform conversion
        const result = Converter.convert(inputValue, systemId, direction);

        if (!result.success) {
            this.showError(result.error);
            return;
        }

        // Display results
        resultDisplay.innerHTML = `
            <div style="font-size: 2rem; font-weight: 600; color: var(--color-text-gold);">
                ${result.result}
            </div>
        `;

        // Display explanation steps
        explanationSteps.innerHTML = result.steps.map((step, index) => `
            <div class="step">
                <span class="step-number">${index + 1}</span>
                <span class="step-content">${step}</span>
            </div>
        `).join('');

        resultsDiv.classList.remove('hidden');

        // Smooth scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    // Show error message
    showError(message) {
        const resultsDiv = document.getElementById('converter-results');
        const resultDisplay = document.getElementById('result-display');
        const explanationSteps = document.getElementById('explanation-steps');

        resultDisplay.innerHTML = `
            <div style="color: #f87171; font-size: 1.25rem;">
                ⚠️ Error
            </div>
        `;

        explanationSteps.innerHTML = `
            <div class="step">
                <span class="step-content" style="color: #f87171;">${message}</span>
            </div>
        `;

        resultsDiv.classList.remove('hidden');
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
