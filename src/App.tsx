import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getTokenFromUrl, loginUrl} from './auth';
import { getCurrentlyPlaying } from './spotify';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<any>(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      // Store the token in localStorage or state management as needed
      getCurrentlyPlaying(_token).then((data) => {
        setCurrentlyPlaying(data);
      });
    }
  }, []);
  return (
  <div className="App">
      {!token ? (
        <a className="btn btn-primary" href={loginUrl}>
          Login to Spotify
        </a>
      ) : (
        <div>
          <h1>Welcome to Spotify API Integration</h1>
          {currentlyPlaying ? (
            <div>
              <h2>Currently Playing:</h2>
              <p>{currentlyPlaying.item.name} by {currentlyPlaying.item.artists[0].name}</p>
            </div>
          ) : (
            <p>No song is currently playing.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
