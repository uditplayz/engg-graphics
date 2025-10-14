/**
 * @file Manages all UI-related interactions, DOM element manipulation, and event handling.
 */

/**
 * @class UIManager
 * @classdesc Handles the user interface, including the loader, sidebar, topic controls,
 * and information overlays.
 */
class UIManager {
    /**
     * @constructor
     * Caches references to key DOM elements.
     */
    constructor() {
        /** @type {HTMLElement} The main loading indicator. */
        this.loader = document.getElementById('loader');
        /** @type {HTMLElement} The container for informational text. */
        this.infoOverlay = document.getElementById('info-overlay');
        /** @type {HTMLElement} The container for topic-specific controls like sliders. */
        this.topicControls = document.getElementById('topic-controls');
        /** @type {HTMLElement} The container for the list of topic buttons. */
        this.topicButtons = document.getElementById('topic-buttons');
        /** @type {HTMLElement} The sidebar navigation panel. */
        this.sidebar = document.getElementById('sidebar');
        /** @type {HTMLElement} The button to toggle the mobile menu. */
        this.menuToggle = document.getElementById('menu-toggle');
    }

    /**
     * Initializes the UI Manager by setting up event listeners.
     */
    init() {
        this.setupMobileMenu();
    }

    /**
     * Sets up event listeners for the mobile sidebar menu.
     * Handles opening, closing, and closing on outside clicks.
     */
    setupMobileMenu() {
        this.menuToggle.addEventListener('click', () => {
            this.sidebar.classList.toggle('-translate-x-full');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && // Only on mobile
                !this.sidebar.contains(e.target) && 
                !this.menuToggle.contains(e.target) &&
                !this.sidebar.classList.contains('-translate-x-full')) {
                this.sidebar.classList.add('-translate-x-full');
            }
        });

        // Close menu when selecting a topic on mobile
        this.topicButtons.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && e.target.classList.contains('topic-button')) {
                this.sidebar.classList.add('-translate-x-full');
            }
        });
    }

    /**
     * Hides the loading overlay.
     */
    hideLoader() {
        if (this.loader) {
            this.loader.style.display = 'none';
        }
    }

    /**
     * Shows the loading overlay.
     */
    showLoader() {
        if (this.loader) {
            this.loader.style.display = 'flex';
        }
    }

    /**
     * Displays a critical error message in the loader overlay, typically for initialization failures.
     * @param {string} message The error message to display.
     */
    showError(message) {
        if (this.loader) {
            this.loader.innerHTML = `
                <div class="text-center">
                    <div class="text-red-600 font-semibold mb-2">${message}</div>
                    <button onclick="location.reload()" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Retry
                    </button>
                </div>
            `;
            this.loader.style.display = 'flex';
        }
    }

    /**
     * Updates the content of the info overlay panel.
     * @param {string} html The HTML content to set for the overlay.
     */
    updateInfoOverlay(html) {
        this.infoOverlay.innerHTML = html;
    }

    /**
     * Clears all content from the topic-specific controls area.
     */
    clearControls() {
        this.topicControls.innerHTML = '';
    }

    /**
     * Sets the content of the topic-specific controls area.
     * @param {string} html The HTML content for the controls.
     */
    setControls(html) {
        this.topicControls.innerHTML = html;
    }

    /**
     * Creates and populates the topic buttons in the sidebar.
     * @param {Array<Object>} topics An array of topic objects, each with an 'id' and 'name'.
     */
    createTopicButtons(topics) {
        this.topicButtons.innerHTML = topics.map(topic => `
            <button class="topic-button w-full text-left p-3 rounded-lg font-medium transition-all duration-200" 
                    data-topic="${topic.id}">
                ${topic.name}
            </button>
        `).join('');
    }

    /**
     * Sets the visual active state for a topic button.
     * @param {string} topicId The ID of the topic to mark as active.
     */
    setActiveButton(topicId) {
        document.querySelectorAll('.topic-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.topic === topicId);
        });

        // Close mobile sidebar when topic selected
        if (window.innerWidth < 768) {
            this.sidebar.classList.add('-translate-x-full');
        }
    }

    /**
     * Displays an error message within the main info overlay.
     * @param {string} message The error message to display.
     */
    displayInfoError(message) {
        this.updateInfoOverlay(`
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> ${message}
            </div>
        `);
    }

    /**
     * Generates the HTML for a slider control.
     * @param {object} params The parameters for the slider.
     * @param {string} params.id The ID for the input element.
     * @param {string} params.label The text label for the slider.
     * @param {number} params.min The minimum value of the slider.
     * @param {number} params.max The maximum value of the slider.
     * @param {number} params.value The initial value of the slider.
     * @param {number} params.step The step increment of the slider.
     * @returns {string} The HTML string for the slider control.
     */
    createSlider(params) {
        const { id, label, min, max, value, step } = params;
        return `
            <div class="mb-4">
                <label for="${id}" class="block text-sm font-medium text-slate-700 mb-1">
                    ${label}: <span id="${id}-value" class="font-semibold text-indigo-600">${value}</span>
                </label>
                <input type="range" id="${id}" min="${min}" max="${max}" value="${value}" step="${step}" 
                       class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer">
            </div>
        `;
    }
}

export default UIManager;
