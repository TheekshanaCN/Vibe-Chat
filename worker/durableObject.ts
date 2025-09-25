import { DurableObject } from "cloudflare:workers";
import type { Message, VibeState, UpdatesResponse, User, LeaderboardEntry, Mood } from '@shared/types';
const MAX_MESSAGES = 100;
const USER_ACTIVE_TIMEOUT_MS = 30 * 1000; // 30 seconds
// Helper to get the current date as a YYYY-MM-DD string in UTC
const getTodayKey = () => {
    return new Date().toISOString().slice(0, 10);
}
export class GlobalDurableObject extends DurableObject {
    async updateUserActivity(nickname: string): Promise<void> {
        const usersObject: Record<string, number> = (await this.ctx.storage.get("active_users")) || {};
        const users = new Map(Object.entries(usersObject));
        users.set(nickname, Date.now());
        await this.ctx.storage.put("active_users", Object.fromEntries(users));
    }
    async addMessage(message: Message): Promise<void> {
        // Update user activity first
        await this.updateUserActivity(message.nickname);
        // Get current messages and mood counts
        let messages: Message[] = (await this.ctx.storage.get("messages")) || [];
        let moodCounts: VibeState = (await this.ctx.storage.get("mood_counts")) || {
            happy: 0, fire: 0, laugh: 0, mindblown: 0, sad: 0
        };
        // Add new message and update mood count
        messages.push(message);
        moodCounts[message.mood] = (moodCounts[message.mood] || 0) + 1;
        // Trim old messages if the list is too long
        if (messages.length > MAX_MESSAGES) {
            const removedMessage = messages.shift();
            if (removedMessage) {
                moodCounts[removedMessage.mood] = Math.max(0, (moodCounts[removedMessage.mood] || 0) - 1);
            }
        }
        // Update daily leaderboard
        const todayKey = `leaderboard_${getTodayKey()}`;
        let dailyCounts: VibeState = (await this.ctx.storage.get(todayKey)) || {
            happy: 0, fire: 0, laugh: 0, mindblown: 0, sad: 0
        };
        dailyCounts[message.mood] = (dailyCounts[message.mood] || 0) + 1;
        // Persist all updated state
        await this.ctx.storage.put("messages", messages);
        await this.ctx.storage.put("mood_counts", moodCounts);
        await this.ctx.storage.put(todayKey, dailyCounts);
    }
    async getUpdates(sinceTimestamp: number): Promise<UpdatesResponse> {
        // Get all messages and current mood counts
        const allMessages: Message[] = (await this.ctx.storage.get("messages")) || [];
        const vibeState: VibeState = (await this.ctx.storage.get("mood_counts")) || {
            happy: 0, fire: 0, laugh: 0, mindblown: 0, sad: 0
        };
        // Filter messages that are newer than the client's last known timestamp
        const newMessages = allMessages.filter(m => m.timestamp > sinceTimestamp);
        // Get active users
        const usersObject: Record<string, number> = (await this.ctx.storage.get("active_users")) || {};
        const users = new Map(Object.entries(usersObject));
        const now = Date.now();
        const activeUsers: User[] = [];
        const activeUsersMap = new Map<string, number>();
        // Filter out inactive users and rebuild the map for storage
        for (const [nickname, lastSeen] of users.entries()) {
            if (now - lastSeen < USER_ACTIVE_TIMEOUT_MS) {
                activeUsers.push({ nickname, lastSeen });
                activeUsersMap.set(nickname, lastSeen);
            }
        }
        // Only write back to storage if the map has changed
        if (activeUsersMap.size !== users.size) {
            await this.ctx.storage.put("active_users", Object.fromEntries(activeUsersMap));
        }
        // Get leaderboard data for today
        const todayKey = `leaderboard_${getTodayKey()}`;
        const dailyCounts: VibeState = (await this.ctx.storage.get(todayKey)) || {
            happy: 0, fire: 0, laugh: 0, mindblown: 0, sad: 0
        };
        const leaderboard: LeaderboardEntry[] = Object.entries(dailyCounts)
            .map(([mood, count]) => ({ mood: mood as Mood['name'], count }))
            .sort((a, b) => b.count - a.count);
        return {
            messages: newMessages,
            vibeState: vibeState,
            activeUsers: activeUsers.sort((a, b) => a.nickname.localeCompare(b.nickname)),
            leaderboard: leaderboard,
        };
    }
}