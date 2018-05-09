import React, { Component } from 'react';
import './favicon.ico';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';
import Spotify from './util/Spotify';

//Parent Component
//Constructor, state, and props section
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'Playlist Name',
      playlistTracks: []
    }

//binding section
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

//Methods for adding and removing tracks
//updating the playlist, and handling searches
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

savePlaylist(trackURIs) {
  trackURIs = [this.Spotify.savePlaylist()];
}

search(userInput) {
  Spotify.search(userInput).then(songs => {
    this.setState({searchResults: songs});
  })
}

//JSX elements to render to browser
  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>

  <div className="App">
    <SearchBar onSearch={this.search} />

    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults}
                                    onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />
    </div>
  </div>

      </div>
    );
  }
}

export default App;
