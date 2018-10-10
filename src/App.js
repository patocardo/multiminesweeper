import React from 'react';

import InitialConf from './components/InitialConf';
import MainBoard from './components/MainBoard';

import logo from './logo.svg';
import './App.scss';

const App = props => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Mines Weeper. Multiplayer React version
        </h1>
      </header>
      <main className="App-main p-3">
        <InitialConf />
        <MainBoard cancelConfirmer={false} />
      </main>
    </div>
  );
}

export default App;