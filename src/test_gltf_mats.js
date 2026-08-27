import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function inspectOriginalMaterials() {
  const filePath = path.resolve(__dirname, '../public/ring_ornament_3.glb');
  const buffer = fs.readFileSync(filePath);
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

  const loader = new GLTFLoader();
  loader.parse(arrayBuffer, '', (gltf) => {
    console.log("=== GLTF Original Materials in ring3.glb ===");
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        console.log(`Mesh "${child.name}": matType=${child.material.type}, matName="${child.material.name}", color=${child.material.color ? child.material.color.getHexString() : 'none'}, metalness=${child.material.metalness}, roughness=${child.material.roughness}`);
      }
    });
  });
}

inspectOriginalMaterials();
