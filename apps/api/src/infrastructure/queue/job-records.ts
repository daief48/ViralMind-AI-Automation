// Persistent mirror of BullMQ jobs in the AIJob table (SPEC §27, §29).
// Every queued job gets a database record with id/status/retries/error/timestamps.
import { prisma } from '../database/prisma.js';
import type { Prisma } from '@prisma/client';

export interface JobEnvelope {
  recordId: string;
  payload: unknown;
}

export async function createJobRecord(input: {
  pageId?: string | null;
  queue: string;
  type: string;
  payload?: unknown;
  maxAttempts?: number;
}) {
  return prisma.aIJob.create({
    data: {
      pageId: input.pageId ?? undefined,
      queue: input.queue,
      type: input.type,
      status: 'QUEUED',
      payload: (input.payload as Prisma.InputJsonValue) ?? undefined,
      maxAttempts: input.maxAttempts ?? 3,
    },
  });
}

export async function linkBullJob(recordId: string, bullJobId: string): Promise<void> {
  await prisma.aIJob.update({ where: { id: recordId }, data: { bullJobId } }).catch(() => undefined);
}

export async function markJobActive(recordId: string): Promise<void> {
  await prisma.aIJob
    .update({ where: { id: recordId }, data: { status: 'ACTIVE', startedAt: new Date() } })
    .catch(() => undefined);
}

export async function markJobCompleted(recordId: string, result: unknown): Promise<void> {
  await prisma.aIJob
    .update({
      where: { id: recordId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        result: result as Prisma.InputJsonValue,
        error: null,
      },
    })
    .catch(() => undefined);
}

export async function markJobFailed(recordId: string, error: string, attemptsMade: number, maxAttempts: number): Promise<void> {
  const dead = attemptsMade >= maxAttempts;
  await prisma.aIJob
    .update({
      where: { id: recordId },
      data: {
        status: dead ? 'DEAD' : 'FAILED',
        error,
        retries: Math.max(0, attemptsMade - 1),
        completedAt: dead ? new Date() : undefined,
      },
    })
    .catch(() => undefined);
}

export async function findJobRecord(recordId: string) {
  return prisma.aIJob.findUnique({ where: { id: recordId } });
}
