// src/App.jsx
import React from 'react';
import ModelViewer from './components/ModelViewer';
import './App.css';

const model1Config = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    zoomFactor: 1.5,  // Adjust this factor to zoom in/out
    position: { x: 0, y: 2, z: 20 }
  },
  ambientLight: {
    color: 0xffffff,
    intensity: 1
  },
  directionalLight: {
    color: 0xffffff,
    intensity: 1,
    position: { x: 5, y: 10, z: 7.5 }
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    screenSpacePanning: false,
    maxPolarAngle: Math.PI / 2
  },
  canvas: {
    width: 400,
    height: 400
  },
  renderer: {
    antialias: true,
    alpha: true,
    clearColor: 0x000000,
    clearAlpha: 0 // Transparent background
  }
};

const model2Config = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    zoomFactor: 1.5,  // Adjust this factor to zoom in/out
    position: { x: 0, y: 2, z: 20 }
  },
  ambientLight: {
    color: 0xffffff,
    intensity: 1
  },
  directionalLight: {
    color: 0xffffff,
    intensity: 1,
    position: { x: 5, y: 10, z: 7.5 }
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    screenSpacePanning: false,
    maxPolarAngle: Math.PI / 2
  },
  canvas: {
    width: 400,
    height: 400
  },
  renderer: {
    antialias: true,
    alpha: true,
    clearColor: 0x000000,
    clearAlpha: 0 // Transparent background
  }
};

const model3Config = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    zoomFactor: 1.5,  // Adjust this factor to zoom in/out
    position: { x: 0, y: 2, z: 20 }
  },
  ambientLight: {
    color: 0xffffff,
    intensity: 1
  },
  directionalLight: {
    color: 0xffffff,
    intensity: 1,
    position: { x: 5, y: 10, z: 7.5 }
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    screenSpacePanning: false,
    maxPolarAngle: Math.PI / 2
  },
  canvas: {
    width: 400,
    height: 400
  },
  renderer: {
    antialias: true,
    alpha: true,
    clearColor: 0x000000,
    clearAlpha: 0 // Transparent background
  }
};

const model4Config = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    zoomFactor: 1.5,  // Adjust this factor to zoom in/out
    position: { x: 0, y: 2, z: 20 }
  },
  ambientLight: {
    color: 0xffffff,
    intensity: 1
  },
  directionalLight: {
    color: 0xffffff,
    intensity: 1,
    position: { x: 5, y: 10, z: 7.5 }
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    screenSpacePanning: false,
    maxPolarAngle: Math.PI / 2
  },
  canvas: {
    width: 1000,
    height: 1000
  },
  renderer: {
    antialias: true,
    alpha: true,
    clearColor: 0x000000,
    clearAlpha: 1 // Transparent background
  }
};

function App() {
  return (
    <div className="App">
      <h1>3D Model Viewer</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap:'wrap' }}>
        <ModelViewer modelPath="/models/model.glb" containerId="model1" config={model1Config} />
        <ModelViewer modelPath="/models/Rampaging T-Rex.glb" containerId="model2" config={model2Config} />
        <ModelViewer modelPath="/models/sci_-_fi_buggy.glb" containerId="model3" config={model3Config} />
        <ModelViewer modelPath="/models/sci-fi_lab (1).glb" containerId="model4" config={model4Config} />
      </div>
    </div>
  );
}

export default App;
