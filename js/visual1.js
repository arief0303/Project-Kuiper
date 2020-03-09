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
  
  // camera
  var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
  
 
  
  
  
  // manual camera adjust
  camera.position.set(0, 0, -0.5);
  controls.update(); //controls.update() must be called after any manual changes to the camera's transform
  
  // object1
  var geometry1 = new THREE.TetrahedronGeometry(1.5, 0); //object1 geometry
  var material1 = new THREE.MeshNormalMaterial(); //object1 material
  // var mesh1 = new THREE.Mesh(geometry1, material1); //object1 mesh
  // scene.add(mesh1); //add object1 to scene
  
  // cloner
  var objArray = [];
  for (let i = 0; i <= 16; i++) {
    var meshes = new THREE.Mesh(geometry1, material1);
    meshes.position.set(i - 5, i, i);
    
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
  
  // auto resize canvas by listening to window resize event
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })
  
  // animate function
  function animate() {
    requestAnimationFrame(animate);
  
    controls.update(); //controls.update() must be called after any manual changes to the camera's transform
  
    // golden ratio animation
    var div = 512;
    for (var x = 0; x < objArray.length; x++) {
      objArray[x].rotation.x += Math.PI / (div*2);
      objArray[x].rotation.y += Math.PI / (div*6);
      objArray[x].rotation.z += Math.PI / (div*6);
    }
  
    renderer.render(scene, camera);
  };
  
  animate();
  
  console.log(scene);