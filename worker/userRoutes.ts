import { Hono } from "hono";
import { v4 as uuidv4 } from 'uuid';
import { Env } from './core-utils';
import type { Message, ApiResponse, UpdatesResponse } from '@shared/types';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // Endpoint to post a new message to a specific room
    app.post('/api/room/:roomId/messages', async (c) => {
        try {
            const { roomId } = c.req.param();
            if (!roomId) {
                return c.json({ success: false, error: 'Room ID is required' }, 400);
            }
            const body = await c.req.json();
            if (!body.nickname || !body.text || !body.mood) {
                return c.json({ success: false, error: 'Missing required fields' }, 400);
            }
            const message: Message = {
                id: uuidv4(),
                nickname: body.nickname,
                text: body.text,
                mood: body.mood,
                timestamp: Date.now(),
            };
            const doId = c.env.GlobalDurableObject.idFromName(roomId);
            const stub = c.env.GlobalDurableObject.get(doId);
            await stub.addMessage(message);
            return c.json({ success: true } satisfies ApiResponse<null>);
        } catch (error) {
            console.error("Error posting message:", error);
            return c.json({ success: false, error: 'Failed to post message' }, 500);
        }
    });
    // Endpoint to poll for updates for a specific room
    app.get('/api/room/:roomId/updates', async (c) => {
        try {
            const { roomId } = c.req.param();
            if (!roomId) {
                return c.json({ success: false, error: 'Room ID is required' }, 400);
            }
            const { since } = c.req.query();
            const sinceTimestamp = since ? parseInt(since, 10) : 0;
            if (isNaN(sinceTimestamp)) {
                return c.json({ success: false, error: 'Invalid "since" timestamp' }, 400);
            }
            const doId = c.env.GlobalDurableObject.idFromName(roomId);
            const stub = c.env.GlobalDurableObject.get(doId);
            const data = await stub.getUpdates(sinceTimestamp);
            return c.json({ success: true, data } satisfies ApiResponse<UpdatesResponse>);
        } catch (error) {
            console.error("Error fetching updates:", error);
            return c.json({ success: false, error: 'Failed to fetch updates' }, 500);
        }
    });
}