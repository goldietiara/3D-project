import { OrbitControls } from "three/examples/jsm/Addons.js";
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

///// ADDING OBJECT
//GEOMETRY {the x,y,z points that makeup a shape}
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

//MATERIAL like the wrapping paper for an object
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

//MESH by combining geometry and material
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//LIGHTNING

//Point = light based on position
const pointLight = new THREE.PointLight(0xffffff); // 0x = hexadecimal literal
pointLight.position.set(5, 5, 5);

//Ambient = light everything in the scene equaly
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Helper = showing the position of the light
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//GRID

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
