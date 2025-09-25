import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MOOD_MAP } from '@/lib/constants';
import type { Message } from '@shared/types';
interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}
export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  const moodStyle = MOOD_MAP[message.mood];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex flex-col mb-4', isOwnMessage ? 'items-end' : 'items-start')}
    >
      <div className="text-xs text-mood-2 mb-1 px-2">
        {isOwnMessage ? 'You' : message.nickname}
      </div>
      <div
        className={cn(
          'max-w-xs md:max-w-md p-3 rounded-lg border-2 bg-black/50',
          moodStyle.borderColor,
          moodStyle.glow
        )}
        style={{
          borderColor: moodStyle.color,
          boxShadow: `0 0 10px ${moodStyle.color}60`,
        }}
      >
        <p className="text-base text-white break-words">{message.text} <span className="text-lg ml-1">{moodStyle.emoji}</span></p>
      </div>
    </motion.div>
  );
}