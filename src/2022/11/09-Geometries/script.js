import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('.webgl');
const size = {
    width: innerWidth,
    height: innerHeight,
};

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
camera.position.z = 3;

// controls
const controls = new OrbitControls(camera, canvas);

// geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);

const geometry = new THREE.BufferGeometry();
const count = 50000;
const positionArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 4;
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute('position', positionAttribute);

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(size.width, size.height);

const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    controls.update();
};
animate();

window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
});
