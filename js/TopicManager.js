/**
 * @file Manages the loading, switching, and state of different learning topics.
 */

import WelcomeTopic from './topics/WelcomeTopic.js';
import PointsProjection from './topics/PointsProjection.js';
import LinesProjection from './topics/LinesProjection.js';
import PlanesProjection from './topics/PlanesProjection.js';

/**
 * @class TopicManager
 * @classdesc Handles the lifecycle of learning topics, including initialization,
 * loading, and cleanup.
 */
class TopicManager {
    /**
     * @constructor
     * @param {SceneManager} sceneManager An instance of the SceneManager.
     * @param {UIManager} uiManager An instance of the UIManager.
     */
    constructor(sceneManager, uiManager) {
        /** @type {SceneManager} Reference to the SceneManager. */
        this.sceneManager = sceneManager;
        /** @type {UIManager} Reference to the UIManager. */
        this.uiManager = uiManager;
        /** @type {object|null} The currently active topic instance. */
        this.currentTopic = null;
        /** @type {Object<string, object>} A map of available topic instances. */
        this.topics = {
            welcome: new WelcomeTopic(sceneManager, uiManager),
            points: new PointsProjection(sceneManager, uiManager),
            lines: new LinesProjection(sceneManager, uiManager),
            planes: new PlanesProjection(sceneManager, uiManager)
        };
    }

    /**
     * Initializes the TopicManager.
     * Creates the topic buttons in the UI and sets up event listeners to handle topic changes.
     */
    init() {
        const topicList = [
            { id: 'welcome', name: 'Welcome' },
            { id: 'points', name: 'Projections of Points' },
            { id: 'lines', name: 'Projections of Lines' },
            { id: 'planes', name: 'Projections of Planes' }
        ];

        this.uiManager.createTopicButtons(topicList);

        // Set up topic button listeners
        document.querySelectorAll('.topic-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const topicId = e.target.dataset.topic;
                this.loadTopic(topicId);
            });
        });
    }

    /**
     * Loads a specific learning topic.
     * Cleans up the previous topic, clears the simulation, sets the active UI state,
     * and loads the new topic.
     * @param {string} topicId The identifier for the topic to load.
     */
    loadTopic(topicId) {
        if (this.currentTopic && typeof this.currentTopic.cleanup === 'function') {
            this.currentTopic.cleanup();
        }

        this.sceneManager.clearSimulation();
        this.uiManager.setActiveButton(topicId);

        if (this.topics[topicId]) {
            this.currentTopic = this.topics[topicId];
            this.currentTopic.load();

            // Dispatch a custom event to notify other parts of the app about the change
            const event = new CustomEvent('topicChanged', { detail: { topic: topicId } });
            document.dispatchEvent(event);
        } else {
            console.error(`Topic with ID "${topicId}" not found.`);
        }
    }
}

export default TopicManager;
