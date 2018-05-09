import React from 'react';

let accessToken;

const clientId = 'e79bdf9a3d3744af8f433500ffa32cd4';
const redirectUri = 'http://localhost:3000/';

class Spotify extends React.Component {
  constructor(props) {
    super(props)

    this.getAccessToken = this.getAccessToken.bind(this);
  }

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    const matchToken  = window.location.href.match(/access_token=([^&]*)/);
const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

if (matchToken && expiresIn) {
  const expiration = expiresIn[1];
  let accessToken = matchToken[1];

  window.setTimeout(() => accessToken = '', expiresIn * 1000);
window.history.pushState('Access Token', null, '/');

  return accessToken;
} else {
  window.location = 'https://accounts.spotify.com/authorize?client_id=${clientId} &response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}';
}
}

search(searchTerm) {
  accessToken = Spotify.getAccessToken();
  return fetch('https://api.spotify.com/v1/search?type=track&q= ${searchTerm}', {
    headers:  {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(response => {
    return response.json();
}).then(jsonresponse => {
  return jsonresponse.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri
  }));
})
}
}


export default Spotify;
