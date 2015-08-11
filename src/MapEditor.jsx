import React from 'react';
import Render from './Render';

const MapEditor = React.createClass({
  componentDidMount() {
    new Render();
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
