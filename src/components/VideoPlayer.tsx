import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Channel, PlayerState } from '../types';

interface VideoPlayerProps {
  channel: Channel | null;
  onStateChange?: (state: PlayerState) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ channel, onStateChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    volume: 1,
    muted: false,
    fullscreen: false,
    currentTime: 0,
    duration: 0
  });
  
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!channel || !videoRef.current) return;

    const video = videoRef.current;
    
    // Clean up previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (channel.url.includes('.m3u8') && Hls.isSupported()) {
      // HLS stream
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      
      hls.loadSource(channel.url);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest parsed');
      });
      
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
      });
      
      hlsRef.current = hls;
    } else {
      // Direct video URL
      video.src = channel.url;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel]);

  useEffect(() => {
    onStateChange?.(playerState);
  }, [playerState, onStateChange]);

  const updatePlayerState = (updates: Partial<PlayerState>) => {
    setPlayerState(prev => ({ ...prev, ...updates }));
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (playerState.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(console.error);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !videoRef.current.muted;
    updatePlayerState({ muted: videoRef.current.muted });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    
    const volume = parseFloat(e.target.value);
    videoRef.current.volume = volume;
    updatePlayerState({ volume, muted: volume === 0 });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    
    setControlsTimeout(timeout);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      updatePlayerState({ fullscreen: !!document.fullscreenElement });
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!channel) {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Play className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Select a Channel</h3>
          <p className="text-gray-400">Choose a channel from the sidebar to start watching</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 bg-black relative group cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onPlay={() => updatePlayerState({ isPlaying: true })}
        onPause={() => updatePlayerState({ isPlaying: false })}
        onTimeUpdate={(e) => {
          const video = e.target as HTMLVideoElement;
          updatePlayerState({ 
            currentTime: video.currentTime,
            duration: video.duration || 0
          });
        }}
        onVolumeChange={(e) => {
          const video = e.target as HTMLVideoElement;
          updatePlayerState({ 
            volume: video.volume,
            muted: video.muted
          });
        }}
        autoPlay
        muted={playerState.muted}
      />
      
      {/* Channel Info Overlay */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="flex items-center space-x-3">
          {channel.logo && (
            <img 
              src={channel.logo} 
              alt={channel.name}
              className="w-8 h-8 rounded object-cover"
            />
          )}
          <div>
            <h3 className="font-semibold">{channel.name}</h3>
            {channel.group && (
              <p className="text-sm text-gray-300">{channel.group}</p>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
            >
              {playerState.isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="hover:text-blue-400 transition-colors"
              >
                {playerState.muted || playerState.volume === 0 ? 
                  <VolumeX className="w-5 h-5" /> : 
                  <Volume2 className="w-5 h-5" />
                }
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={playerState.muted ? 0 : playerState.volume}
                onChange={handleVolumeChange}
                className="w-20 accent-blue-600"
              />
            </div>
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="hover:text-blue-400 transition-colors"
          >
            {playerState.fullscreen ? 
              <Minimize className="w-5 h-5" /> : 
              <Maximize className="w-5 h-5" />
            }
          </button>
        </div>
      </div>
    </div>
  );
};