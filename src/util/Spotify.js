let accessToken;

const clientId = '12e337ae161f4f5fbb48d1eefcaa2db7';
const redirectUri = 'http://whole-table.surge.sh';

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

        let access_token  = window.location.href.match(/access_token=([^&]*)/);
    let expires_in = window.location.href.match(/expires_in=([^&]*)/);

    if (access_token && expires_in) {
      accessToken = access_token[1];
      const expiresIn = Number(expires_in[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
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

savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }
      const accessToken = Spotify.getAccessToken();
      let userID = '';
      let playlistID = null;
      return fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => response.json()
      ).then(jsonResponse =>  {
userID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
        ).then(jsonResponse => {
        playlistID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({uris: trackURIs})
     });
      });
    });
  }

}

export default Spotify;
