// Audit logging (SPEC §32) — admin-initiated actions are always recorded.
import { prisma } from '../infrastructure/database/prisma.js';
import type { Prisma } from '@prisma/client';

export async function audit(input: {
  userId?: string | null;
  pageId?: string | null;
  action: string;
  entity?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  ip?: string;
}): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId ?? undefined,
        pageId: input.pageId ?? undefined,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        metadata: input.metadata,
        ip: input.ip,
      },
    });
  } catch {
    // Auditing must never break the request path; surface via logs instead.
    console.error('audit log write failed', input.action);
  }
}
