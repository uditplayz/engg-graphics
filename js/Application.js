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
            // Initialize UI Manager
            this.uiManager = new UIManager();
            this.uiManager.init();

            // Initialize Scene Manager
            this.sceneManager = new SceneManager('canvas-container');
            await this.sceneManager.init();

            // Initialize Topic Manager
            this.topicManager = new TopicManager(this.sceneManager, this.uiManager);
            this.topicManager.init();

            // Set up event listeners
            this.setupEventListeners();

            // Hide loader
            this.uiManager.hideLoader();

            // Load welcome topic by default
            this.topicManager.loadTopic('welcome');

        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.uiManager.showError('Failed to initialize 3D environment');
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
