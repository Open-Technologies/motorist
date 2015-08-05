var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('click', function () {
  raycaster.setFromCamera(mouse, camera);
  var nPos = new THREE.Vector3(0, 0, 0);
  var n = new THREE.Vector3(0, 0, 1);
  var rayPos = raycaster.ray.origin.clone();
  var ray = raycaster.ray.direction.clone();
  var t = - rayPos.sub(nPos).dot(n) / ray.dot(n);
  var p = rayPos.add(ray.multiplyScalar(t));
  p.x = Math.floor(p.x + 0.5);
  p.y = Math.floor(p.y + 0.5);
  console.log(p);
  addPlane(p);
}, false);

var materials = {
  GTATIL1_204: new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('textures/GTATIL1_204.bmp')})
};

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function addPlane(pos) {
  var object = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), materials.GTATIL1_204);
  object.position.copy(pos);
  scene.add(object);
}


camera.position.z = 5;

var render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
}

render();
