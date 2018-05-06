import React, { Component } from 'react';
import logo from './favicon.ico';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
  }

addTrack(track) {
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  console.log('Already in Playlist');
} else {
  this.state.playlistTracks.push(track);
  }
}

removeTrack(track) {

}

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>

  <div className="App">
    <SearchBar />

    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults}
                                    onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks} />
    </div>
  </div>

      </div>
    );
  }
}

export default App;
