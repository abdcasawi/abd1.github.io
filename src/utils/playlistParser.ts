import { Channel } from '../types';

export class PlaylistParser {
  static parseM3U(content: string): Channel[] {
    const channels: Channel[] = [];
    const lines = content.split('\n').map(line => line.trim());
    
    let currentChannel: Partial<Channel> = {};
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('#EXTINF:')) {
        // Parse EXTINF line
        const match = line.match(/#EXTINF:([^,]*),(.*)$/);
        if (match) {
          const attributes = match[1];
          const title = match[2];
          
          currentChannel = {
            id: Math.random().toString(36).substr(2, 9),
            name: title,
          };
          
          // Parse attributes
          const logoMatch = attributes.match(/tvg-logo="([^"]*)"/);
          if (logoMatch) currentChannel.logo = logoMatch[1];
          
          const groupMatch = attributes.match(/group-title="([^"]*)"/);
          if (groupMatch) currentChannel.group = groupMatch[1];
          
          const tvgIdMatch = attributes.match(/tvg-id="([^"]*)"/);
          if (tvgIdMatch) currentChannel.tvgId = tvgIdMatch[1];
        }
      } else if (line && !line.startsWith('#') && currentChannel.name) {
        // This is the URL line
        currentChannel.url = line;
        channels.push(currentChannel as Channel);
        currentChannel = {};
      }
    }
    
    return channels;
  }
  
  static async fetchPlaylist(url: string): Promise<Channel[]> {
    try {
      const response = await fetch(url);
      const content = await response.text();
      
      if (url.toLowerCase().includes('.m3u') || content.includes('#EXTM3U')) {
        return this.parseM3U(content);
      }
      
      throw new Error('Unsupported playlist format');
    } catch (error) {
      console.error('Error fetching playlist:', error);
      return [];
    }
  }
  
  static generateSampleChannels(): Channel[] {
    return [
      {
        id: '1',
        name: 'Sample News Channel',
        url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
        logo: 'https://images.pexels.com/photos/3761019/pexels-photo-3761019.jpeg?auto=compress&cs=tinysrgb&w=100',
        group: 'News',
        country: 'US'
      },
      {
        id: '2',
        name: 'Entertainment HD',
        url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
        logo: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&cs=tinysrgb&w=100',
        group: 'Entertainment',
        country: 'US'
      },
      {
        id: '3',
        name: 'Sports Live',
        url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
        logo: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=100',
        group: 'Sports',
        country: 'US'
      },
      {
        id: '4',
        name: 'Movie Channel',
        url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
        logo: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=100',
        group: 'Movies',
        country: 'US'
      }
    ];
  }
}