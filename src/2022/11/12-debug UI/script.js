import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lil from 'lil-gui';
import gsap from 'gsap';

const canvas = document.querySelector('.webgl');
const size = {
    width: innerWidth,
    height: innerHeight,
};

/**
 * Debug
 */
const gui = new lil.GUI();
const paremeter = {
    color: 0x00ff00,
    spin: () => {
        gsap.to(mesh.rotation, {
            y: mesh.rotation.y + Math.PI * 2,
            duration: 1,
        });
    },
};

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;

// controls
const controls = new OrbitControls(camera, canvas);

const geomatry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: paremeter.color,
});
const mesh = new THREE.Mesh(geomatry, material);
scene.add(mesh);

// debug
gui.add(mesh.position, 'x', -3, 3, 0.01);
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('change height');
gui.add(mesh.position, 'z', -3, 3, 0.01);
gui.add(mesh, 'visible').name('IsVisible');
gui.add(material, 'wireframe');
gui.addColor(paremeter, 'color').onChange(() => {
    material.color.set(paremeter.color);
});
gui.add(paremeter, 'spin');

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

window.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        if (gui._hidden) {
            gui.show();
        } else {
            gui.hide();
        }
    }
});
