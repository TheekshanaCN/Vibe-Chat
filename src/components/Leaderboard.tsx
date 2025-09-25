import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOOD_MAP } from '@/lib/constants';
export function Leaderboard() {
  const leaderboard = useChatStore((state) => state.leaderboard);
  return (
    <Card className="bg-black/30 border-2 border-mood-3 shadow-glow-mood-3 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-display text-mood-3 text-lg tracking-widest">
          TOP VIBES (TODAY)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {leaderboard.map((entry, index) => {
            const moodInfo = MOOD_MAP[entry.mood];
            if (!moodInfo) return null;
            return (
              <motion.li
                key={entry.mood}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between text-base"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl" style={{ color: moodInfo.color }}>
                    {index === 0 ? <Trophy className="h-5 w-5" /> : `#${index + 1}`}
                  </span>
                  <span className="text-2xl">{moodInfo.emoji}</span>
                </div>
                <span className="font-bold text-white">{entry.count}</span>
              </motion.li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}