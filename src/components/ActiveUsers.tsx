import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserIcon } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export function ActiveUsers() {
  const activeUsers = useChatStore((state) => state.activeUsers);
  return (
    <Card className="bg-black/30 border-2 border-mood-2 shadow-glow-mood-2 backdrop-blur-sm flex-grow flex flex-col">
      <CardHeader>
        <CardTitle className="font-display text-mood-2 text-lg tracking-widest">
          ACTIVE USERS ({activeUsers.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <AnimatePresence>
          {activeUsers.length > 0 ? (
            <ul className="space-y-2">
              {activeUsers.map((user) => (
                <motion.li
                  key={user.nickname}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2 text-yellow-300"
                >
                  <UserIcon className="h-4 w-4 text-mood-1" />
                  <span className="truncate">{user.nickname}</span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-mood-2/50 italic">No other active users.</p>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}