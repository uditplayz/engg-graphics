/**
 * @file Manages the Three.js scene, including setup, rendering, and interaction.
 */

import * as THREE from '../libs/three.module.js';
import { OrbitControls } from '../libs/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from '../libs/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../libs/examples/jsm/geometries/TextGeometry.js';

/**
 * @class SceneManager
 * @classdesc Handles all aspects of the 3D scene, including camera, lighting, rendering,
 * and the base environment for simulations.
 */
class SceneManager {
    /**
     * @constructor
     * @param {string} containerID The ID of the DOM element to contain the canvas.
     */
    constructor(containerID) {
        /** @type {string} The ID of the container element. */
        this.containerID = containerID;
        /** @type {HTMLElement} The container DOM element. */
        this.container = document.getElementById(containerID);
        
        /** @type {THREE.Scene|null} The main Three.js scene. */
        this.scene = null;
        /** @type {THREE.PerspectiveCamera|null} The camera for viewing the scene. */
        this.camera = null;
        /** @type {THREE.WebGLRenderer|null} The renderer for the scene. */
        this.renderer = null;
        /** @type {OrbitControls|null} The camera controls for user interaction. */
        this.controls = null;
        /** @type {THREE.Raycaster|null} Used for mouse picking and interaction. */
        this.raycaster = null;
        /** @type {THREE.Vector2|null} Stores normalized mouse coordinates. */
        this.mouse = null;
        
        /** @type {THREE.Mesh|null} The horizontal plane (HP). */
        this.hp = null;
        /** @type {THREE.Mesh|null} The vertical plane (VP). */
        this.vp = null;
        /** @type {THREE.Group} A group to hold all topic-specific 3D objects. */
        this.simulationObjects = new THREE.Group();
        /** @type {Font|null} The loaded font for creating text geometries. */
        this.font = null;
    }

    /**
     * Initializes the entire 3D scene.
     * Sets up the scene, camera, renderer, lighting, controls, and base planes.
     * @async
     * @returns {Promise<void>} A promise that resolves when the scene is set up.
     * @throws {Error} If initialization fails.
     */
    async init() {
        try {
            this.setupScene();
            this.setupCamera();
            this.setupRenderer();
            this.setupLighting();
            this.setupControls();
            this.setupRaycaster();
            
            this.scene.add(this.simulationObjects);
            
            this.createBasePlanes();
            
            // Start animation before loading font to show something on screen
            this.animate();
            
            // Load font in background
            this.loadFont().then(() => {
                this.createAxisLabels();
            }).catch(err => {
                console.warn('Font loading failed:', err);
                // Continue without labels if font fails
            });
        } catch (error) {
            console.error('SceneManager initialization failed:', error);
            throw error;
        }
    }

    /**
     * Creates and configures the Three.js scene.
     */
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xedf2f7);
    }

    /**
     * Creates and configures the perspective camera.
     */
    setupCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
        this.camera.position.set(10, 10, 20);
        this.camera.lookAt(0, 0, 0);
    }

    /**
     * Creates and configures the WebGL renderer.
     */
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
    }

    /**
     * Adds lighting to the scene.
     */
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(10, 15, 20);
        this.scene.add(directionalLight);
    }

    /**
     * Sets up the OrbitControls for camera manipulation.
     */
    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        };
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.rotateSpeed = 0.7;
        this.controls.zoomSpeed = 1.2;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 100;
    }

    /**
     * Initializes the raycaster for mouse interactions.
     */
    setupRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    /**
     * Creates the base horizontal and vertical planes (HP and VP).
     */
    createBasePlanes() {
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0x99aaff,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide,
            roughness: 0.5,
            metalness: 0.2
        });

        // Horizontal Plane (HP)
        const hpGeometry = new THREE.PlaneGeometry(20, 20);
        this.hp = new THREE.Mesh(hpGeometry, planeMaterial.clone());
        this.hp.rotation.x = -Math.PI / 2;
        this.hp.userData = { name: 'Horizontal Plane (HP)' };
        this.scene.add(this.hp);

        // Vertical Plane (VP)
        const vpGeometry = new THREE.PlaneGeometry(20, 20);
        this.vp = new THREE.Mesh(vpGeometry, planeMaterial.clone());
        this.vp.rotation.y = Math.PI;
        this.vp.userData = { name: 'Vertical Plane (VP)' };
        this.scene.add(this.vp);

        // Grid Helper
        const gridHelper = new THREE.GridHelper(20, 20, 0xcccccc, 0xdddddd);
        gridHelper.position.y = 0.01;
        this.scene.add(gridHelper);

        // Axis Lines
        this.createAxisLines();
    }

    /**
     * Creates the X, Y, and Z axis lines.
     */
    createAxisLines() {
        const axisMaterial = new THREE.LineBasicMaterial({ color: 0x2d3748, linewidth: 2 });
        
        const pointsX = [new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)];
        const pointsY = [new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)];
        const pointsZ = [new THREE.Vector3(0, 0, -10), new THREE.Vector3(0, 0, 10)];
        
        const geometryX = new THREE.BufferGeometry().setFromPoints(pointsX);
        const geometryY = new THREE.BufferGeometry().setFromPoints(pointsY);
        const geometryZ = new THREE.BufferGeometry().setFromPoints(pointsZ);
        
        const lineX = new THREE.Line(geometryX, axisMaterial);
        const lineY = new THREE.Line(geometryY, axisMaterial);
        const lineZ = new THREE.Line(geometryZ, axisMaterial);
        
        const axisLines = new THREE.Group();
        axisLines.add(lineX, lineY, lineZ);
        this.scene.add(axisLines);
    }

    /**
     * Loads the font required for text geometries.
     * @async
     * @returns {Promise<Font>} A promise that resolves with the loaded font.
     */
    async loadFont() {
        return new Promise((resolve, reject) => {
            const fontLoader = new FontLoader();
            fontLoader.load(
                './fonts/helvetiker_regular.typeface.json',
                (font) => {
                    this.font = font;
                    resolve(font);
                },
                undefined,
                reject
            );
        });
    }

    /**
     * Creates and adds axis labels (X, Y, Z) to the scene.
     */
    createAxisLabels() {
        if (!this.font) return;

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x1a202c });
        /**
         * Helper function to create a text mesh.
         * @param {string} text - The text to display.
         * @param {THREE.Vector3} position - The position of the text.
         * @returns {THREE.Mesh} The created text mesh.
         */
        const createText = (text, position) => {
            const geometry = new TextGeometry(text, {
                font: this.font,
                size: 0.5,
                height: 0.05
            });
            const mesh = new THREE.Mesh(geometry, textMaterial);
            mesh.position.copy(position);
            return mesh;
        };

        this.scene.add(createText('X', new THREE.Vector3(10.5, 0, 0)));
        this.scene.add(createText('-X', new THREE.Vector3(-11.5, 0, 0)));
        this.scene.add(createText('Y', new THREE.Vector3(0, 10.5, 0)));
        this.scene.add(createText('-Y', new THREE.Vector3(0, -11, 0)));
        this.scene.add(createText('Z', new THREE.Vector3(0, 0, 10.5)));
        this.scene.add(createText('-Z', new THREE.Vector3(0, 0, -11)));
    }

    /**
     * Clears all objects from the simulation group, ensuring proper memory disposal.
     */
    clearSimulation() {
        while (this.simulationObjects.children.length > 0) {
            const object = this.simulationObjects.children[0];
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(mat => mat.dispose());
                } else {
                    object.material.dispose();
                }
            }
            this.simulationObjects.remove(object);
        }
    }

    /**
     * Adds a 3D object to the simulation group.
     * @param {THREE.Object3D} object The object to add.
     */
    addToSimulation(object) {
        this.simulationObjects.add(object);
    }

    /**
     * Handles window resize events to keep the viewport and camera aspect ratio correct.
     */
    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    /**
     * The main animation loop. Renders the scene and updates controls.
     */
    animate() {
        if (!this.renderer || !this.scene || !this.camera) return;
        
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Cleans up resources to prevent memory leaks.
     */
    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        if (this.controls) {
            this.controls.dispose();
        }

        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }

        // Clear references
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
    }
}

export default SceneManager;
