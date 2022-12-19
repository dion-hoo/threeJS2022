import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import colorImage from './textures/checkerboard-8x8.png';
import alphaImage from './textures/door/alpha.jpg';
import heightImage from './textures/door/height.jpg';
import normalImage from './textures/door/normal.jpg';
import ambientOcclusionImage from './textures/door/ambientOcclusion.jpg';
import metalnessImage from './textures/door/metalness.jpg';
import roughnessImage from './textures/door/roughness.jpg';

const canvas = document.querySelector('.webgl');
const size = {
    width: innerWidth,
    height: innerHeight,
};

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//     console.log('started');
// };
// loadingManager.onLoad = () => {
//     console.log('onloaded');
// };
// loadingManager.onProgress = () => {
//     console.log('progress');
// };

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(colorImage);
const alphTexture = textureLoader.load(alphaImage);
const heightTexture = textureLoader.load(heightImage);
const normalTexture = textureLoader.load(normalImage);
const ambientOcclusionTexture = textureLoader.load(ambientOcclusionImage);
const metalnessTexture = textureLoader.load(metalnessImage);
const roughnessTexture = textureLoader.load(roughnessImage);

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// colorTexture.rotation = Math.PI / 2;

colorTexture.generateMipmaps = false;

colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
camera.position.z = 3;
// camera.position.x = 1;
camera.position.y = 3;

// controls
const controls = new OrbitControls(camera, canvas);

scene.add(camera);

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// render
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(size.width, size.height);

// resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
});

// animate
const animate = () => {
    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(animate);
};
animate();
