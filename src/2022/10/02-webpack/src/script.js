import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();

const geomery = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#f00' });
const mesh = new THREE.Mesh(geomery, material);
scene.add(mesh);

const sizes = {
    width: innerWidth,
    height: innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
