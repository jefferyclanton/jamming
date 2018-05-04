import React, { Component } from 'react';
import logo from './favicon.ico';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {searchResults: [{name: ''}, {artist: ''}, {album: ''}, {id: ''}]};
  }
  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} />
      <Playlist />
    </div>
  </div>

      </div>
    );
  }
}

export default App;
