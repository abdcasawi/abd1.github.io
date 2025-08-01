import React from 'react';
import { ArrowLeft, Play, Star, Clock } from 'lucide-react';

interface MoviesScreenProps {
  onBack: () => void;
}

export const MoviesScreen: React.FC<MoviesScreenProps> = ({ onBack }) => {
  const movies = [
    {
      id: 1,
      title: 'Action Hero',
      year: 2024,
      rating: 8.5,
      duration: '2h 15m',
      genre: 'Action',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: 'Space Adventure',
      year: 2024,
      rating: 9.1,
      duration: '2h 45m',
      genre: 'Sci-Fi',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: 'Mystery Night',
      year: 2023,
      rating: 7.8,
      duration: '1h 58m',
      genre: 'Thriller',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      title: 'Comedy Central',
      year: 2024,
      rating: 8.2,
      duration: '1h 42m',
      genre: 'Comedy',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 5,
      title: 'Drama Queen',
      year: 2023,
      rating: 8.7,
      duration: '2h 12m',
      genre: 'Drama',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 6,
      title: 'Horror House',
      year: 2024,
      rating: 7.5,
      duration: '1h 35m',
      genre: 'Horror',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-white">Movies</h1>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/10"
            >
              <div className="relative">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs">{movie.rating}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1 truncate">{movie.title}</h3>
                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <span>{movie.year}</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{movie.duration}</span>
                  </span>
                </div>
                <span className="inline-block bg-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded">
                  {movie.genre}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};