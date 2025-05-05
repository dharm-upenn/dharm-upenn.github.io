# 👓 Cloo – Virtual Eyewear Try-On MVP

Welcome to **Cloo**, a proof-of-concept web app that lets users scan their face, identify their face shape using facial landmarks, and recommend the most suitable eyeglasses — all in under 5 seconds.

Built for our Integrated Product Design capstone, this MVP demonstrates the potential of merging AI/ML, facial geometry, and browser-based AR for a smarter eyewear shopping experience.

---

## 🚀 Features

- 🧠 **Real-Time Facial Landmark Detection** with MediaPipe
- 📐 **Face Shape Classification** using geometry-based heuristics
- 🕶️ **Frame Recommendations** tailored to face shape
- 🖼️ **Live Overlay of Glasses** directly on user’s face
- 📸 **Take & Save a Photo** with overlayed glasses
- 📊 **"Fit Score"** on how well the recommended glasses match your facial geometry
- ✨ Polished scanning sequence with live UI animations

---

## 🖥️ Demo

👉 [Try it here on GitHub Pages](https://dharm-upenn.github.io/ClooTryOn/index.html)

---

## 📂 Folder Structure
    ├── index.html # Main webpage
    ├── script.js # App logic (landmarks, overlay, UI)
    ├── images/ # Contains all glasses images (aviator.png, square.png, etc.)
    └── README.md

---

## 🧪 How It Works

1. User grants camera access (webcam required).
2. The app tracks facial landmarks using [MediaPipe FaceMesh](https://google.github.io/mediapipe/solutions/face_mesh).
3. Based on face proportions (forehead, cheekbone, jawline), the app classifies the user's face shape.
4. A set of matching frames are recommended and can be overlayed in real time.
5. User can click “Take Photo” to save a screenshot locally with their virtual try-on.

---

## 🛠️ Built With

- [MediaPipe FaceMesh](https://google.github.io/mediapipe/solutions/face_mesh)
- Vanilla JS + HTML5 Canvas
- Basic CSS + custom JS UI interactions
- 🖼️ Glasses illustrations (custom PNG overlays)

---

## 📦 Hosting & Deployment

Deployed via **GitHub Pages**.

To run locally:
```bash
git clone https://github.com/dharm-upenn/cloo-tryon.git
cd cloo-tryon
open index.html  # or drag into browser


