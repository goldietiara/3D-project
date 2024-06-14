import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

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
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

//MESH by combining geometry and material
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//LIGHTNING
//Point = light based on position
const pointLight = new THREE.PointLight(0xffffff, 150, 100); // 0x = hexadecimal literal
pointLight.position.set(0, 0, 0);

//Ambient = light everything in the scene equaly
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(pointLight, ambientLight);

//Helper = showing the position of the light
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function randomStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  //generate random number for xyz position on range of -100 to 100
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

//adding 200 random star
Array(200).fill().forEach(randomStar);

// //background texture
// const spaceTexture = new THREE.TextureLoader().load("sky.jpg");
// scene.background = spaceTexture;

//avatar object
const profilePictTexture = new THREE.TextureLoader().load("profile-pict.jpg");

//texture mapping
const profilePict = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: profilePictTexture })
);
scene.add(profilePict);

//cloud object
const cloudTexture = new THREE.TextureLoader().load("cloud-1.jpg");

//texture mapping
const cloud = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: cloudTexture,
    // normalMap:
  })
);
scene.add(cloud);
cloud.position.z = 30;
cloud.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  cloud.rotation.x += 0.05;
  cloud.rotation.y += 0.075;
  cloud.rotation.z += 0.05;

  profilePict.rotation.y += 0.01;
  profilePict.rotation.z += 0.01;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.01;
  camera.position.z = t * -0.0002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
