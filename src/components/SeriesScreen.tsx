import React from 'react';
import { ArrowLeft, Play, Star, Calendar } from 'lucide-react';

interface SeriesScreenProps {
  onBack: () => void;
}

export const SeriesScreen: React.FC<SeriesScreenProps> = ({ onBack }) => {
  const series = [
    {
      id: 1,
      title: 'Tech Dynasty',
      seasons: 4,
      episodes: 48,
      rating: 9.2,
      year: 2024,
      genre: 'Drama',
      poster: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: 'Space Odyssey',
      seasons: 3,
      episodes: 36,
      rating: 8.8,
      year: 2023,
      genre: 'Sci-Fi',
      poster: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: 'Crime City',
      seasons: 5,
      episodes: 60,
      rating: 8.5,
      year: 2024,
      genre: 'Crime',
      poster: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      title: 'Comedy Club',
      seasons: 2,
      episodes: 24,
      rating: 8.1,
      year: 2024,
      genre: 'Comedy',
      poster: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 5,
      title: 'Medical Heroes',
      seasons: 6,
      episodes: 72,
      rating: 8.9,
      year: 2023,
      genre: 'Medical',
      poster: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 6,
      title: 'Fantasy Realm',
      seasons: 3,
      episodes: 30,
      rating: 9.0,
      year: 2024,
      genre: 'Fantasy',
      poster: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-white">TV Series</h1>
        </div>
      </div>

      {/* Series Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {series.map((show) => (
            <div
              key={show.id}
              className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/10"
            >
              <div className="relative">
                <img
                  src={show.poster}
                  alt={show.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs">{show.rating}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1 truncate">{show.title}</h3>
                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{show.year}</span>
                  </span>
                  <span>{show.seasons} Seasons</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/60">{show.episodes} Episodes</span>
                  <span className="inline-block bg-green-600/30 text-green-300 text-xs px-2 py-1 rounded">
                    {show.genre}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};