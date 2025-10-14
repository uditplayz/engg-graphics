class UIManager {
    constructor() {
        this.loader = document.getElementById('loader');
        this.infoOverlay = document.getElementById('info-overlay');
        this.topicControls = document.getElementById('topic-controls');
        this.topicButtons = document.getElementById('topic-buttons');
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menu-toggle');
    }

    init() {
        this.setupMobileMenu();
    }

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

    hideLoader() {
        if (this.loader) {
            this.loader.style.display = 'none';
        }
    }

    showLoader() {
        if (this.loader) {
            this.loader.style.display = 'flex';
        }
    }

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

    updateInfoOverlay(html) {
        this.infoOverlay.innerHTML = html;
    }

    clearControls() {
        this.topicControls.innerHTML = '';
    }

    setControls(html) {
        this.topicControls.innerHTML = html;
    }

    createTopicButtons(topics) {
        this.topicButtons.innerHTML = topics.map(topic => `
            <button class="topic-button w-full text-left p-3 rounded-lg font-medium transition-all duration-200" 
                    data-topic="${topic.id}">
                ${topic.name}
            </button>
        `).join('');
    }

    setActiveButton(topicId) {
        document.querySelectorAll('.topic-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.topic === topicId);
        });

        // Close mobile sidebar when topic selected
        if (window.innerWidth < 768) {
            this.sidebar.classList.add('-translate-x-full');
        }
    }

    showError(message) {
        this.updateInfoOverlay(`
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> ${message}
            </div>
        `);
    }

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
