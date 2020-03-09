// THREE.JS SCRIPT___________________________________________________________________



// renderer
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight); //set size of renderer to window size
renderer.setClearColor(0xffffff, 0) //set renderer color to alpha
document.body.appendChild(renderer.domElement); //create canvas



// scene
var scene = new THREE.Scene();
//fog
// var fog = new THREE.Fog(0x11111f, 0.002);

//particle
// var floatGeo = new THREE.Geometry();
// for (let i = 0; i < 64; i++) {
//   floatDrop = new THREE.Vector3(
//     Math.random() * 400 - 200,
//     Math.random() * 500 - 250,
//     Math.random() * 400 - 200,
//   );
//   floatGeo.vertices.push(floatDrop);
// }

// floatMaterial = new THREE.PointsMaterial({
//   color: 0xaaaaaa,
//   size: 0.1,
//   transparent: true
// });
// var floaty = new THREE.Points(floatGeo, floatMaterial)
// scene.add(floaty);

// camera
var camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 3000);
// var camera = new THREE.OrthographicCamera(window.innerWidth / -2, 4 / 2, 4 / 2,  window.innerHeight / -2, 1, 1000);

//ambient light
ambient = new THREE.AmbientLight(0x555555);
scene.add(ambient);
directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0, 0, 1);
scene.add(directionalLight);

// controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.25;
controls.enablePan = true;
controls.enableZoom = true;
controls.enableDamping = true;
// controls.minPolarAngle = 0.8;
// controls.maxPolarAngle = 0.4;
controls.dampingFactor = 0.07;
controls.rotateSpeed = 0.8;


// manual camera adjust
camera.position.set(0, 0, -550); //for perpective
//camera.position.set(512, 512, -512); //for orto

controls.update(); //controls.update() must be called after any manual changes to the camera's transform

// object1
var TetrahedronGeometry = new THREE.TetrahedronGeometry(7, 0); //object1 geometry
var material1 = new THREE.MeshNormalMaterial(); //object1 material
// var mesh1 = new THREE.Mesh(geometry1, material1); //object1 mesh
// scene.add(mesh1); //add object1 to scene

// cloner
var objArray = [];
for (let i = 0; i <= 64; i++) {
  var meshes = new THREE.Mesh(TetrahedronGeometry, material1);
  meshes.position.set(i - 10, i + 10, i + 10);
  // meshes.scale.x = Math.random(8) + 0.5;
  // meshes.scale.y = Math.random(8) + 0.5;
  // meshes.scale.z = Math.random(8) + 0.5;

  if (i == 0) {
    scene.add(meshes);
    var primeMesh = meshes;
    objArray.push(meshes);
  } else {
    primeMesh.add(meshes);
    primeMesh = meshes;
    objArray.push(meshes);
  }
}

//particle cloner
for (var i = 0; i < 1024; i++) {
  var object = new THREE.Mesh(TetrahedronGeometry, material1);
  object.position.x = Math.random() * 1024 - 512;
  object.position.y = Math.random() * 1024 - 512;
  object.position.z = Math.random() * 1024 - 512;
  object.rotation.x = Math.random() * 2 * Math.PI;
  object.rotation.y = Math.random() * 2 * Math.PI;
  object.rotation.z = Math.random() * 2 * Math.PI;
  // object.scale.x = Math.random() + 0.5;
  // object.scale.y = Math.random() + 0.5;
  // object.scale.z = Math.random() + 0.5;
  scene.add(object);
}

// animate function
function animate() {

  // auto resize canvas by listening to window resize event
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })

  requestAnimationFrame(animate);

  controls.update(); //controls.update() must be called after any manual changes to the camera's transform

  // golden ratio animation
  var div = 512;
  for (var x = 0; x < objArray.length; x++) {
    objArray[x].rotation.x += Math.PI / (div * 2);
    objArray[x].rotation.y += Math.PI / (div * 4);
    objArray[x].rotation.z += Math.PI / (div * 8);
  }


  renderer.render(scene, camera);
};

animate();