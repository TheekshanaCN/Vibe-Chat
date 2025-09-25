import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Globe } from 'lucide-react';
const PUBLIC_ROOM_ID = "VIBE-TOWN";
export function HomePage() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  const handleCreateRoom = () => {
    const newRoomId = uuidv4().slice(0, 8);
    navigate(`/room/${newRoomId}`);
  };
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim()}`);
    }
  };
  const handleJoinPublicRoom = () => {
    navigate(`/room/${PUBLIC_ROOM_ID}`);
  };
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-black text-cyan-400 font-mono p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-black/50 border-2 border-mood-1 shadow-glow-mood-1 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-mood-1 text-3xl md:text-4xl tracking-widest animate-fade-in">
              VIBECHAT
            </CardTitle>
            <CardDescription className="text-mood-2/80 pt-2">
              Join the retro-wave conversation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
                <Button
                    onClick={handleJoinPublicRoom}
                    className="w-full bg-mood-3 text-black hover:bg-mood-3/80 font-display tracking-widest transition-all hover:shadow-glow-mood-3 flex items-center gap-2"
                >
                    <Globe className="h-4 w-4" />
                    Join The Global Vibe Lounge
                </Button>
                <Button
                    onClick={handleCreateRoom}
                    variant="outline"
                    className="w-full bg-transparent border-2 border-mood-1 text-mood-1 hover:bg-mood-1 hover:text-black font-display tracking-widest transition-all hover:shadow-glow-mood-1"
                >
                    CREATE A PRIVATE ROOM
                </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Separator className="flex-1 bg-mood-1/50" />
              <span className="text-mood-1/80">OR</span>
              <Separator className="flex-1 bg-mood-1/50" />
            </div>
            <form onSubmit={handleJoinRoom} className="space-y-2">
              <p className="text-center text-mood-2/80 text-sm">Got a private room ID?</p>
              <div className="flex gap-2">
                <Input
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter Room ID..."
                    className="flex-grow bg-transparent border-2 border-mood-2 text-mood-2 text-center placeholder:text-mood-2/50 focus:ring-mood-2 focus:border-mood-2 font-display tracking-widest"
                />
                <Button
                    type="submit"
                    className="bg-mood-2 text-black hover:bg-mood-2/80 font-display tracking-widest transition-all hover:shadow-glow-mood-2"
                >
                    JOIN
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}