import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js';

class PointsProjection {
    constructor(sceneManager, uiManager) {
        this.sceneManager = sceneManager;
        this.uiManager = uiManager;
        this.params = { x: 3, y: 4, z: 5 };
        this.objects = {};
    }

    load() {
        this.createControls();
        this.updateVisualization();
    }

    createControls() {
        const html = `
            <h3 class="text-md font-semibold mb-3 text-slate-800">Point P (x, y, z) Controls</h3>
            <div class="bg-slate-50 p-3 rounded-lg mb-4">
                ${this.uiManager.createSlider({
                    id: 'x-slider',
                    label: 'X Coordinate',
                    min: -8,
                    max: 8,
                    value: this.params.x,
                    step: 0.5
                })}
                ${this.uiManager.createSlider({
                    id: 'y-slider',
                    label: 'Y Coordinate (Height above HP)',
                    min: -8,
                    max: 8,
                    value: this.params.y,
                    step: 0.5
                })}
                ${this.uiManager.createSlider({
                    id: 'z-slider',
                    label: 'Z Coordinate (Distance from VP)',
                    min: -8,
                    max: 8,
                    value: this.params.z,
                    step: 0.5
                })}
            </div>
            <div class="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm">
                <p class="font-semibold text-blue-800">Legend:</p>
                <div class="mt-2 space-y-1">
                    <div class="flex items-center">
                        <span class="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                        <span class="text-blue-700">Point P (Main Point)</span>
                    </div>
                    <div class="flex items-center">
                        <span class="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        <span class="text-blue-700">Front View (p')</span>
                    </div>
                    <div class="flex items-center">
                        <span class="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                        <span class="text-blue-700">Top View (p)</span>
                    </div>
                </div>
            </div>
        `;

        this.uiManager.setControls(html);
        this.attachEventListeners();
    }

    attachEventListeners() {
        ['x', 'y', 'z'].forEach(axis => {
            const slider = document.getElementById(`${axis}-slider`);
            const valueLabel = document.getElementById(`${axis}-slider-value`);
            
            slider.addEventListener('input', (e) => {
                this.params[axis] = parseFloat(e.target.value);
                valueLabel.textContent = this.params[axis];
                this.updateVisualization();
            });
        });
    }

    updateVisualization() {
        this.sceneManager.clearSimulation();

        // Main Point P (Red)
        const pointGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const mainPoint = new THREE.Mesh(
            pointGeometry,
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        mainPoint.position.set(this.params.x, this.params.y, this.params.z);
        this.sceneManager.addToSimulation(mainPoint);

        // Front View p' (Green) - projection on VP
        const frontView = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        frontView.position.set(this.params.x, this.params.y, 0);
        this.sceneManager.addToSimulation(frontView);

        // Top View p (Blue) - projection on HP
        const topView = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x0000ff })
        );
        topView.position.set(this.params.x, 0, this.params.z);
        this.sceneManager.addToSimulation(topView);

        // Projection Lines
        this.createProjectionLines(mainPoint.position, frontView.position, topView.position);

        // Update info overlay
        this.updateInfo();
    }

    createProjectionLines(mainPos, frontPos, topPos) {
        const lineMaterial = new THREE.LineDashedMaterial({
            color: 0x555555,
            dashSize: 0.2,
            gapSize: 0.1
        });

        // Line from P to front view
        let geometry = new THREE.BufferGeometry().setFromPoints([mainPos, frontPos]);
        let line = new THREE.Line(geometry, lineMaterial);
        line.computeLineDistances();
        this.sceneManager.addToSimulation(line);

        // Line from P to top view
        geometry = new THREE.BufferGeometry().setFromPoints([mainPos, topPos]);
        line = new THREE.Line(geometry, lineMaterial);
        line.computeLineDistances();
        this.sceneManager.addToSimulation(line);

        // Connecting line on XY plane
        const midPoint = new THREE.Vector3(this.params.x, 0, 0);
        geometry = new THREE.BufferGeometry().setFromPoints([frontPos, midPoint, topPos]);
        line = new THREE.Line(geometry, lineMaterial);
        line.computeLineDistances();
        this.sceneManager.addToSimulation(line);
    }

    updateInfo() {
        const quadrant = this.getQuadrant();
        
        this.uiManager.updateInfoOverlay(`
            <h4 class="font-bold text-slate-800">Point P Analysis</h4>
            <div class="mt-2 space-y-1 text-xs">
                <div><b>Position:</b> (${this.params.x}, ${this.params.y}, ${this.params.z})</div>
                <div><b>Quadrant:</b> <span class="text-indigo-600 font-semibold">${quadrant}</span></div>
                <div class="mt-2 pt-2 border-t border-slate-300">
                    <div><b>Front View (p'):</b> (${this.params.x}, ${this.params.y})</div>
                    <div><b>Top View (p):</b> (${this.params.x}, ${this.params.z})</div>
                </div>
            </div>
        `);
    }

    getQuadrant() {
        if (this.params.y > 0 && this.params.z > 0) return "1st Quadrant";
        if (this.params.y > 0 && this.params.z < 0) return "2nd Quadrant";
        if (this.params.y < 0 && this.params.z < 0) return "3rd Quadrant";
        if (this.params.y < 0 && this.params.z > 0) return "4th Quadrant";
        return "On a plane/axis";
    }

    cleanup() {
        this.sceneManager.clearSimulation();
    }
}

export default PointsProjection;
