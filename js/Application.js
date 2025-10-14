/**
 * @file Manages the overall application state and initialization.
 */

import SceneManager from './SceneManager.js';
import UIManager from './UIManager.js';
import TopicManager from './TopicManager.js';

/**
 * @class Application
 * @classdesc The main class that orchestrates the entire 3D learning application.
 * It initializes and manages the SceneManager, UIManager, and TopicManager.
 */
class Application {
    /**
     * @constructor
     * Initializes the Application class and sets up manager properties.
     */
    constructor() {
        /** @type {SceneManager|null} Manages the 3D scene and rendering. */
        this.sceneManager = null;
        /** @type {UIManager|null} Manages the user interface and DOM elements. */
        this.uiManager = null;
        /** @type {TopicManager|null} Manages the learning topics and their state. */
        this.topicManager = null;
    }

    /**
     * Initializes the entire application.
     * This method sets up the UI, checks for WebGL support, initializes the 3D scene,
     * sets up the topic manager, and wires up event listeners.
     * It handles errors gracefully and displays messages to the user if initialization fails.
     * @async
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    async init() {
        try {
            // Initialize UI Manager first
            this.uiManager = new UIManager();
            this.uiManager.init();

            // Check WebGL support
            if (!this.checkWebGLSupport()) {
                throw new Error('WebGL not supported');
            }

            // Initialize Scene Manager with error handling
            this.sceneManager = new SceneManager('canvas-container');
            await this.sceneManager.init().catch(error => {
                console.error('Scene initialization failed:', error);
                throw new Error('Failed to initialize 3D environment');
            });

            // Initialize Topic Manager
            this.topicManager = new TopicManager(this.sceneManager, this.uiManager);
            this.topicManager.init();

            // Set up event listeners
            this.setupEventListeners();

            // Hide loader only after everything is ready
            this.uiManager.hideLoader();

            // Load welcome topic by default
            this.topicManager.loadTopic('welcome');

        } catch (error) {
            console.error('Failed to initialize application:', error);
            // Show user-friendly error message
            if (error.message === 'WebGL not supported') {
                this.uiManager.showError('Your browser does not support 3D graphics. Please try a modern browser.');
            } else {
                this.uiManager.showError('Failed to initialize 3D environment. Please refresh the page.');
            }
        }
    }

    /**
     * Checks if the browser supports WebGL.
     * @returns {boolean} True if WebGL is supported, false otherwise.
     */
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    /**
     * Sets up global event listeners for the application.
     * This includes handling window resizing and topic change events.
     */
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.sceneManager.onWindowResize();
        });

        // Handle topic changes
        document.addEventListener('topicChanged', (e) => {
            console.log(`Topic changed to: ${e.detail.topic}`);
        });
    }
}

export default Application;
