import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const cursor = {
    x: 0,
    y: 0,
};

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
});

const canvas = document.querySelector('.webgl');
const sizes = {
    width: innerWidth,
    height: innerHeight,
};

// Scene
const scene = new THREE.Scene();

// geomatry
const geomatry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    emissive: 0xff0000,
});
const mesh = new THREE.Mesh(geomatry, material);

const wireGeomatry = new THREE.WireframeGeometry(geomatry);
const LineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
});
const lineMesh = new THREE.LineSegments(wireGeomatry, LineMaterial);

const group = new THREE.Group();

group.add(mesh, lineMesh);
scene.add(group);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

// anmimations
const clock = new THREE.Clock();
const animation = () => {
    renderer.render(scene, camera);

    const delta = clock.getDelta();

    //  group.rotation.y += delta;

    // update Camre
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;

    // camera.lookAt(mesh.position);

    // update Controls
    controls.update();

    requestAnimationFrame(animation);
};
animation();

// resize
window.onresize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight);
};
