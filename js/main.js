import Application from './Application.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new Application();
    app.init();
});
