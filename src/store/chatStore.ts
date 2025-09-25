import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Message, VibeState, User, LeaderboardEntry } from '@shared/types';
type ChatState = {
  nickname: string | null;
  messages: Message[];
  vibeState: VibeState;
  activeUsers: User[];
  leaderboard: LeaderboardEntry[];
};
type ChatActions = {
  setNickname: (nickname: string) => void;
  addMessages: (newMessages: Message[]) => void;
  setVibeState: (vibeState: VibeState) => void;
  setActiveUsers: (users: User[]) => void;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
  resetState: () => void;
};
const initialState: ChatState = {
  nickname: null,
  messages: [],
  vibeState: {
    happy: 0,
    fire: 0,
    laugh: 0,
    mindblown: 0,
    sad: 0,
  },
  activeUsers: [],
  leaderboard: [],
};
export const useChatStore = create<ChatState & ChatActions>()(
  immer((set) => ({
    ...initialState,
    setNickname: (nickname) => {
      set((state) => {
        state.nickname = nickname;
      });
    },
    addMessages: (newMessages) => {
      set((state) => {
        const existingIds = new Set(state.messages.map(m => m.id));
        const uniqueNewMessages = newMessages.filter(m => !existingIds.has(m.id));
        state.messages.push(...uniqueNewMessages);
        state.messages.sort((a, b) => a.timestamp - b.timestamp);
      });
    },
    setVibeState: (vibeState) => {
      set((state) => {
        state.vibeState = vibeState;
      });
    },
    setActiveUsers: (users) => {
      set((state) => {
        state.activeUsers = users;
      });
    },
    setLeaderboard: (leaderboard) => {
        set((state) => {
            state.leaderboard = leaderboard;
        });
    },
    resetState: () => {
      set((state) => {
        state.messages = initialState.messages;
        state.vibeState = initialState.vibeState;
        state.activeUsers = initialState.activeUsers;
        state.leaderboard = initialState.leaderboard;
      });
    },
  }))
);