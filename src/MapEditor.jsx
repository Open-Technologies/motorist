import React from 'react';
import Render from './Render';
import materials from './materials';

const MapEditor = React.createClass({
  getInitialState() {
    return {
      render: null,
      rollOverPosition: null,
      rollOverObject: null
    };
  },
  componentDidMount() {
    this.state.render = new Render();
    this.state.render.camera.position.z = 5;
    this.state.render.domElement.addEventListener('click', this.onClick);
    this.state.render.domElement.addEventListener('mousemove', this.onMouseMove);
    this.state.render.domElement.addEventListener('mouseout', this.onMouseOut);
  },
  componentWillUnmount() {
    this.state.render.domElement.removeEvenListener('click', this.onClick);
    this.state.render.domElement.removeEvenListener('mousemove', this.onMouseMove);
    this.state.render.domElement.removeEvenListener('mouseout', this.onMouseOut);
  },
  onClick(e) {
    this.updateRollOverPosition(e);
    const newTile = this.state.render.addTile({
      material: materials.GTATIL1_204
    });
    newTile.position.copy(this.state.rollOverPosition);
  },
  onMouseMove(e) {
    if (!this.state.rollOverObject) {
      // Create if not exist
      const material = materials.GTATIL1_204.clone();
      material.opacity = 0.5;
      material.transparent = true;
      this.state.rollOverObject = this.state.render.addTile({material});
    }

    // Update position
    this.updateRollOverPosition(e);
    this.state.rollOverObject.position.copy(this.state.rollOverPosition);
  },
  onMouseOut() {
    // Remove rollOver
    if (!this.state.rollOverObject) {
      return;
    }
    this.state.render.removeObject(this.state.rollOverObject);
    this.state.rollOverObject = null;
  },

  updateRollOverPosition(e) {
    this.state.rollOverPosition = this.state.render.getIntersectionWithZ(e.clientX, e.clientY, 0);
    this.state.rollOverPosition.x = Math.floor(this.state.rollOverPosition.x + 0.5);
    this.state.rollOverPosition.y = Math.floor(this.state.rollOverPosition.y + 0.5);
  },

  render() {
    return (
      <div className="tileMenu">
        <img className="tileMenu__tile" src="images/textures/GTATIL1_204.bmp"/>
        <div className="clear"/>
      </div>
    );
  }
});

export default MapEditor;
