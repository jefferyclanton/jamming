let accessToken;

const clientId = '12e337ae161f4f5fbb48d1eefcaa2db7';
const redirectUri = 'http://localhost:3000';

const Spotify = {
  startAuthorization() {
    console.log('authorization');
    let url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + clientId +
      '&redirect_uri=' + redirectUri;
      window.location = url;
    },

    getAccessToken() {
        if(accessToken) {
          return accessToken;
        }

        const matchToken  = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (matchToken && expiresIn) {
      const expiration = Number(expiresIn[1]);
      accessToken = matchToken[1];

      window.setTimeout(() => accessToken = '', expiration * 1000);
    window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

search(searchTerm) {
  const accessToken = Spotify.getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q= ${searchTerm}`, {
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
},

savePlaylist(name, userTrack) {
  if (!name || !userTrack.length) {
    return;
  }
  let currentToken = this.accessToken;
  let headers =  {
    Authorization: `Bearer ${currentToken}`
  }
  let userId = '';
  fetch('https://api.spotify.com/v1/me', {
    headers: headers
  }).then(response => {
    userId = response.id;
    return response.json();
  }).then(fetch( `https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${currentToken}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "name": name
      })
  })).then(response => {
  let playlistId = userId;
  console.log(playlistId);
})
}

}

export default Spotify;
