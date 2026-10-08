// AI activity timeline (SPEC §38) — what the agent did, shown in the dashboard.
import { prisma } from '../infrastructure/database/prisma.js';
import type { ActivityKind, Prisma } from '@prisma/client';

export async function logActivity(input: {
  pageId: string;
  kind: ActivityKind;
  message: string;
  meta?: Prisma.InputJsonValue;
}): Promise<void> {
  try {
    await prisma.pageActivity.create({
      data: {
        pageId: input.pageId,
        kind: input.kind,
        message: input.message,
        meta: input.meta,
      },
    });
  } catch {
    console.error('activity log write failed', input.kind);
  }
}
