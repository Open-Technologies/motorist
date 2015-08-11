class Render {
  constructor() {
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this._renderer = new THREE.WebGLRenderer();

    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.setClearColor(0xffffff);

    document.body.appendChild(this._renderer.domElement);

    this._renderLoop();
  }

  _renderLoop() {
    requestAnimationFrame(::this._renderLoop);
    this._renderer.render(this._scene, this._camera);
  }
}

export default Render;
