// src/components/ModelViewer.jsx
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelViewer = ({ modelPath, containerId, config }) => {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return; // If container is not found, exit early

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      config.camera.fov,
      container.clientWidth / container.clientHeight,
      config.camera.near,
      config.camera.far
    );

    // Create the renderer using the configuration object
    const renderer = new THREE.WebGLRenderer({
      antialias: config.renderer.antialias,
      alpha: config.renderer.alpha,
    });

    // Set the renderer size and other properties from the configuration
    renderer.setSize(config.canvas.width, config.canvas.height);
    container.appendChild(renderer.domElement);
    renderer.setClearColor(config.renderer.clearColor, config.renderer.clearAlpha);

    const ambientLight = new THREE.AmbientLight(config.ambientLight.color, config.ambientLight.intensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(config.directionalLight.color, config.directionalLight.intensity);
    directionalLight.position.set(
      config.directionalLight.position.x,
      config.directionalLight.position.y,
      config.directionalLight.position.z
    ).normalize();
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = config.controls.enableDamping;
    controls.dampingFactor = config.controls.dampingFactor;
    controls.screenSpacePanning = config.controls.screenSpacePanning;
    controls.maxPolarAngle = config.controls.maxPolarAngle;

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Calculate the bounding box of the model
        const boundingBox = new THREE.Box3().setFromObject(model);
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());

        // Position the model at the origin (0, 0, 0)
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Position the camera based on the size of the model
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

        // Ensure the camera is far enough to see the whole model
        cameraZ *= config.camera.zoomFactor || 1.5; // Add some padding

        camera.position.set(0, 0, cameraZ);
        camera.lookAt(0, 0, 0);

        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      renderer.dispose();
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
    };
  }, [modelPath, containerId, config]);

  return (
    <div
      id={containerId}
      style={{ width: `${config.canvas.width}px`, height: `${config.canvas.height}px` }}
    ></div>
  );
};

export default ModelViewer;
