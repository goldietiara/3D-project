import "./style.css";
import * as THREE from "three";
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

//SCENE = container
const scene = new THREE.Scene();

//CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
); // (field of view based of 360, aspect ratio, view frustum to control which object are visible based to the camera it self )

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // make it full screen
camera.position.setZ(30);
renderer.render(scene, camera);
