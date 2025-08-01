import React, { useState, useMemo } from 'react';
import { Search, Tv, Heart, Clock, Globe } from 'lucide-react';
import { Channel } from '../types';

interface ChannelListProps {
  channels: Channel[];
  currentChannel: Channel | null;
  onChannelSelect: (channel: Channel) => void;
  favorites: string[];
  recentChannels: string[];
  onToggleFavorite: (channelId: string) => void;
}

export const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  currentChannel,
  onChannelSelect,
  favorites,
  recentChannels,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'recent'>('all');

  const categories = useMemo(() => {
    const cats = new Set(channels.map(channel => channel.group || 'Other'));
    return ['All', ...Array.from(cats).sort()];
  }, [channels]);

  const filteredChannels = useMemo(() => {
    let filtered = channels;

    // Filter by tab
    if (activeTab === 'favorites') {
      filtered = filtered.filter(channel => favorites.includes(channel.id));
    } else if (activeTab === 'recent') {
      filtered = filtered.filter(channel => recentChannels.includes(channel.id));
      // Sort by recent order
      filtered.sort((a, b) => 
        recentChannels.indexOf(a.id) - recentChannels.indexOf(b.id)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(channel => 
        (channel.group || 'Other') === selectedCategory
      );
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(channel =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (channel.group && channel.group.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [channels, activeTab, selectedCategory, searchQuery, favorites, recentChannels]);

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Tv className="w-6 h-6 mr-2 text-blue-500" />
          IPTV Player
        </h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Globe className="w-4 h-4 inline mr-1" />
            All
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'favorites' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Heart className="w-4 h-4 inline mr-1" />
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'recent' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-1" />
            Recent
          </button>
        </div>

        {/* Categories */}
        {activeTab === 'all' && (
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChannels.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <Tv className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No channels found</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredChannels.map(channel => (
              <div
                key={channel.id}
                onClick={() => onChannelSelect(channel)}
                className={`group flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-800 ${
                  currentChannel?.id === channel.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-center flex-1 min-w-0">
                  {channel.logo ? (
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className="w-10 h-10 rounded object-cover mr-3 flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <Tv className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{channel.name}</h3>
                    {channel.group && (
                      <p className={`text-sm truncate ${
                        currentChannel?.id === channel.id 
                          ? 'text-blue-200' 
                          : 'text-gray-500 group-hover:text-gray-400'
                      }`}>
                        {channel.group}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(channel.id);
                  }}
                  className={`ml-2 p-1 rounded hover:bg-gray-700/50 transition-colors ${
                    favorites.includes(channel.id) 
                      ? 'text-red-500' 
                      : 'text-gray-500 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(channel.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};