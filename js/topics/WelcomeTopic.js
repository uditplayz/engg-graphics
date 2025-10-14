/**
 * @file Contains the WelcomeTopic class which displays the initial welcome screen.
 */

/**
 * @class WelcomeTopic
 * @classdesc A topic module that shows a welcome message, instructions,
 * and general information about the application.
 */
class WelcomeTopic {
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
    }

    /**
     * Loads the welcome message into the UI panels.
     * This method sets the content for the main controls area and the info overlay.
     */
    load() {
        this.uiManager.setControls(`
            <div class="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                <h3 class="font-bold text-indigo-800 mb-3">Welcome to Engineering Graphics 3D!</h3>
                <p class="mt-2 text-sm text-indigo-700">
                    This interactive 3D learning environment helps you understand engineering graphics 
                    concepts without paper-based drawing.
                </p>
                <p class="mt-3 text-sm text-indigo-700 font-semibold">How to use:</p>
                <ul class="list-disc list-inside mt-2 text-sm text-indigo-700 space-y-1">
                    <li><b>Rotate:</b> Left-click and drag</li>
                    <li><b>Pan:</b> Right-click and drag</li>
                    <li><b>Zoom:</b> Scroll wheel or pinch</li>
                </ul>
                <p class="mt-3 text-sm text-indigo-700">
                    Select a topic from above to begin your interactive learning experience!
                </p>
                <div class="mt-4 p-3 bg-white rounded border border-indigo-300">
                    <p class="text-xs text-indigo-600">
                        <b>💡 Tip:</b> The blue plane is the Horizontal Plane (HP) and 
                        the vertical blue plane is the Vertical Plane (VP).
                    </p>
                </div>
            </div>
        `);

        this.uiManager.updateInfoOverlay(`
            <h4 class="font-bold text-indigo-700">Engineering Graphics 3D</h4>
            <p class="mt-1 text-xs">Select a topic to start learning</p>
        `);
    }

    /**
     * Cleans up the topic. For the welcome topic, no cleanup is necessary.
     */
    cleanup() {
        // No cleanup needed for welcome screen
    }
}

export default WelcomeTopic;
