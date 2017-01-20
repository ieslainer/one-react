import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return (
    <div className="main-container">
      <h1>Hello World!</h1>
      <div className="one-nav"></div>
      <div className="one-detail"></div>
    </div>
    );
  }
}

render(<App/>, document.getElementById('app'));