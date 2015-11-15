import React from 'react';
import THREE from 'three.js';
import render from '../common/render';
import materials from '../common/materials';

const WHEEL_ZOOM_SENSITIVITY = 0.01;
const WHEEL_ZOOM_MIN_LIMIT = 2;
const WHEEL_ZOOM_MAX_LIMIT = 25;
const MOUSE_DRAG_MIN_OFFSET = 10;
const TILE_SIZE = 1;

const MapEditor = React.createClass({
  getInitialState() {
    return {
      rollOverPos: null,
      rollOverObject: null,
      prevMousePos: null,
      dragging: false
    };
  },
  componentDidMount() {
    render.camera.position.z = 5;
    render.domElement.addEventListener('mousemove', this.onMouseMove);
    render.domElement.addEventListener('mouseout', this.onMouseOut);
    render.domElement.addEventListener('wheel', this.onWheel);
    render.domElement.addEventListener('mousedown', this.onMouseDown);
    render.domElement.addEventListener('mouseup', this.onMouseUp);
  },
  componentWillUnmount() {
    render.domElement.removeEvenListener('mousemove', this.onMouseMove);
    render.domElement.removeEvenListener('mouseout', this.onMouseOut);
    render.domElement.removeEvenListener('wheel', this.onWheel);
    render.domElement.removeEvenListener('mousedown', this.onMouseDown);
    render.domElement.removeEvenListener('mouseup', this.onMouseUp);
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
        const prevItersection = render.getIntersectionWithZ(this.state.prevMousePos, 0);
        const intersection = render.getIntersectionWithZ(mousePos, 0);
        const offset = prevItersection.sub(intersection);
        render.camera.position.add(offset);
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
      this.state.rollOverObject = render.addTile({material});
    }

    // Update position of RollOver object
    this.state.rollOverObject.position.copy(this.getRollOverPos(e));
  },
  onMouseOut() {
    this.removeRollOverObject();
    this.stopCameraDragging();
  },
  onWheel(e) {
    render.camera.position.z += e.deltaY * WHEEL_ZOOM_SENSITIVITY;
    if (render.camera.position.z < WHEEL_ZOOM_MIN_LIMIT) {
      render.camera.position.z = WHEEL_ZOOM_MIN_LIMIT;
    }
    if (render.camera.position.z > WHEEL_ZOOM_MAX_LIMIT) {
      render.camera.position.z = WHEEL_ZOOM_MAX_LIMIT;
    }
  },
  onMouseDown(e) {
    this.state.prevMousePos = new THREE.Vector2(e.clientX, e.clientY);
  },
  onMouseUp(e) {
    if (!this.state.dragging) {
      const newTile = render.addTile({
        material: materials.GTATIL1_204
      });
      newTile.position.copy(this.getRollOverPos(e));
    }
    this.stopCameraDragging();
  },
  getRollOverPos(e) {
    const rollOverPos = render.getIntersectionWithZ(new THREE.Vector2(e.clientX, e.clientY), 0);
    const centerOffset = TILE_SIZE / 2;
    rollOverPos.x = Math.floor(rollOverPos.x + centerOffset);
    rollOverPos.y = Math.floor(rollOverPos.y + centerOffset);
    return rollOverPos;
  },
  removeRollOverObject() {
    if (!this.state.rollOverObject) {
      return;
    }
    render.removeObject(this.state.rollOverObject);
    this.state.rollOverObject = null;
  },
  stopCameraDragging() {
    this.state.prevMousePos = null;
    this.state.dragging = false;
  },
  render() {
    return (
      <div>
      </div>
    );
  }
});

export default MapEditor;
