// ============================================
// LIBRARY MODULE
// Handles the numeral systems library interface
// ============================================

const Library = {
    currentFilter: 'all',
    currentSearch: '',

    // Initialize the library
    init() {
        this.renderSystemCards();
        this.attachEventListeners();
    },

    // Render all system cards
    renderSystemCards() {
        const grid = document.getElementById('systems-grid');
        if (!grid) return;

        const systems = Object.values(numeralSystems);
        const filtered = this.filterSystems(systems);

        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary);">No systems found matching your criteria.</p>';
            return;
        }

        grid.innerHTML = filtered.map(system => this.createSystemCard(system)).join('');

        // Attach click handlers to cards
        grid.querySelectorAll('.system-card').forEach(card => {
            card.addEventListener('click', () => {
                const systemId = card.dataset.systemId;
                this.showSystemDetails(systemId);
            });
        });
    },

    // Create HTML for a system card
    createSystemCard(system) {
        const example = system.examples[0];
        return `
            <div class="system-card" data-system-id="${system.id}">
                <div class="system-card-header">
                    <h3 class="system-name">${system.name}</h3>
                    <span class="system-base">Base ${system.base}</span>
                </div>
                <p class="system-culture">${system.culture}</p>
                <p class="system-description">${system.description}</p>
                <div class="system-example">
                    ${example.arabic} = ${example.cultural}
                </div>
            </div>
        `;
    },

    // Filter systems based on search and base filter
    filterSystems(systems) {
        return systems.filter(system => {
            const matchesBase = this.currentFilter === 'all' || system.base === parseInt(this.currentFilter);
            const matchesSearch = !this.currentSearch ||
                system.name.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                system.culture.toLowerCase().includes(this.currentSearch.toLowerCase()) ||
                system.description.toLowerCase().includes(this.currentSearch.toLowerCase());

            return matchesBase && matchesSearch;
        });
    },

    // Show detailed modal for a system
    showSystemDetails(systemId) {
        const system = numeralSystems[systemId];
        if (!system) return;

        const modal = document.getElementById('system-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = system.name;
        modalBody.innerHTML = `
            <div style="margin-bottom: var(--spacing-lg);">
                <h3 style="color: var(--color-text-gold); margin-bottom: var(--spacing-sm);">Cultural Context</h3>
                <p style="color: var(--color-text-secondary); line-height: 1.8;">${system.culture}</p>
                <p style="color: var(--color-text-secondary); line-height: 1.8; margin-top: var(--spacing-sm);">${system.history}</p>
            </div>

            <div style="margin-bottom: var(--spacing-lg);">
                <h3 style="color: var(--color-text-gold); margin-bottom: var(--spacing-sm);">System Properties</h3>
                <ul style="color: var(--color-text-secondary); line-height: 1.8; padding-left: var(--spacing-lg);">
                    <li><strong>Base:</strong> ${system.base} (${this.getBaseName(system.base)})</li>
                    <li><strong>Type:</strong> ${system.type}</li>
                </ul>
            </div>

            <div style="margin-bottom: var(--spacing-lg);">
                <h3 style="color: var(--color-text-gold); margin-bottom: var(--spacing-sm);">Construction Rules</h3>
                <ol style="color: var(--color-text-secondary); line-height: 1.8; padding-left: var(--spacing-lg);">
                    ${system.constructionRules.map(rule => `<li>${rule}</li>`).join('')}
                </ol>
            </div>

            <div>
                <h3 style="color: var(--color-text-gold); margin-bottom: var(--spacing-sm);">Examples</h3>
                <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                    ${system.examples.map(ex => `
                        <div style="background: var(--color-bg-tertiary); padding: var(--spacing-md); border-radius: var(--radius-md); border-left: 3px solid var(--color-text-accent);">
                            <div style="font-family: var(--font-mono); font-size: 1.25rem; color: var(--color-text-gold); margin-bottom: var(--spacing-xs);">
                                ${ex.arabic} = ${ex.cultural}
                            </div>
                            <div style="color: var(--color-text-tertiary); font-size: 0.9rem;">
                                ${ex.explanation}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    },

    // Get descriptive name for base
    getBaseName(base) {
        const names = {
            10: 'decimal',
            20: 'vigesimal',
            60: 'sexagesimal'
        };
        return names[base] || `base-${base}`;
    },

    // Attach event listeners
    attachEventListeners() {
        // Search input
        const searchInput = document.getElementById('library-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentSearch = e.target.value;
                this.renderSystemCards();
            });
        }

        // Base filter
        const baseFilter = document.getElementById('base-filter');
        if (baseFilter) {
            baseFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.renderSystemCards();
            });
        }

        // Modal close button
        const closeModal = document.getElementById('close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                document.getElementById('system-modal').classList.add('hidden');
            });
        }

        // Modal overlay click
        const modal = document.getElementById('system-modal');
        if (modal) {
            modal.querySelector('.modal-overlay')?.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Library;
}
