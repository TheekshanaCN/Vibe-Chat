// Generic API response for consistent structure
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
// Defines a single mood
export type Mood = {
  name: 'happy' | 'fire' | 'laugh' | 'mindblown' | 'sad';
  emoji: string;
  color: string;
  glow: string;
  borderColor: string;
};
// Represents a single chat message
export interface Message {
  id: string;
  nickname: string;
  text: string;
  mood: Mood['name'];
  timestamp: number;
}
// Represents the aggregated count of each mood in the chat
export type VibeState = {
  [key in Mood['name']]: number;
};
// Represents an active user
export interface User {
    nickname: string;
    lastSeen: number;
}
// Represents a single entry in the leaderboard
export interface LeaderboardEntry {
    mood: Mood['name'];
    count: number;
}
// Type for the data returned by the /updates endpoint
export interface UpdatesResponse {
  messages: Message[];
  vibeState: VibeState;
  activeUsers: User[];
  leaderboard: LeaderboardEntry[];
}