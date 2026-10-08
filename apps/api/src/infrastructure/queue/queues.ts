// Queue definitions for BullMQ (SPEC §29).
// Long-running AI/API work must run here — never inside HTTP requests.
import { Queue } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { getRedis } from '../redis/redis.js';

export const QUEUE_NAMES = [
  'trend-research',
  'content-generation',
  'image-generation',
  'quality-check',
  'facebook-publish',
  'comment-processing',
  'analytics-sync',
  'learning',
] as const;

export type QueueName = (typeof QUEUE_NAMES)[number];

// Retry with exponential backoff; keep completed jobs for a day for the
// dashboard, keep failed jobs for a week so nothing is silently lost.
export const defaultJobOptions = {
  attempts: 3,
  backoff: { type: 'exponential' as const, delay: 5_000 },
  removeOnComplete: { age: 24 * 3600, count: 500 },
  removeOnFail: { age: 7 * 24 * 3600 },
};

const queueCache = new Map<QueueName, Queue>();

export function getQueue(name: QueueName): Queue {
  let queue = queueCache.get(name);
  if (!queue) {
    const connection = getRedis() as unknown as ConnectionOptions;
    queue = new Queue(name, { connection, defaultJobOptions });
    queueCache.set(name, queue);
  }
  return queue;
}

export async function closeQueues(): Promise<void> {
  await Promise.all([...queueCache.values()].map((q) => q.close()));
  queueCache.clear();
}
