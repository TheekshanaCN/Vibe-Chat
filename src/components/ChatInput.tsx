import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOODS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Mood } from '@shared/types';
interface ChatInputProps {
  onSendMessage: (text: string, mood: Mood['name']) => void;
}
export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood['name']>(MOODS[0].name);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim(), selectedMood);
      setText('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-black/50 border-2 border-mood-1 shadow-glow-mood-1 backdrop-blur-sm space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your message..."
          className="flex-grow bg-transparent border-2 border-mood-2 text-mood-2 placeholder:text-mood-2/50 focus:ring-mood-2 focus:border-mood-2"
          autoComplete="off"
        />
        <Button type="submit" size="icon" className="bg-mood-1 text-black hover:bg-mood-1/80">
          <Send className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex justify-around items-center">
        {MOODS.map((mood) => (
          <motion.button
            key={mood.name}
            type="button"
            onClick={() => setSelectedMood(mood.name)}
            className={cn(
              'text-3xl p-2 rounded-full transition-all duration-200',
              selectedMood === mood.name ? 'bg-mood-1/30 scale-125' : 'opacity-70'
            )}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            {mood.emoji}
          </motion.button>
        ))}
      </div>
    </form>
  );
}