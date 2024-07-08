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
  const hash = window.location.hash.substring(1);
  const tokenParams = hash.split('&').reduce((acc, param) => {
    const [key, value] = param.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

  const token: SpotifyToken = {
    access_token: tokenParams['access_token'],
    token_type: tokenParams['token_type'],
    expires_in: tokenParams['expires_in'],
    state: tokenParams['state'],
  };

  return token;
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;