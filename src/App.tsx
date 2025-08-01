import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { LiveTVScreen } from './components/LiveTVScreen';
import { MoviesScreen } from './components/MoviesScreen';
import { SeriesScreen } from './components/SeriesScreen';
import { PlaylistManager } from './components/PlaylistManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Channel } from './types';
import { PlaylistParser } from './utils/playlistParser';

function App() {
  const [channels, setChannels] = useLocalStorage<Channel[]>('iptv-channels', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('iptv-favorites', []);
  const [recentChannels, setRecentChannels] = useLocalStorage<string[]>('iptv-recent', []);
  const [showPlaylistManager, setShowPlaylistManager] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<string>('home');

  // Load sample channels on first visit
  useEffect(() => {
    if (channels.length === 0) {
      const sampleChannels = PlaylistParser.generateSampleChannels();
      setChannels(sampleChannels);
    }
  }, [channels.length, setChannels]);

  const handleNavigation = (screen: string) => {
    if (screen === 'settings') {
      setShowPlaylistManager(true);
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleChannelsLoad = (newChannels: Channel[]) => {
    setChannels(newChannels);
  };

  const toggleFavorite = (channelId: string) => {
    setFavorites(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'live-tv':
        return (
          <LiveTVScreen
            channels={channels}
            onBack={() => setCurrentScreen('home')}
            favorites={favorites}
            recentChannels={recentChannels}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'movies':
        return <MoviesScreen onBack={() => setCurrentScreen('home')} />;
      case 'series':
        return <SeriesScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentScreen()}

      {/* Playlist Manager Modal */}
      {showPlaylistManager && (
        <PlaylistManager
          onChannelsLoad={handleChannelsLoad}
          onClose={() => setShowPlaylistManager(false)}
        />
      )}
    </div>
  );
}

export default App;