import type { Mood } from '@shared/types';
export const MOODS: Mood[] = [
  {
    name: 'happy',
    emoji: '😎',
    color: '#FF00FF',
    glow: 'shadow-glow-mood-1',
    borderColor: 'border-mood-1',
  },
  {
    name: 'fire',
    emoji: '🔥',
    color: '#FFFF00',
    glow: 'shadow-glow-mood-3',
    borderColor: 'border-mood-3',
  },
  {
    name: 'laugh',
    emoji: '😂',
    color: '#00FFFF',
    glow: 'shadow-glow-mood-2',
    borderColor: 'border-mood-2',
  },
  {
    name: 'mindblown',
    emoji: '🤯',
    color: '#FF00FF',
    glow: 'shadow-glow-mood-1',
    borderColor: 'border-mood-1',
  },
  {
    name: 'sad',
    emoji: '😢',
    color: '#00FFFF',
    glow: 'shadow-glow-mood-2',
    borderColor: 'border-mood-2',
  },
];
export const MOOD_MAP = MOODS.reduce((acc, mood) => {
  acc[mood.name] = mood;
  return acc;
}, {} as Record<Mood['name'], Mood>);