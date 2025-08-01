import React, { useState } from 'react';
import { ArrowLeft, Grid3X3, List, Search, Filter } from 'lucide-react';
import { ChannelList } from './ChannelList';
import { VideoPlayer } from './VideoPlayer';
import { Channel } from '../types';

interface LiveTVScreenProps {
  channels: Channel[];
  onBack: () => void;
  favorites: string[];
  recentChannels: string[];
  onToggleFavorite: (channelId: string) => void;
}

export const LiveTVScreen: React.FC<LiveTVScreenProps> = ({
  channels,
  onBack,
  favorites,
  recentChannels,
  onToggleFavorite
}) => {
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPlayer, setShowPlayer] = useState(false);

  const handleChannelSelect = (channel: Channel) => {
    setCurrentChannel(channel);
    setShowPlayer(true);
  };

  if (showPlayer && currentChannel) {
    return (
      <div className="h-screen bg-black flex flex-col">
        <div className="bg-gray-900/90 backdrop-blur-sm p-4 flex items-center justify-between">
          <button
            onClick={() => setShowPlayer(false)}
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Channels</span>
          </button>
          <div className="text-white text-center">
            <h3 className="font-semibold">{currentChannel.name}</h3>
            {currentChannel.group && (
              <p className="text-sm text-gray-300">{currentChannel.group}</p>
            )}
          </div>
          <div className="w-24"></div>
        </div>
        <VideoPlayer channel={currentChannel} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Live TV</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Channel Grid */}
      {viewMode === 'grid' ? (
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => handleChannelSelect(channel)}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/10"
              >
                {channel.logo ? (
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-16 h-16 rounded-lg mx-auto mb-3 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {channel.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="text-white font-medium text-sm mb-1 truncate">
                  {channel.name}
                </h3>
                {channel.group && (
                  <p className="text-white/60 text-xs truncate">{channel.group}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-80px)]">
          <ChannelList
            channels={channels}
            currentChannel={currentChannel}
            onChannelSelect={handleChannelSelect}
            favorites={favorites}
            recentChannels={recentChannels}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      )}
    </div>
  );
};