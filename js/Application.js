import SceneManager from './SceneManager.js';
import UIManager from './UIManager.js';
import TopicManager from './TopicManager.js';

class Application {
    constructor() {
        this.sceneManager = null;
        this.uiManager = null;
        this.topicManager = null;
    }

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

    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

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
