class Render {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this._scene = new THREE.Scene();
    this._renderer = new THREE.WebGLRenderer();

    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.setClearColor(0xffffff);

    document.body.appendChild(this._renderer.domElement);

    this._renderLoop();
  }

  get domElement() {
    return this._renderer.domElement;
  }

  addTile(options) {
    const object = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), options.material);
    this._scene.add(object);
    return object;
  }

  removeObject(object) {
    this._scene.remove(object);
  }

  getIntersectionWithZ(mouseX, mouseY, z) {
    const mouse = new THREE.Vector2(
      (mouseX / window.innerWidth) * 2 - 1,
      -(mouseY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    var nPos = new THREE.Vector3(0, 0, z);
    var n = new THREE.Vector3(0, 0, 1);
    var rayPos = raycaster.ray.origin.clone();
    var ray = raycaster.ray.direction.clone();
    var t = - rayPos.sub(nPos).dot(n) / ray.dot(n);
    var p = rayPos.add(ray.multiplyScalar(t));
    return p;
  }

  _renderLoop() {
    requestAnimationFrame(::this._renderLoop);
    this._renderer.render(this._scene, this.camera);
  }
}

export default Render;
