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

- **SceneManager**: Handles 3D scene setup, lighting, camera controls, and WebGL rendering
- **UIManager**: Manages user interface elements, controls, and responsive design
- **TopicManager**: Coordinates different learning modules and topic switching
- **Topic Modules**: Individual educational components for specific engineering graphics concepts

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

- Follow existing code style and patterns
- Comment complex mathematical calculations
- Test on multiple devices and browsers
- Update documentation for new features
- Respect the educational focus of the project

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
