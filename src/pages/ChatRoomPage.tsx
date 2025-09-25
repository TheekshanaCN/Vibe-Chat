import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInterval } from 'react-use';
import { Toaster, toast } from '@/components/ui/sonner';
import { useChatStore } from '@/store/chatStore';
import { NicknameModal } from '@/components/NicknameModal';
import { VibeMeter } from '@/components/VibeMeter';
import { MessageBubble } from '@/components/MessageBubble';
import { ChatInput } from '@/components/ChatInput';
import { ActiveUsers } from '@/components/ActiveUsers';
import { Confetti } from '@/components/Confetti';
import { Leaderboard } from '@/components/Leaderboard';
import type { Message, Mood, ApiResponse, UpdatesResponse } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArrowLeft, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
export function ChatRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { nickname, messages, vibeState, setNickname, addMessages, setVibeState, setActiveUsers, setLeaderboard, resetState } = useChatStore();
  const lastTimestampRef = useRef(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [dominantMood, setDominantMood] = useState<Mood['name'] | null>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    resetState();
    lastTimestampRef.current = 0;
    return () => {
      resetState();
    };
  }, [roomId, resetState]);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    const totalVibes = Object.values(vibeState).reduce((sum, count) => sum + count, 0);
    if (totalVibes < 5) {
      setDominantMood(null);
      return;
    }
    let maxVibe = 0;
    let currentDominantMood: Mood['name'] | null = null;
    for (const [mood, count] of Object.entries(vibeState)) {
      if (count > maxVibe) {
        maxVibe = count;
        currentDominantMood = mood as Mood['name'];
      }
    }
    if (currentDominantMood && maxVibe / totalVibes > 0.5) {
      if (dominantMood !== currentDominantMood) {
        setDominantMood(currentDominantMood);
        setTimeout(() => setDominantMood(null), 4000); // Confetti lasts 4s
      }
    }
  }, [vibeState, dominantMood]);
  const fetchUpdates = async () => {
    if (!nickname || !roomId) return;
    try {
      const response = await fetch(`/api/room/${roomId}/updates?since=${lastTimestampRef.current}`);
      const result: ApiResponse<UpdatesResponse> = await response.json();
      if (result.success && result.data) {
        if (result.data.messages.length > 0) {
          addMessages(result.data.messages);
          lastTimestampRef.current = result.data.messages[result.data.messages.length - 1].timestamp;
        }
        setVibeState(result.data.vibeState);
        setActiveUsers(result.data.activeUsers);
        setLeaderboard(result.data.leaderboard);
      }
    } catch (error) {
      console.error('Failed to fetch updates:', error);
    }
  };
  useInterval(fetchUpdates, 2500);
  const handleSetNickname = (name: string) => {
    setNickname(name);
    lastTimestampRef.current = 0;
    setTimeout(fetchUpdates, 100);
  };
  const handleSendMessage = async (text: string, mood: Mood['name']) => {
    if (!nickname || !roomId) return;
    try {
      await fetch(`/api/room/${roomId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, text, mood }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error("Failed to send message.");
    }
  };
  const handleCopyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Room link copied to clipboard!");
    }
  };
  const SidebarContent = () => (
    <div className="flex flex-col space-y-8 h-full">
      <div className="p-4 bg-black/30 border-2 border-mood-2 shadow-glow-mood-2 backdrop-blur-sm">
        <h2 className="font-display text-mood-2 text-lg tracking-widest mb-2">SHARE ROOM</h2>
        <p className="text-yellow-300 font-mono break-all select-all cursor-pointer text-sm" onClick={handleCopyRoomId}>
          Click to copy link
        </p>
      </div>
      <Leaderboard />
      <VibeMeter />
      <ActiveUsers />
    </div>
  );
  return (
    <main className="h-screen w-screen flex flex-col bg-black text-cyan-400 font-mono overflow-hidden">
      <Confetti mood={dominantMood} />
      <header className="flex items-center justify-between p-2 md:p-4 border-b-2 border-mood-1/50 shadow-glow-mood-1">
        <Link to="/">
          <Button variant="ghost" className="text-mood-2 hover:bg-mood-2/20 hover:text-mood-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-center font-display text-xl md:text-3xl text-mood-1 tracking-widest animate-fade-in">
          VIBECHAT
        </h1>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-mood-2 hover:bg-mood-2/20 hover:text-mood-2">
                <Users className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black/80 border-l-2 border-mood-1 shadow-glow-mood-1 text-mood-2 font-display backdrop-blur-md p-4 pt-10 overflow-y-auto">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        ) : (
          <div className="w-24"></div>
        )}
      </header>
      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden">
        <div className="md:col-span-2 flex flex-col h-full bg-black/30 border-2 border-mood-1 shadow-glow-mood-1 backdrop-blur-sm">
          <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isOwnMessage={msg.nickname === nickname} />
            ))}
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
        <div className="hidden md:flex md:flex-col h-full overflow-y-auto pr-2">
          <SidebarContent />
        </div>
      </div>
      <NicknameModal isOpen={!nickname} onSetNickname={handleSetNickname} />
      <Toaster richColors theme="dark" position="top-center" />
    </main>
  );
}