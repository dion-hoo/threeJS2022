import * as THREE from 'three';
import gsap from 'gsap';

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
    color: 0x00ff00,
});
const lineMesh = new THREE.LineSegments(wireGeomatry, LineMaterial);

const group = new THREE.Group();

group.add(mesh, lineMesh);
scene.add(group);

// Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

// anmimations
const animation = () => {
    renderer.render(scene, camera);

    requestAnimationFrame(animation);
};
animation();

// resize
window.onresize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(innerWidth, innerHeight);
};
