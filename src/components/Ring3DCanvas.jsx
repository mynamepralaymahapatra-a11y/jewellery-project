import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export default function Ring3DCanvas() {
  const mountRef = useRef(null);
  const ringGroupRef = useRef(null);
  const modelPivotRef = useRef(null);
  const controlsRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup — Moved back (Z=16.5) and shifted target slightly down for clean top clearance
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 16.5);
    camera.lookAt(0, -0.3, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 4. HDRI Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment(renderer);
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

    // Clear previous DOM
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 5. OrbitControls for smooth continuous turntable Y-axis auto-spin
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disabled zoom overlay for clean production UX
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.5; // Smooth continuous 360-degree turntable Y-axis spin
    controlsRef.current = controls;

    // 6. Outer 3D Group
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);
    ringGroupRef.current = ringGroup;

    // 7. Load Real GLB 3D Gold Ring Model
    const loader = new GLTFLoader();
    loader.load(
      '/ring_model.glb',
      (gltf) => {
        const rawModel = gltf.scene;

        // Compute Bounding Box & Center Model
        const box = new THREE.Box3().setFromObject(rawModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center Geometry at origin (0, 0, 0)
        rawModel.position.x = -center.x;
        rawModel.position.y = -center.y;
        rawModel.position.z = -center.z;

        // Orient Model so circular face ("donut hole") faces camera
        rawModel.rotation.set(0, Math.PI / 2, 0);

        // Container Pivot for 18-degree display case tilt & vertical shift
        const modelPivot = new THREE.Group();
        modelPivot.add(rawModel);
        modelPivotRef.current = modelPivot;

        // Shift model down slightly (-0.35) so top edge has ample clearance from top border & bubble balls
        modelPivot.position.y = -0.35;

        // 18-degree forward tilt
        modelPivot.rotation.x = 0.32;
        modelPivot.rotation.z = -0.08;

        // Reduced scale factor by another 20% (1.05 / maxDim) for ample margins
        const maxDim = Math.max(size.x, size.y, size.z);
        const compactScale = maxDim > 0 ? (1.05 / maxDim) : 0.35;
        modelPivot.scale.set(compactScale, compactScale, compactScale);

        // Apply Ultra-Realistic 18K Gold PBR Material Override
        const goldMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xd4af37), // Warm 18K Gold (#D4AF37)
          metalness: 0.96,
          roughness: 0.15,
          envMapIntensity: 4.5
        });

        rawModel.traverse((child) => {
          if (child.isMesh) {
            child.geometry.computeVertexNormals();
            child.material = goldMaterial;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        ringGroup.add(modelPivot);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.warn('Fallback gold model', error);
        const fallbackGroup = new THREE.Group();
        fallbackGroup.position.y = -0.35;
        fallbackGroup.rotation.x = 0.32;

        const bandGeo = new THREE.TorusGeometry(0.7, 0.12, 32, 100);
        const goldMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xd4af37),
          metalness: 0.96,
          roughness: 0.15,
          envMapIntensity: 4.5
        });
        const bandMesh = new THREE.Mesh(bandGeo, goldMat);
        fallbackGroup.add(bandMesh);
        ringGroup.add(fallbackGroup);
        setLoading(false);
      }
    );

    // 8. Studio 3-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd1, 3.8);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const fillGoldLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    fillGoldLight.position.set(-6, -3, -4);
    scene.add(fillGoldLight);

    const rimLight = new THREE.PointLight(0xffffff, 3.0, 25);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // 9. Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    // 10. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      pmremGenerator.dispose();
      roomEnv.dispose();
      controls.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span>LOADING 3D GOLD RING...</span>
          </div>
        </div>
      )}

      {/* Clean Production 3D Canvas (Zero Debug Control Panels) */}
      <div 
        ref={mountRef} 
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
