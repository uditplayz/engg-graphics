# 🎯 Engineering Graphics 3D - Interactive Learning Platform

> **A modern, web-based 3D simulation software for visualizing and understanding engineering graphics concepts without traditional paper-based drawing methods.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Available-brightgreen?style=for-the-badge)](https://uditplayz.github.io/engg-graphics/)
[![JavaScript](https://img.shields.io/badge/JavaScript-99.5%25-yellow?style=for-the-badge&logo=javascript)](https://github.com/uditplayz/engg-graphics)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-red?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Open Source](https://img.shields.io/badge/Open_Source-MIT-blue?style=for-the-badge&logo=github)](https://github.com/uditplayz/engg-graphics)

---

## 🌟 Overview

**Engineering Graphics 3D** is an innovative educational tool that transforms traditional engineering drawing concepts into interactive 3D visualizations. Built with cutting-edge web technologies, this platform helps students and educators understand complex spatial relationships, projections, and engineering drawing principles through hands-on exploration.

### ✨ Key Features

- 🎮 **Interactive 3D Environment**: Real-time manipulation of 3D objects with mouse/touch controls
- 📐 **Multiple Learning Modules**: 
  - Point Projections (Orthographic visualization)
  - Line Projections (Angular relationships with HP/VP)
  - Plane Projections (3D plane intersections)
- 🎛️ **Dynamic Controls**: Live parameter adjustment with instant visual feedback
- 📱 **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎯 **Educational Focus**: Designed specifically for engineering graphics curriculum
- ⚡ **WebGL Powered**: High-performance 3D rendering using Three.js
- 🎨 **Intuitive UI**: Clean, modern interface with comprehensive legends and analysis

### 🎓 Educational Value

This tool addresses critical learning challenges in engineering education:
- **Spatial Visualization**: Helps develop 3D thinking skills essential for engineers
- **Projection Understanding**: Interactive exploration of HP (Horizontal Plane) and VP (Vertical Plane) relationships
- **Hands-on Learning**: Move beyond static textbook drawings to dynamic exploration
- **Immediate Feedback**: Real-time analysis and calculations for better comprehension

---

## 🚀 Getting Started

### 🔥 Quick Demo
**Experience it now:** [https://uditplayz.github.io/engg-graphics/](https://uditplayz.github.io/engg-graphics/)

### 💻 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/uditplayz/engg-graphics.git
   cd engg-graphics
   ```

2. **Serve the application**
   
   **Option A: Using Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js**
   ```bash
   npx serve .
   ```
   
   **Option C: Using Live Server (VS Code Extension)**
   - Install "Live Server" extension in VS Code
   - Right-click `index.html` → "Open with Live Server"

3. **Access the application**
   ```
   http://localhost:8000
   ```

### 🎮 How to Use

1. **Navigation Controls**:
   - **Rotate**: Left-click + drag (or single finger touch + drag)
   - **Pan**: Right-click + drag (or two-finger drag)  
   - **Zoom**: Mouse wheel (or pinch gesture)

2. **Learning Modules**:
   - Select topics from the navigation menu
   - Adjust parameters using the control sliders
   - Observe real-time changes in 3D visualization
   - Read analysis information in the info panel

3. **Interactive Elements**:
   - **Red objects**: Main geometric elements (points, lines, planes)
   - **Green objects**: Front view projections (on VP)
   - **Blue objects**: Top view projections (on HP)
   - **Dashed lines**: Projection relationships

---

## 🏗️ Architecture & Technology Stack

### 🛠️ Core Technologies
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **3D Engine**: Three.js (WebGL-based rendering)
- **Graphics**: WebGL 1.0/2.0 with hardware acceleration
- **Deployment**: GitHub Pages (Static hosting)

### 📁 Project Structure
```
engg-graphics/
├── 📄 index.html              # Main application entry point
├── 📁 js/                     # Core JavaScript modules
│   ├── 🎯 main.js            # Application initialization
│   ├── 🎛️ Application.js     # Main application controller
│   ├── 🎬 SceneManager.js     # 3D scene management
│   ├── 🖥️ UIManager.js       # User interface controller
│   ├── 📚 TopicManager.js     # Learning module coordinator
│   └── 📁 topics/            # Individual learning modules
│       ├── PointsProjection.js
│       ├── LinesProjection.js
│       └── PlanesProjection.js
├── 📁 libs/                  # External libraries
│   ├── three.module.js       # Three.js core library
│   └── examples/jsm/         # Three.js additional modules
├── 📁 styles/                # CSS stylesheets
├── 📁 fonts/                 # Typography assets
├── 🔧 .gitignore            # Git exclusion rules
└── 📖 README.md             # Project documentation
```

### 🧩 Module Descriptions

- **`main.js`**: The main entry point of the application. It listens for the `DOMContentLoaded` event and then creates an instance of the `Application` class to start the application.
- **`Application.js`**: The core orchestrator of the application. It initializes the `UIManager`, `SceneManager`, and `TopicManager`, and handles the overall application state.
- **`SceneManager.js`**: Manages all aspects of the Three.js 3D scene, including the camera, renderer, lighting, and user controls (`OrbitControls`). It also provides a base environment with horizontal and vertical planes (HP and VP).
- **`UIManager.js`**: Handles all interactions with the DOM. It manages the sidebar, topic controls, information overlays, and the mobile menu.
- **`TopicManager.js`**: Responsible for loading, managing, and switching between the different learning topics. It instantiates all topic modules and handles their lifecycle.
- **`js/topics/`**: This directory contains the individual learning modules. Each module is a class that implements a `load()` and `cleanup()` method, and is responsible for creating its own UI controls and 3D objects.

### 🔄 Control Flow

1.  **Initialization**: The application starts when `main.js` creates a new `Application` instance after the DOM is loaded.
2.  **Manager Setup**: The `Application` class initializes the `UIManager`, `SceneManager`, and `TopicManager` in that order.
3.  **Topic Loading**: The `TopicManager` creates the topic buttons in the UI. When a button is clicked, it calls the `loadTopic()` method.
4.  **Scene Update**: `loadTopic()` cleans up the previous topic, clears the 3D scene using `SceneManager.clearSimulation()`, and then calls the `load()` method of the new topic.
5.  **Interaction**: The active topic module uses the `UIManager` to create sliders and other controls, and the `SceneManager` to add 3D objects to the scene.

---

## 📖 Learning Modules

### 1. 📍 Points Projection
**Understand orthographic projection of points in 3D space**
- Interactive point placement in 3D coordinates (x, y, z)
- Real-time visualization of projections on HP and VP
- Quadrant analysis and coordinate system understanding
- Live calculation of front view and top view coordinates

### 2. 📏 Lines Projection  
**Explore line projections and angular relationships**
- Dynamic line creation with adjustable start points
- Control line length and angles with HP/VP
- Visualization of true length vs. projected lengths
- Understanding of foreshortening effects

### 3. 🔷 Planes Projection
**Investigate plane orientations and intersections**
- Interactive plane rotation in 3D space
- Real-time intersection visualization with HP/VP
- Understanding of plane traces and edge views
- Exploration of different plane positions

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help makes this project better.

### 🛠️ Development Setup

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR-USERNAME/engg-graphics.git
   cd engg-graphics
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **Make Changes & Test**
   - Test across different browsers and devices
   - Ensure WebGL compatibility
   - Verify responsive design

4. **Submit Pull Request**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### 🐛 Bug Reports & Feature Requests

- **Bug Reports**: Use GitHub Issues with detailed reproduction steps
- **Feature Ideas**: Propose new learning modules or improvements
- **Educational Content**: Suggest additional engineering graphics topics

### 📝 Contribution Guidelines

- **Code Style**: Follow the existing code style and patterns. Use ES6 modules and classes.
- **JSDoc**: All new classes, methods, and complex functions should be documented using JSDoc comments. This is crucial for maintaining a clear and understandable codebase.
- **Testing**: Test your changes on multiple browsers (Chrome, Firefox, Safari) and devices (desktop and mobile) to ensure compatibility.
- **Atomic Commits**: Make small, atomic commits that are focused on a single change.
- **Respect the Educational Focus**: All new features and content should align with the educational goals of the project.

### 💡 Creating a New Topic Module

To create a new learning module, follow these steps:

1.  **Create the File**: Create a new JavaScript file in the `js/topics/` directory (e.g., `MyNewTopic.js`).

2.  **Create the Class**: Use the following template for your new topic class:

    ```javascript
    import * as THREE from '../../libs/three.module.js';

    class MyNewTopic {
        constructor(sceneManager, uiManager) {
            this.sceneManager = sceneManager;
            this.uiManager = uiManager;
            this.params = { /* your parameters here */ };
        }

        load() {
            // Create UI controls and initial 3D objects here
            this.createControls();
            this.updateVisualization();
        }

        createControls() {
            // Use this.uiManager to create sliders, buttons, etc.
        }

        updateVisualization() {
            // Use this.sceneManager to add/remove 3D objects
        }

        cleanup() {
            // This method is called when switching to another topic
            this.sceneManager.clearSimulation();
        }
    }

    export default MyNewTopic;
    ```

3.  **Implement the Logic**:
    *   Add your topic's specific parameters to the `this.params` object in the constructor.
    *   Implement the `createControls()` method to generate the HTML for your topic's UI controls.
    *   Implement the `updateVisualization()` method to create and update the 3D objects in the scene based on the current parameters.
    *   The `cleanup()` method should clean up any resources used by your topic.

4.  **Add to TopicManager**: Open `js/TopicManager.js` and add your new topic to the `topics` map in the constructor:

    ```javascript
    // In js/TopicManager.js
    import MyNewTopic from './topics/MyNewTopic.js';

    class TopicManager {
        constructor(sceneManager, uiManager) {
            // ...
            this.topics = {
                welcome: new WelcomeTopic(sceneManager, uiManager),
                points: new PointsProjection(sceneManager, uiManager),
                lines: new LinesProjection(sceneManager, uiManager),
                planes: new PlanesProjection(sceneManager, uiManager),
                myNewTopic: new MyNewTopic(sceneManager, uiManager) // Add your new topic here
            };
        }

        init() {
            const topicList = [
                // ...
                { id: 'myNewTopic', name: 'My New Topic' } // Add your new topic to the list
            ];
            // ...
        }
    }
    ```

---

## 🎯 Future Roadmap

### 📈 Upcoming Features
- [ ] 📐 **Advanced Projections**: Auxiliary views and oblique projections  
- [ ] 📏 **Dimensioning Tools**: Interactive measurement and annotation
- [ ] 🔄 **Animation System**: Step-by-step construction animations
- [ ] 💾 **Save/Load**: Project persistence and sharing capabilities
- [ ] 🎨 **Customization**: Themes, colors, and display options
- [ ] 📱 **PWA Support**: Offline capability and app-like experience
- [ ] 🌐 **Multi-language**: Localization for global accessibility
- [ ] 🎓 **Assessment**: Interactive quizzes and skill evaluation

### 🎯 Long-term Vision
- Integration with popular LMS platforms
- VR/AR support for immersive learning
- AI-powered learning assistance
- Community-generated content system
- Real-time collaborative learning

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free to use, modify, and distribute
✅ Commercial use    ✅ Distribution    ✅ Modification    ✅ Private use
```

---

## 🏆 About the Developer

<div align="center">

### 👨‍💻 **Udit Jain** 
*Engineering Student & Full-Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-uditplayz-black?style=for-the-badge&logo=github)](https://github.com/uditplayz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/uditjain777)

🎓 **First-Year Engineering Student** at Keystone School of Engineering, Pune  
🚀 **Passionate about**: Linux Systems, Web Development, 3D Graphics & Educational Technology  
💡 **Mission**: Building innovative tools that make engineering education more accessible and engaging

---

*"Transforming traditional engineering education through interactive technology"*

</div>

### 🛠️ Technical Expertise
- **Frontend**: React.js, JavaScript (ES6+), HTML5/CSS3, Three.js/WebGL
- **Backend**: Node.js, Firebase, Vercel Deployment
- **Systems**: Linux Administration (Manjaro), Git/GitHub Workflow
- **Graphics**: 3D Visualization, WebGL Programming, Interactive Design

### 🎯 Current Focus
- Developing educational technology solutions
- Contributing to open-source projects
- Exploring cybersecurity and penetration testing
- Building portfolio of impactful engineering tools

---

## 🙏 Acknowledgments

- **Three.js Community** - For the incredible 3D graphics library
- **Engineering Faculty** - For educational guidance and feedback  
- **Open Source Contributors** - For inspiration and code examples
- **Beta Testers** - Students and educators who provided valuable feedback

---

## 📞 Support & Contact

### 💬 Get Help
- 📋 **Issues**: [GitHub Issues](https://github.com/uditplayz/engg-graphics/issues)
- 💡 **Discussions**: [GitHub Discussions](https://github.com/uditplayz/engg-graphics/discussions)
- 📧 **Email**: [Contact Developer](mailto:jain.udit0000@gmail.com)

### 🌟 Show Your Support
If this project helped you learn or teach engineering graphics:
- ⭐ **Star this repository**
- 🍴 **Fork and contribute**  
- 📢 **Share with others**
- 💰 **Sponsor development**

---

<div align="center">

**Made with ❤️ for the Engineering Education Community**

*"Every great engineer starts with understanding the fundamentals of technical drawing and spatial visualization."*

[![Visitors](https://visitor-badge.laobi.icu/badge?page_id=uditplayz.engg-graphics)](https://github.com/uditplayz/engg-graphics)

</div>
