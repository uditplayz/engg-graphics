import Application from './Application.js';

/**
 * @file Main entry point for the 3D Engineering Graphics application.
 * @author Udit Jain
 * @see {@link https://github.com/uditplayz/engg-graphics|GitHub Repository}
 */

/**
 * Initializes and starts the application once the DOM is fully loaded.
 * This ensures that all HTML elements are available before the application logic runs.
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const app = new Application();
    app.init();
});
