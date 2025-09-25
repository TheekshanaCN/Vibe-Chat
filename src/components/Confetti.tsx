import React from 'react';
import { motion } from 'framer-motion';
import { MOOD_MAP } from '@/lib/constants';
import type { Mood } from '@shared/types';
const NUM_CONFETTI = 50;
const ConfettiPiece = ({ color }: { color: string }) => {
  const x = Math.random() * 100;
  const y = -10 - Math.random() * 20;
  const rotate = Math.random() * 360;
  const scale = 0.5 + Math.random() * 0.5;
  const duration = 2 + Math.random() * 2;
  const delay = Math.random() * 1;
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}vw`,
        top: `${y}vh`,
        width: '10px',
        height: '10px',
        backgroundColor: color,
        rotate,
        scale,
      }}
      initial={{ y: `${y}vh`, opacity: 1 }}
      animate={{ y: '110vh', opacity: 0 }}
      transition={{ duration, ease: 'linear', delay }}
    />
  );
};
interface ConfettiProps {
  mood: Mood['name'] | null;
}
export function Confetti({ mood }: ConfettiProps) {
  if (!mood) return null;
  const moodColor = MOOD_MAP[mood]?.color || '#FFFFFF';
  const confettiPieces = Array.from({ length: NUM_CONFETTI }).map((_, i) => (
    <ConfettiPiece key={i} color={moodColor} />
  ));
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {confettiPieces}
    </div>
  );
}