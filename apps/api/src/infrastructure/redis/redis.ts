// Redis connection for BullMQ and ad-hoc checks (SPEC §29).
import Redis from 'ioredis';
import { env } from '../../config/env.js';
import { ConfigurationError } from '../../common/errors.js';

const globalForRedis = globalThis as unknown as { viralmindRedis?: Redis };

export function getRedis(): Redis {
  if (!env.REDIS_URL) throw new ConfigurationError('REDIS_URL is not configured — the queue system is unavailable.');
  if (!globalForRedis.viralmindRedis) {
    globalForRedis.viralmindRedis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null, // required by BullMQ
      enableReadyCheck: true,
      lazyConnect: false,
    });
  }
  return globalForRedis.viralmindRedis;
}

// Workers need their own connection because BullMQ issues blocking commands.
export function createWorkerConnection(): Redis {
  if (!env.REDIS_URL) throw new ConfigurationError('REDIS_URL is not configured — workers cannot start.');
  return new Redis(env.REDIS_URL, { maxRetriesPerRequest: null });
}

export async function redisPing(): Promise<boolean> {
  try {
    const pong = await getRedis().ping();
    return pong === 'PONG';
  } catch {
    return false;
  }
}

export async function closeRedis(): Promise<void> {
  if (globalForRedis.viralmindRedis) {
    await globalForRedis.viralmindRedis.quit().catch(() => globalForRedis.viralmindRedis?.disconnect());
    globalForRedis.viralmindRedis = undefined;
  }
}
