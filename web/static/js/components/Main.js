//require('normalize.css/normalize.css');
//require('styles/App.css');

import React from 'react';
import { Loop, Stage } from 'react-game-kit';

class GameComponent extends React.Component {
  render() {
    return (
      <div>
        <Loop>
          <Stage>
          </Stage>
        </Loop>
      </div>
    );
  }
}

GameComponent.defaultProps = {
};

export default GameComponent;
