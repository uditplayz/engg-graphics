/**
 * @file Contains the PlanesProjection class for the projection of planes topic.
 */

import * as THREE from '../../libs/three.module.js';

/**
 * @class PlanesProjection
 * @classdesc A topic module for visualizing a plane in 3D space and its orientation.
 */
class PlanesProjection {
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
        /**
         * @type {{size: number, rotX: number, rotY: number, rotZ: number}}
         * The parameters for the plane, including its size and rotation angles.
         */
        this.params = {
            size: 5,
            rotX: 30,
            rotY: 45,
            rotZ: 0
        };
    }

    /**
     * Loads the topic, creating controls and initial visualization.
     */
    load() {
        this.createControls();
        this.updateVisualization();
    }

    /**
     * Creates the UI controls for manipulating the plane's properties.
     */
    createControls() {
        const html = `
            <h3 class="text-md font-semibold mb-3 text-slate-800">Plane Projection Controls</h3>
            <div class="bg-slate-50 p-3 rounded-lg mb-4">
                ${this.uiManager.createSlider({
                    id: 'size-slider',
                    label: 'Plane Size',
                    min: 2,
                    max: 10,
                    value: this.params.size,
                    step: 0.5
                })}
                
                <h4 class="text-sm font-semibold mb-2 mt-4 text-slate-700">Rotation Angles</h4>
                ${this.uiManager.createSlider({
                    id: 'rotX-slider',
                    label: 'Rotation X (degrees)',
                    min: 0,
                    max: 360,
                    value: this.params.rotX,
                    step: 10
                })}
                ${this.uiManager.createSlider({
                    id: 'rotY-slider',
                    label: 'Rotation Y (degrees)',
                    min: 0,
                    max: 360,
                    value: this.params.rotY,
                    step: 10
                })}
                ${this.uiManager.createSlider({
                    id: 'rotZ-slider',
                    label: 'Rotation Z (degrees)',
                    min: 0,
                    max: 360,
                    value: this.params.rotZ,
                    step: 10
                })}
            </div>
            <div class="bg-purple-50 border border-purple-200 p-3 rounded-lg text-sm">
                <p class="font-semibold text-purple-800">About Planes:</p>
                <p class="mt-2 text-purple-700 text-xs">
                    The colored plane represents an arbitrary plane in 3D space. 
                    Adjust its rotation to see how it intersects with the HP and VP.
                </p>
            </div>
        `;

        this.uiManager.setControls(html);
        this.attachEventListeners();
    }

    /**
     * Attaches event listeners to the UI controls.
     */
    attachEventListeners() {
        ['size', 'rotX', 'rotY', 'rotZ'].forEach(param => {
            const slider = document.getElementById(`${param}-slider`);
            const valueLabel = document.getElementById(`${param}-slider-value`);
            
            slider.addEventListener('input', (e) => {
                this.params[param] = parseFloat(e.target.value);
                valueLabel.textContent = this.params[param];
                this.updateVisualization();
            });
        });
    }

    /**
     * Updates the 3D visualization based on the current parameters.
     */
    updateVisualization() {
        this.sceneManager.clearSimulation();

        // Create the main plane
        const planeGeometry = new THREE.PlaneGeometry(this.params.size, this.params.size);
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide,
            roughness: 0.3,
            metalness: 0.1
        });

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        
        // Apply rotations
        plane.rotation.x = (this.params.rotX * Math.PI) / 180;
        plane.rotation.y = (this.params.rotY * Math.PI) / 180;
        plane.rotation.z = (this.params.rotZ * Math.PI) / 180;

        this.sceneManager.addToSimulation(plane);

        // Add plane edges for better visibility
        const edges = new THREE.EdgesGeometry(planeGeometry);
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
        edgeLines.rotation.copy(plane.rotation);
        this.sceneManager.addToSimulation(edgeLines);

        // Add corner spheres
        this.addCornerSpheres(plane);

        this.updateInfo();
    }

    /**
     * Adds spheres at the corners of the plane for better visualization.
     * @param {THREE.Mesh} plane The plane mesh whose corners are to be marked.
     */
    addCornerSpheres(plane) {
        const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

        const halfSize = this.params.size / 2;
        const corners = [
            new THREE.Vector3(-halfSize, -halfSize, 0),
            new THREE.Vector3(halfSize, -halfSize, 0),
            new THREE.Vector3(halfSize, halfSize, 0),
            new THREE.Vector3(-halfSize, halfSize, 0)
        ];

        corners.forEach(corner => {
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
            corner.applyEuler(plane.rotation);
            sphere.position.copy(corner);
            this.sceneManager.addToSimulation(sphere);
        });
    }

    /**
     * Updates the information overlay with the current plane analysis.
     */
    updateInfo() {
        this.uiManager.updateInfoOverlay(`
            <h4 class="font-bold text-slate-800">Plane Analysis</h4>
            <div class="mt-2 space-y-1 text-xs">
                <div><b>Size:</b> ${this.params.size} × ${this.params.size} units</div>
                <div class="mt-2 pt-2 border-t border-slate-300">
                    <div><b>Rotation X:</b> ${this.params.rotX}°</div>
                    <div><b>Rotation Y:</b> ${this.params.rotY}°</div>
                    <div><b>Rotation Z:</b> ${this.params.rotZ}°</div>
                </div>
                <div class="mt-2 pt-2 border-t border-slate-300 text-purple-700">
                    <p class="text-xs italic">
                        Rotate the view to see how the plane intersects with HP and VP
                    </p>
                </div>
            </div>
        `);
    }

    /**
     * Cleans up the topic by clearing all simulation objects.
     */
    cleanup() {
        this.sceneManager.clearSimulation();
    }
}

export default PlanesProjection;
