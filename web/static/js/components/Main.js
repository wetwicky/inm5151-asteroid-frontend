//require('normalize.css/normalize.css');
//require('styles/App.css');

import React from 'react';
import { Loop, Stage } from 'react-game-kit';

class AppComponent extends React.Component {
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

AppComponent.defaultProps = {
};

export default AppComponent;
