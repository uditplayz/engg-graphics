import * as THREE from '../libs/three.module.js';
import { OrbitControls } from '../libs/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from '../libs/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../libs/examples/jsm/geometries/TextGeometry.js';

class SceneManager {
    constructor(containerID) {
        this.containerID = containerID;
        this.container = document.getElementById(containerID);
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.raycaster = null;
        this.mouse = null;
        
        this.hp = null; // Horizontal Plane
        this.vp = null; // Vertical Plane
        this.simulationObjects = new THREE.Group();
        this.font = null;
    }

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

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xedf2f7);
    }

    setupCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
        this.camera.position.set(10, 10, 20);
        this.camera.lookAt(0, 0, 0);
    }

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

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(10, 15, 20);
        this.scene.add(directionalLight);
    }

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

    setupRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

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

    async loadFont() {
        return new Promise((resolve, reject) => {
            const fontLoader = new FontLoader();
            fontLoader.load(
                '../fonts/helvetiker_regular.typeface.json',
                (font) => {
                    this.font = font;
                    resolve(font);
                },
                undefined,
                reject
            );
        });
    }

    createAxisLabels() {
        if (!this.font) return;

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x1a202c });
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

    addToSimulation(object) {
        this.simulationObjects.add(object);
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        if (!this.renderer || !this.scene || !this.camera) return;
        
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }

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
