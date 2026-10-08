// Authentication: JWT (Bearer or httpOnly cookie) + user resolution.
import jwt from 'jsonwebtoken';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../infrastructure/database/prisma.js';
import { env, isProd } from '../config/env.js';
import { UnauthorizedError } from './errors.js';
import type { Role } from '@prisma/client';

export const AUTH_COOKIE = 'vm_token';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser;
    rawBody?: string;
  }
}

export function signAuthToken(user: AuthUser): string {
  return jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

async function resolveUserFromToken(token: string): Promise<AuthUser> {
  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
  } catch {
    throw new UnauthorizedError('Invalid or expired session');
  }
  if (!payload.sub) throw new UnauthorizedError('Invalid session');
  const user = await prisma.user.findUnique({ where: { id: String(payload.sub) } });
  if (!user || !user.isActive) throw new UnauthorizedError('Account is disabled or no longer exists');
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export async function authenticate(request: FastifyRequest): Promise<void> {
  const header = request.headers.authorization;
  const bearer = header?.startsWith('Bearer ') ? header.slice(7).trim() : undefined;
  const token = bearer ?? request.cookies[AUTH_COOKIE];
  if (!token) throw new UnauthorizedError();
  request.user = await resolveUserFromToken(token);
}

export function setAuthCookie(reply: FastifyReply, token: string): void {
  reply.setCookie(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge: 7 * 24 * 3600,
  });
}

export function clearAuthCookie(reply: FastifyReply): void {
  reply.clearCookie(AUTH_COOKIE, { path: '/' });
}

// Runs a route-registration callback inside an encapsulated scope where every
// route requires an authenticated user.
export function withAuth(app: FastifyInstance, registerRoutes: (scope: FastifyInstance) => void): void {
  app.register(async (scope) => {
    scope.addHook('preHandler', async (request) => {
      await authenticate(request);
    });
    registerRoutes(scope);
  });
}

export async function currentUser(request: FastifyRequest): Promise<AuthUser> {
  if (!request.user) throw new UnauthorizedError();
  return request.user;
}
