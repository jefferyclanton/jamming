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
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

addTrack(track) {
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  console.log('Already in Playlist');
} else {
  this.state.playlistTracks.push(track);
  }
}

removeTrack(track) {
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  return this.state.playlistTracks.splice(track);
}
this.setState(this.state.playlistTracks);
}

updatePlaylistName(name) {
  this.setState({playlistName: name});
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
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}/>
    </div>
  </div>

      </div>
    );
  }
}

export default App;
