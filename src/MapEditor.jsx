import React from 'react';
import Render from './Render';
import materials from './materials';

const WHEEL_ZOOM_SENSITIVITY = 0.01;
const WHEEL_ZOOM_MIN_LIMIT = 2;
const WHEEL_ZOOM_MAX_LIMIT = 25;
const MOUSE_DRAG_MIN_OFFSET = 10;
const tiles = [
  'GTATIL1_197', 'GTATIL1_198', 'GTATIL1_199', 'GTATIL1_200', 'GTATIL1_201', 'GTATIL1_202', 'GTATIL1_204',
  'GTATIL1_206', 'GTATIL1_209', 'GTATIL1_212', 'GTATIL1_219', 'GTATIL1_220', 'GTATIL1_221', 'GTATIL1_233',
  'GTATIL1_234', 'GTATIL1_247', 'GTATIL1_250', 'GTATIL1_254', 'GTATIL1_265', 'GTATIL1_266', 'GTATIL1_270',
  'GTATIL1_271', 'GTATIL1_272', 'GTATIL1_274', 'GTATIL1_275', 'GTATIL1_276', 'GTATIL1_277', 'GTATIL1_278',
  'GTATIL1_279', 'GTATIL1_280', 'GTATIL1_289', 'GTATIL1_291', 'GTATIL1_294', 'GTATIL1_295', 'GTATIL1_303',
  'GTATIL1_304', 'GTATIL1_315', 'GTATIL1_316', 'GTATIL1_322', 'GTATIL1_323', 'GTATIL1_329', 'GTATIL1_330',
  'GTATIL1_331', 'GTATIL1_338'
];

const MapEditor = React.createClass({
  getInitialState() {
    return {
      render: null,
      rollOverPos: null,
      rollOverObject: null,
      prevMousePos: null,
      dragging: false
    };
  },
  componentDidMount() {
    this.state.render = new Render();
    this.state.render.camera.position.z = 5;
    this.state.render.domElement.addEventListener('mousemove', this.onMouseMove);
    this.state.render.domElement.addEventListener('mouseout', this.onMouseOut);
    this.state.render.domElement.addEventListener('wheel', this.onWheel);
    this.state.render.domElement.addEventListener('mousedown', this.onMouseDown);
    this.state.render.domElement.addEventListener('mouseup', this.onMouseUp);
  },
  componentWillUnmount() {
    this.state.render.domElement.removeEvenListener('mousemove', this.onMouseMove);
    this.state.render.domElement.removeEvenListener('mouseout', this.onMouseOut);
    this.state.render.domElement.removeEvenListener('wheel', this.onWheel);
    this.state.render.domElement.removeEvenListener('mousedown', this.onMouseDown);
    this.state.render.domElement.removeEvenListener('mouseup', this.onMouseUp);
  },
  onMouseMove(e) {
    if (this.state.prevMousePos) {
      const mousePos = new THREE.Vector2(e.clientX, e.clientY);

      // Start dragging the camera if the displacement exceeds the limit
      if (!this.state.dragging) {
        const mouseOffset = this.state.prevMousePos.clone().sub(mousePos).length();
        this.state.dragging = mouseOffset >= MOUSE_DRAG_MIN_OFFSET;
      }

      if (this.state.dragging) {
        // Move the camera
        const prevItersection = this.state.render.getIntersectionWithZ(this.state.prevMousePos, 0);
        const intersection = this.state.render.getIntersectionWithZ(mousePos, 0);
        const offset = prevItersection.sub(intersection);
        this.state.render.camera.position.add(offset);
        this.state.prevMousePos = mousePos;
        this.state.dragging = true;
        this.removeRollOverObject();
        return;
      }
    }

    // Create if not exist
    if (!this.state.rollOverObject) {
      const material = materials.GTATIL1_204.clone();
      material.opacity = 0.5;
      material.transparent = true;
      this.state.rollOverObject = this.state.render.addTile({material});
    }

    // Update position of RollOver object
    this.state.rollOverObject.position.copy(this.getRollOverPos(e));
  },
  onMouseOut() {
    this.removeRollOverObject();
    this.stopCameraDragging();
  },
  onWheel(e) {
    this.state.render.camera.position.z += e.deltaY * WHEEL_ZOOM_SENSITIVITY;
    if (this.state.render.camera.position.z < WHEEL_ZOOM_MIN_LIMIT) {
      this.state.render.camera.position.z = WHEEL_ZOOM_MIN_LIMIT;
    }
    if (this.state.render.camera.position.z > WHEEL_ZOOM_MAX_LIMIT) {
      this.state.render.camera.position.z = WHEEL_ZOOM_MAX_LIMIT;
    }
  },
  onMouseDown(e) {
    this.state.prevMousePos = new THREE.Vector2(e.clientX, e.clientY);
  },
  onMouseUp(e) {
    if (!this.state.dragging) {
      const newTile = this.state.render.addTile({
        material: materials.GTATIL1_204
      });
      newTile.position.copy(this.getRollOverPos(e));
    }
    this.stopCameraDragging();
  },
  getRollOverPos(e) {
    const rollOverPos = this.state.render.getIntersectionWithZ(new THREE.Vector2(e.clientX, e.clientY), 0);
    rollOverPos.x = Math.floor(rollOverPos.x + 0.5);
    rollOverPos.y = Math.floor(rollOverPos.y + 0.5);
    return rollOverPos;
  },
  removeRollOverObject() {
    if (!this.state.rollOverObject) {
      return;
    }
    this.state.render.removeObject(this.state.rollOverObject);
    this.state.rollOverObject = null;
  },
  stopCameraDragging() {
    this.state.prevMousePos = null;
    this.state.dragging = false;
  },
  render() {
    return (
      <div className="tileMenu">
        {tiles.map((tileName, key) => {
          const src = 'images/textures/' + tileName + '.bmp';
          return <img className="tileMenu__tile" src={src} key={key}/>;
        })}
        <div className="clear"/>
      </div>
    );
  }
});

export default MapEditor;
