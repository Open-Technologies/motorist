import React from 'react';

const Game = React.createClass({
  render() {
    return (
      <div className="tileMenu">
        <img className="tileMenu__tile" src="images/textures/GTATIL1_204.bmp"/>
        <div className="clear"/>
      </div>
    );
  }
});

React.render(<Game/>, document.body);
