export const getCurrentlyPlaying = (token: string): Promise<any> => {
    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json());
  };