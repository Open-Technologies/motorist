import React from 'react';
import Render from './Render';
import materials from './materials';

const MapEditor = React.createClass({
  getInitialState() {
    return {
      render: null,
      rollOver: null
    };
  },
  componentDidMount() {
    this.state.render = new Render();
    this.state.render.camera.position.z = 5;
    this.state.render.domElement.addEventListener('mousemove', this.onMouseMove);
    this.state.render.domElement.addEventListener('mouseout', this.onMouseOut);
  },
  componentWillUnmount() {
    this.state.render.domElement.removeEvenListener('mousemove', this.onMouseMove);
    this.state.render.domElement.removeEvenListener('mouseout', this.onMouseOut);
  },
  onMouseMove(e) {
    if (!this.state.rollOver) {
      // Create if not exist
      const material = materials.GTATIL1_204.clone();
      material.opacity = 0.5;
      material.transparent = true;
      this.state.rollOver = this.state.render.addTile({material});
    }

    // Update position
    const point = this.state.render.getIntersectionWithZ(e.clientX, e.clientY, 0);
    point.x = Math.floor(point.x + 0.5);
    point.y = Math.floor(point.y + 0.5);
    this.state.rollOver.position.copy(point);
  },
  onMouseOut() {
    // Remove rollOver
    if (!this.state.rollOver) {
      return;
    }
    this.state.render.removeObject(this.state.rollOver);
    this.state.rollOver = null;
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
