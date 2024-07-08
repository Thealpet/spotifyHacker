// src/auth.js
const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'playlist-read-private',
  'user-library-read',
  // Add other scopes as needed
];

interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: string;
  state?: string;
}

export const getTokenFromUrl = (): SpotifyToken => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial: Partial<SpotifyToken>, item: string) => {
      let parts = item.split('=');
      (initial as any)[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {}) as SpotifyToken;
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;