import React, { Component } from 'react';
import route from './route.jsx';
import Nav from './components/Nav/Nav.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='nav'>
          <Nav />
        </div>
        <div className='content'>
          {route}
        </div>
      </div>
    );
  }
}

export default App;
