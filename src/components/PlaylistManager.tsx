import React, { useState } from 'react';
import { Plus, Download, Upload, X, ExternalLink } from 'lucide-react';
import { PlaylistParser } from '../utils/playlistParser';
import { Channel } from '../types';

interface PlaylistManagerProps {
  onChannelsLoad: (channels: Channel[]) => void;
  onClose: () => void;
}

export const PlaylistManager: React.FC<PlaylistManagerProps> = ({ onChannelsLoad, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');

    try {
      const channels = await PlaylistParser.fetchPlaylist(url.trim());
      if (channels.length === 0) {
        setError('No channels found in the playlist');
        return;
      }
      
      onChannelsLoad(channels);
      onClose();
    } catch (err) {
      setError('Failed to load playlist. Please check the URL and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const content = await file.text();
      const channels = PlaylistParser.parseM3U(content);
      
      if (channels.length === 0) {
        setError('No channels found in the file');
        return;
      }
      
      onChannelsLoad(channels);
      onClose();
    } catch (err) {
      setError('Failed to parse the playlist file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSamplePlaylist = () => {
    const channels = PlaylistParser.generateSampleChannels();
    onChannelsLoad(channels);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Load Playlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Playlist URL (M3U/M3U8)
            </label>
            <form onSubmit={handleUrlSubmit} className="flex space-x-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/playlist.m3u8"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>

          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload Playlist File
            </label>
            <label className="border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg p-4 cursor-pointer transition-colors block">
              <input
                type="file"
                accept=".m3u,.m3u8"
                onChange={handleFileUpload}
                className="hidden"
                disabled={loading}
              />
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">
                  Click to upload M3U/M3U8 file
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports .m3u and .m3u8 formats
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Sample Playlist */}
          <button
            onClick={loadSamplePlaylist}
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Load Sample Channels</span>
          </button>
        </div>
      </div>
    </div>
  );
};