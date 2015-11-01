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

  getIntersectionWithZ(mousePos, z) {
    const mouseX = (mousePos.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mousePos.y / window.innerHeight) * 2 + 1;
    const planePos = new THREE.Vector3(0, 0, z);
    const planeNormal = new THREE.Vector3(0, 0, 1);
    const origin = new THREE.Vector3().setFromMatrixPosition(this.camera.matrixWorld);
    const direction = new THREE.Vector3(mouseX, mouseY, 0.5).unproject(this.camera).sub(origin).normalize();
    const distance = - this.camera.position.clone().sub(planePos).dot(planeNormal) / direction.dot(planeNormal);
    return this.camera.position.clone().add(direction.multiplyScalar(distance));
  }

  _renderLoop() {
    this._renderer.render(this._scene, this.camera);
    requestAnimationFrame(::this._renderLoop);
  }
}

export default Render;
