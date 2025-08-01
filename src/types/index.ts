export interface Channel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  group?: string;
  country?: string;
  language?: string;
  tvgId?: string;
}

export interface Playlist {
  id: string;
  name: string;
  url: string;
  channels: Channel[];
  lastUpdated: Date;
}

export interface PlayerState {
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  fullscreen: boolean;
  currentTime: number;
  duration: number;
}