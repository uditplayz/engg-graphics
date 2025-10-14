/**
 * @file Contains the LinesProjection class for the projection of lines topic.
 */

import * as THREE from '../../libs/three.module.js';

/**
 * @class LinesProjection
 * @classdesc A topic module for visualizing the orthographic projection of a line in 3D space.
 */
class LinesProjection {
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
         * @type {{x1: number, y1: number, z1: number, length: number, theta: number, phi: number}}
         * The parameters for the line, including start point, length, and angles.
         */
        this.params = {
            x1: 2,
            y1: 2,
            z1: 1,
            length: 6,
            theta: 30, // Angle with HP
            phi: 45    // Angle with VP
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
     * Creates the UI controls for manipulating the line's properties.
     */
    createControls() {
        const html = `
            <h3 class="text-md font-semibold mb-3 text-slate-800">Line Projection Controls</h3>
            <div class="bg-slate-50 p-3 rounded-lg mb-4">
                <h4 class="text-sm font-semibold mb-2 text-slate-700">Starting Point</h4>
                ${this.uiManager.createSlider({
                    id: 'x1-slider',
                    label: 'Start X',
                    min: -8,
                    max: 8,
                    value: this.params.x1,
                    step: 0.5
                })}
                ${this.uiManager.createSlider({
                    id: 'y1-slider',
                    label: 'Start Y',
                    min: -8,
                    max: 8,
                    value: this.params.y1,
                    step: 0.5
                })}
                ${this.uiManager.createSlider({
                    id: 'z1-slider',
                    label: 'Start Z',
                    min: -8,
                    max: 8,
                    value: this.params.z1,
                    step: 0.5
                })}
                
                <h4 class="text-sm font-semibold mb-2 mt-4 text-slate-700">Line Properties</h4>
                ${this.uiManager.createSlider({
                    id: 'length-slider',
                    label: 'Length',
                    min: 1,
                    max: 10,
                    value: this.params.length,
                    step: 0.5
                })}
                ${this.uiManager.createSlider({
                    id: 'theta-slider',
                    label: 'Angle with HP (θ°)',
                    min: 0,
                    max: 90,
                    value: this.params.theta,
                    step: 5
                })}
                ${this.uiManager.createSlider({
                    id: 'phi-slider',
                    label: 'Angle with VP (φ°)',
                    min: 0,
                    max: 90,
                    value: this.params.phi,
                    step: 5
                })}
            </div>
            <div class="bg-green-50 border border-green-200 p-3 rounded-lg text-sm">
                <p class="font-semibold text-green-800">Legend:</p>
                <div class="mt-2 space-y-1">
                    <div class="flex items-center">
                        <span class="inline-block w-4 h-1 bg-red-600 mr-2"></span>
                        <span class="text-green-700">Main Line</span>
                    </div>
                    <div class="flex items-center">
                        <span class="inline-block w-4 h-1 bg-green-600 mr-2"></span>
                        <span class="text-green-700">Front View</span>
                    </div>
                    <div class="flex items-center">
                        <span class="inline-block w-4 h-1 bg-blue-600 mr-2"></span>
                        <span class="text-green-700">Top View</span>
                    </div>
                </div>
            </div>
        `;

        this.uiManager.setControls(html);
        this.attachEventListeners();
    }

    /**
     * Attaches event listeners to the UI controls.
     */
    attachEventListeners() {
        ['x1', 'y1', 'z1', 'length', 'theta', 'phi'].forEach(param => {
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

        // Calculate end point based on angles and length
        const thetaRad = (this.params.theta * Math.PI) / 180;
        const phiRad = (this.params.phi * Math.PI) / 180;

        const dx = this.params.length * Math.cos(thetaRad) * Math.cos(phiRad);
        const dy = this.params.length * Math.sin(thetaRad);
        const dz = this.params.length * Math.cos(thetaRad) * Math.sin(phiRad);

        const start = new THREE.Vector3(this.params.x1, this.params.y1, this.params.z1);
        const end = new THREE.Vector3(
            this.params.x1 + dx,
            this.params.y1 + dy,
            this.params.z1 + dz
        );

        // Main Line (Red)
        this.createLine(start, end, 0xff0000, 3);

        // Front View (Green) - projection on VP
        const frontStart = new THREE.Vector3(start.x, start.y, 0);
        const frontEnd = new THREE.Vector3(end.x, end.y, 0);
        this.createLine(frontStart, frontEnd, 0x00ff00, 2);

        // Top View (Blue) - projection on HP
        const topStart = new THREE.Vector3(start.x, 0, start.z);
        const topEnd = new THREE.Vector3(end.x, 0, end.z);
        this.createLine(topStart, topEnd, 0x0000ff, 2);

        // Projection lines (dashed)
        this.createProjectionLines(start, end, frontStart, frontEnd, topStart, topEnd);

        // Add spheres at endpoints
        this.addEndpointSpheres(start, end);

        this.updateInfo(start, end);
    }

    /**
     * Helper function to create a line segment in the scene.
     * @param {THREE.Vector3} start The starting point of the line.
     * @param {THREE.Vector3} end The ending point of the line.
     * @param {number} color The color of the line.
     * @param {number} linewidth The width of the line.
     */
    createLine(start, end, color, linewidth) {
        const material = new THREE.LineBasicMaterial({ color, linewidth });
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const line = new THREE.Line(geometry, material);
        this.sceneManager.addToSimulation(line);
    }

    /**
     * Creates the dashed projection lines.
     * @param {THREE.Vector3} start The start point of the main line.
     * @param {THREE.Vector3} end The end point of the main line.
     * @param {THREE.Vector3} frontStart The start point of the front view.
     * @param {THREE.Vector3} frontEnd The end point of the front view.
     * @param {THREE.Vector3} topStart The start point of the top view.
     * @param {THREE.Vector3} topEnd The end point of the top view.
     */
    createProjectionLines(start, end, frontStart, frontEnd, topStart, topEnd) {
        const lineMaterial = new THREE.LineDashedMaterial({
            color: 0x888888,
            dashSize: 0.15,
            gapSize: 0.1
        });

        // Projections from main line to views
        const points = [
            [start, frontStart],
            [start, topStart],
            [end, frontEnd],
            [end, topEnd]
        ];

        points.forEach(([p1, p2]) => {
            const geometry = new THREE.BufferGeometry().setFromPoints([p1, p2]);
            const line = new THREE.Line(geometry, lineMaterial);
            line.computeLineDistances();
            this.sceneManager.addToSimulation(line);
        });
    }

    /**
     * Adds spheres at the endpoints of the main line for better visualization.
     * @param {THREE.Vector3} start The starting point.
     * @param {THREE.Vector3} end The ending point.
     */
    addEndpointSpheres(start, end) {
        const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

        const startSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        startSphere.position.copy(start);
        this.sceneManager.addToSimulation(startSphere);

        const endSphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
        endSphere.position.copy(end);
        this.sceneManager.addToSimulation(endSphere);
    }

    /**
     * Updates the information overlay with the current line analysis.
     * @param {THREE.Vector3} start The starting point of the line.
     * @param {THREE.Vector3} end The ending point of the line.
     */
    updateInfo(start, end) {
        const actualLength = start.distanceTo(end);
        
        this.uiManager.updateInfoOverlay(`
            <h4 class="font-bold text-slate-800">Line Analysis</h4>
            <div class="mt-2 space-y-1 text-xs">
                <div><b>Start:</b> (${start.x.toFixed(1)}, ${start.y.toFixed(1)}, ${start.z.toFixed(1)})</div>
                <div><b>End:</b> (${end.x.toFixed(1)}, ${end.y.toFixed(1)}, ${end.z.toFixed(1)})</div>
                <div><b>Length:</b> ${actualLength.toFixed(2)} units</div>
                <div class="mt-2 pt-2 border-t border-slate-300">
                    <div><b>Angle with HP (θ):</b> ${this.params.theta}°</div>
                    <div><b>Angle with VP (φ):</b> ${this.params.phi}°</div>
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

export default LinesProjection;
