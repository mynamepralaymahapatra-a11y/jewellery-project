import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import ring1Url from '../assets/models/ring_ornament_1.glb?url';
import ring2Url from '../assets/models/ring_ornament_2.glb?url';
import ring3Url from '../assets/models/ring_ornament_3.glb?url';

export default function Ring3DCanvas() {
  const mountRef = useRef(null);
  const ringGroupRef = useRef(null);
  const controlsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [activeModelIndex, setActiveModelIndex] = useState(0);

  // Model files list from 66-ring ornament: Calibrated model scales & rotations
  const modelConfigs = [
    {
      id: 'ring_shader_pos1',
      name: 'ORNAMENT POS 1',
      url: ring1Url,
      explicitScale: 0.38, // Model 1: Completely UNCHANGED
      positionY: -0.18,
      rawRotation: [0, Math.PI / 2, 0]
    },
    {
      id: 'vers4_men_design',
      name: 'MEN DESIGN 4',
      url: ring2Url,
      explicitScale: 0.12, // Model 2: Completely UNCHANGED
      positionY: -0.18,
      rawRotation: [0, Math.PI / 2, 0]
    },
    {
      id: 'ring3_design',
      name: 'RING 3 DESIGN',
      url: ring3Url,
      explicitScale: 0.09, // Model 3: Calibrated scale to match Model 1 & 2 proportion
      positionY: -0.18,
      rawRotation: [-Math.PI / 2, 0, Math.PI / 2] // Standing vertically upright facing camera with crown stone at top
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup — Positioned for clean framing of gold ring models
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    camera.position.set(0, 0.25, 7.4);
    camera.lookAt(0, -0.15, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 4. HDRI Studio Environment & Directional Studio Spotlights for Diamond Sparkle
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment(renderer);
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

    // Add high-intensity directional studio lights to generate bright facet glints & specular highlights
    const diamondKeyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    diamondKeyLight.position.set(4, 7, 6);
    scene.add(diamondKeyLight);

    const diamondFillLight = new THREE.DirectionalLight(0xfff8ee, 2.5);
    diamondFillLight.position.set(-4, 4, 4);
    scene.add(diamondFillLight);

    // Dedicated point light focused directly on the top diamond gemstone crown for sparkling highlights
    const diamondGlintLight = new THREE.PointLight(0xffffff, 6.0, 15);
    diamondGlintLight.position.set(0, 1.8, 3.0);
    scene.add(diamondGlintLight);

    // Clear previous DOM
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 5. OrbitControls for smooth continuous turntable Y-axis auto-spin
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.5;
    controlsRef.current = controls;

    // 6. Outer 3D Group
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);
    ringGroupRef.current = ringGroup;

    // Cache preprocessed 3D pivot nodes for instant 5-second switching
    const loadedPivots = {};
    const loader = new GLTFLoader();

    // Helper to generate a 4-point star flare texture dynamically via Canvas2D
    const createSparkleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');

      // Soft glowing central core
      const radial = ctx.createRadialGradient(64, 64, 0, 64, 64, 50);
      radial.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      radial.addColorStop(0.2, 'rgba(255, 250, 240, 0.85)');
      radial.addColorStop(0.5, 'rgba(230, 210, 160, 0.25)');
      radial.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, 128, 128);

      // Main horizontal light streak
      const gradH = ctx.createLinearGradient(0, 64, 128, 64);
      gradH.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradH.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
      gradH.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradH;
      ctx.fillRect(0, 62, 128, 4);

      // Main vertical light streak
      const gradV = ctx.createLinearGradient(64, 0, 64, 128);
      gradV.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradV.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
      gradV.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradV;
      ctx.fillRect(62, 0, 4, 128);

      // Diagonal subtle light streaks
      ctx.save();
      ctx.translate(64, 64);
      ctx.rotate(Math.PI / 4);
      const gradD = ctx.createLinearGradient(-40, 0, 40, 0);
      gradD.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradD.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
      gradD.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradD;
      ctx.fillRect(-40, -1, 80, 2);
      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Helper to process GLB model geometry
    const processGltfModel = (gltf, config) => {
      const rawModel = gltf.scene;

      // 1. Ultra-Realistic Crystal Diamond Material (High Optical Clarity, Refraction & Prismatic Fire)
      const diamondMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffffff),
        transmission: 0.95,                // 95% crystal clarity
        thickness: 0.5,                    // Calibrated facet thickness
        ior: 2.417,                        // Diamond Index of Refraction
        roughness: 0.0,                    // Zero roughness for crystal sharpness
        metalness: 0.0,
        reflectivity: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        specularIntensity: 8.0,            // Razor-sharp specular facet glints
        specularColor: new THREE.Color(0xffffff),
        dispersion: 0.15,                  // Chromatic rainbow spectrum fire glints
        envMapIntensity: 18.0,             // Studio environment reflections for diamond sparkle
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1.0,
        depthWrite: false
      });

      // 2. High-Luxury 18K Polish Gold Material for Model 1 & 2 Ring Bands
      const goldMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xefc85a),   // Authentic Warm 18K Luxury Gold (rich warm golden metallic shine)
        metalness: 0.96,                    // High metallic reflectivity
        roughness: 0.05,                    // Ultra-smooth mirror polish for jewelers
        envMapIntensity: 6.0,               // High studio HDRI reflections
        side: THREE.DoubleSide
      });

      // 3. High-Contrast Polished Dark Platinum / Titanium Metallic Material for Model 3 Ring Band
      const silverMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x788090),   // High-contrast deep metallic platinum grey tone for crystal diamond distinction
        metalness: 0.96,                    // High metallic sheen
        roughness: 0.08,                    // Smooth mirror polish
        envMapIntensity: 5.5,               // Environment reflections
        side: THREE.DoubleSide
      });

      // Clean CAD export degenerate spike vertices in rawModel sub-meshes (removes inner hole spike)
      rawModel.traverse((child) => {
        if (child.isMesh && child.geometry && child.geometry.attributes.position) {
          const posAttr = child.geometry.attributes.position;
          let cleaned = false;
          for (let i = 0; i < posAttr.count; i++) {
            const x = posAttr.getX(i);
            const y = posAttr.getY(i);
            const z = posAttr.getZ(i);
            if (Math.abs(x) < 0.15 && Math.abs(y) < 0.15 && Math.abs(z) < 2.0) {
              const neighborIdx = (i > 0) ? (i - 1) : (i + 1);
              posAttr.setXYZ(i, posAttr.getX(neighborIdx), posAttr.getY(neighborIdx), posAttr.getZ(neighborIdx));
              cleaned = true;
            }
          }
          if (cleaned) {
            posAttr.needsUpdate = true;
            child.geometry.computeVertexNormals();
          }
        }
      });

      // Traverse sub-meshes: Assign diamondMaterial strictly to gemstone parts
      let meshIdx = 0;
      rawModel.traverse((child) => {
        if (child.isMesh && child.geometry) {
          child.geometry.computeBoundingBox();
          const box = child.geometry.boundingBox;

          let isDiamondStone = false;
          if (config.id === 'ring_shader_pos1') {
            isDiamondStone = (box && box.min.y > 3.0);
          } else if (config.id === 'ring3_design') {
            // Meshes 6..25 (20 left micro-pave), 30..49 (20 right micro-pave), and 51 (Main Solitaire) are diamonds!
            // Meshes 0..5 (6 Platinum Prongs marked by user), 26..29 (Shoulders), 50 (Shank), 52..53 (Basket) are Solid Platinum!
            isDiamondStone = (meshIdx >= 6 && meshIdx <= 25) || 
                             (meshIdx >= 30 && meshIdx <= 49) || 
                             (meshIdx === 51);
          } else {
            isDiamondStone = child.name.toLowerCase().includes('diamond') || 
                             child.name.toLowerCase().includes('gem');
          }

          if (isDiamondStone) {
            child.material = diamondMaterial;
          } else {
            // Model 1 and Model 3 use Solid Platinum 950 Silver, Model 2 uses 18K Gold
            child.material = (config.id === 'ring_shader_pos1' || config.id === 'ring3_design') ? silverMaterial : goldMaterial;
          }

          child.castShadow = true;
          child.receiveShadow = true;
          meshIdx++;
        }
      });

      // Attach billboarded star flare sparkle sprite to diamond crown for solitaire Model 1 & 3
      let sparkleSprite = null;
      if (config.id === 'ring_shader_pos1' || config.id === 'ring3_design') {
        const sparkleTexture = createSparkleTexture();
        const sparkleMaterial = new THREE.SpriteMaterial({
          map: sparkleTexture,
          blending: THREE.AdditiveBlending,
          transparent: true,
          opacity: 0.0,
          depthTest: false
        });
        sparkleSprite = new THREE.Sprite(sparkleMaterial);
        sparkleSprite.position.set(0, 3.4, 0.45);
        sparkleSprite.scale.set(1.2, 1.2, 1.0);
        rawModel.add(sparkleSprite);
      }

      // 1. Set rawModel base rotation FIRST
      if (config.rawRotation) {
        rawModel.rotation.set(config.rawRotation[0], config.rawRotation[1], config.rawRotation[2]);
      } else {
        rawModel.rotation.set(0, Math.PI / 2, 0);
      }
      rawModel.updateMatrixWorld(true);

      // 2. Compute bounding box AFTER base rotation so model is centered 100% perfectly in 3D world space
      const box = new THREE.Box3().setFromObject(rawModel);
      const center = new THREE.Vector3();
      box.getCenter(center);

      if (isFinite(center.x)) rawModel.position.x = -center.x;
      if (isFinite(center.y)) rawModel.position.y = -center.y;
      if (isFinite(center.z)) rawModel.position.z = -center.z;

      const modelPivot = new THREE.Group();
      modelPivot.add(rawModel);
      modelPivot.position.y = config.positionY || -0.18;
      modelPivot.rotation.x = 0.32;
      modelPivot.rotation.z = -0.08;

      // Set explicit scale directly
      const scaleVal = config.explicitScale || 0.35;
      modelPivot.scale.set(scaleVal, scaleVal, scaleVal);

      if (sparkleSprite) {
        modelPivot.userData.sparkleSprite = sparkleSprite;
      }

      return modelPivot;
    };

    let currentIndex = 0;

    // Show model in scene
    const displayPivot = (index) => {
      if (!ringGroupRef.current) return;

      // Clear existing models in ringGroup
      while (ringGroupRef.current.children.length > 0) {
        ringGroupRef.current.remove(ringGroupRef.current.children[0]);
      }

      const pivot = loadedPivots[index];
      if (pivot) {
        ringGroupRef.current.add(pivot);
      }
      currentIndex = index;
      setActiveModelIndex(index);
    };

    // Preload ALL models simultaneously on mount
    modelConfigs.forEach((cfg, idx) => {
      loader.load(
        cfg.url,
        (gltf) => {
          const pivot = processGltfModel(gltf, cfg);
          loadedPivots[idx] = pivot;
          if (idx === 0) {
            displayPivot(0);
            setLoading(false);
          }
        },
        undefined,
        (err) => console.warn(`Error loading model ${idx}:`, err)
      );
    });

    // 5-Second Interval Looper: Switches between models in a continuous loop
    const switchInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % modelConfigs.length;
      
      if (loadedPivots[nextIndex]) {
        displayPivot(nextIndex);
      } else {
        loader.load(
          modelConfigs[nextIndex].url,
          (gltf) => {
            const pivot = processGltfModel(gltf, modelConfigs[nextIndex]);
            loadedPivots[nextIndex] = pivot;
            displayPivot(nextIndex);
          },
          undefined,
          (err) => {
            console.warn(`Error loading model ${nextIndex}, skipping:`, err);
            displayPivot((nextIndex + 1) % modelConfigs.length);
          }
        );
      }
    }, 5000);

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

    // 9. Render Loop with Animated Diamond Star-Flare Sparkle Shimmer
    let animationFrameId;
    let animTime = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      animTime += 0.035;
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Animate star-flare sparkle pulse on active diamond crown
      const activePivot = loadedPivots[currentIndex];
      if (activePivot && activePivot.userData.sparkleSprite) {
        const sprite = activePivot.userData.sparkleSprite;
        // Periodic pulse: sine wave raised to 4th power for realistic flash sweep
        const pulse = Math.pow(Math.max(0, Math.sin(animTime * 1.8)), 4);
        sprite.material.opacity = pulse * 0.95;
        const currentScale = 1.0 + pulse * 0.8;
        sprite.scale.set(currentScale, currentScale, 1.0);
        sprite.rotation.z = animTime * 0.25; // Gentle rotation of star-flare light streak
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
      clearInterval(switchInterval);
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

      {/* Model Indicator Badge (Hidden via opacity-0) */}
      {!loading && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-0">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
            <span>MODEL {activeModelIndex + 1}/{modelConfigs.length}: {modelConfigs[activeModelIndex].name} (5s LOOP)</span>
          </div>
        </div>
      )}

      {/* Clean Production 3D Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
