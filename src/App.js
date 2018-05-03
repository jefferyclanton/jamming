import React, { Component } from 'react';
import logo from './favicon.ico';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';

class App extends Component {
  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults />
      <Playlist />
    </div>
  </div>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      </div>
    );
  }
}

export default App;
