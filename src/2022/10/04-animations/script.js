import * as THREE from 'three';
import gsap from 'gsap';

const canvas = document.querySelector('.webgl');
const sizes = {
    width: innerWidth,
    height: innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 3;

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
});

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

renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

gsap.to(group.position, { x: 2, duration: 1, delay: 1 });
gsap.to(group.position, { x: -2, duration: 2, delay: 2 });
gsap.to(group.position, { x: 0, duration: 1, delay: 4 });

// anmimations
const animation = () => {
    // const elapseTime = clock.getElapsedTime();

    // group.rotation.x = elapseTime;
    // group.rotation.y = elapseTime * 2;

    // group.position.y = Math.sin(elapseTime);
    // group.position.x = Math.cos(elapseTime);

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
