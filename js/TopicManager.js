import WelcomeTopic from './topics/WelcomeTopic.js';
import PointsProjection from './topics/PointsProjection.js';
import LinesProjection from './topics/LinesProjection.js';
import PlanesProjection from './topics/PlanesProjection.js';

class TopicManager {
    constructor(sceneManager, uiManager) {
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.currentTopic = null;
        this.topics = {
            welcome: new WelcomeTopic(sceneManager, uiManager),
            points: new PointsProjection(sceneManager, uiManager),
            lines: new LinesProjection(sceneManager, uiManager),
            planes: new PlanesProjection(sceneManager, uiManager)
        };
    }

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

    loadTopic(topicId) {
        if (this.currentTopic) {
            this.currentTopic.cleanup();
        }

        this.sceneManager.clearSimulation();
        this.uiManager.setActiveButton(topicId);

        if (this.topics[topicId]) {
            this.currentTopic = this.topics[topicId];
            this.currentTopic.load();

            // Dispatch event
            const event = new CustomEvent('topicChanged', { detail: { topic: topicId } });
            document.dispatchEvent(event);
        }
    }
}

export default TopicManager;
