import React from 'react';
import { Tv, Film, PlaySquare, Settings, Search, Clock, Heart, Folder, Grid3X3, User } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (section: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const mainSections = [
    {
      id: 'live-tv',
      title: 'Live TV',
      icon: Tv,
      description: 'Watch live channels',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      id: 'movies',
      title: 'Movies',
      icon: Film,
      description: 'Browse movies',
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      id: 'series',
      title: 'Series',
      icon: PlaySquare,
      description: 'TV shows & series',
      gradient: 'from-green-500 to-green-700'
    }
  ];

  const bottomSections = [
    { id: 'favorites', icon: Heart, title: 'Favorites' },
    { id: 'recent', icon: Clock, title: 'Recent' },
    { id: 'categories', icon: Grid3X3, title: 'Categories' },
    { id: 'files', icon: Folder, title: 'Files' },
    { id: 'search', icon: Search, title: 'Search' },
    { id: 'settings', icon: Settings, title: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Tv className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">IPTV Player</h1>
            <p className="text-blue-200">Premium Entertainment</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right text-white">
            <div className="text-sm opacity-75">Dec 25, 2024</div>
            <div className="text-lg font-semibold">09:24 PM</div>
          </div>
          <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto">
        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${section.gradient} p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="relative z-10">
                  <div className="mb-4">
                    <IconComponent className="w-16 h-16 text-white/90" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                  <p className="text-white/80">{section.description}</p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500" />
              </button>
            );
          })}
        </div>

        {/* Bottom Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {bottomSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/10"
              >
                <div className="mb-3">
                  <IconComponent className="w-8 h-8 text-white mx-auto group-hover:text-blue-300 transition-colors" />
                </div>
                <span className="text-white text-sm font-medium">{section.title}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-white">1,247</div>
            <div className="text-white/60 text-sm">Live Channels</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-white">8,432</div>
            <div className="text-white/60 text-sm">Movies</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-white">2,156</div>
            <div className="text-white/60 text-sm">TV Series</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-white">HD</div>
            <div className="text-white/60 text-sm">Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
};