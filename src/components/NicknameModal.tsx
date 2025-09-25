import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface NicknameModalProps {
  isOpen: boolean;
  onSetNickname: (nickname: string) => void;
}
export function NicknameModal({ isOpen, onSetNickname }: NicknameModalProps) {
  const [nickname, setNickname] = useState('');
  const handleSubmit = () => {
    if (nickname.trim()) {
      onSetNickname(nickname.trim());
    }
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-black/80 border-2 border-mood-1 shadow-glow-mood-1 text-mood-2 font-display backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-mood-1 text-2xl">WELCOME TO VIBECHAT</DialogTitle>
          <DialogDescription className="text-mood-2/80">
            Choose a nickname to enter the chat room.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter your nickname..."
            className="bg-transparent border-2 border-mood-2 text-mood-2 placeholder:text-mood-2/50 focus:ring-mood-2 focus:border-mood-2"
            maxLength={15}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="w-full bg-mood-1 text-black hover:bg-mood-1/80 font-display tracking-widest"
          >
            JOIN CHAT
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}