import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useChatStore } from '@/store/chatStore';
import { MOODS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export function VibeMeter() {
  const vibeState = useChatStore((state) => state.vibeState);
  const data = MOODS.map(mood => ({
    name: mood.emoji,
    value: vibeState[mood.name] || 0,
    color: mood.color,
  }));
  const totalVibes = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <Card className="bg-black/30 border-2 border-mood-1 shadow-glow-mood-1 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-display text-mood-1 text-lg tracking-widest">VIBE METER</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fill: '#00FFFF', fontSize: 20 }} axisLine={{ stroke: '#FF00FF' }} tickLine={{ stroke: '#FF00FF' }} />
              <YAxis tick={{ fill: '#00FFFF' }} axisLine={{ stroke: '#FF00FF' }} tickLine={{ stroke: '#FF00FF' }} />
              <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-mood-2 mt-2">Total Vibes: {totalVibes}</p>
      </CardContent>
    </Card>
  );
}