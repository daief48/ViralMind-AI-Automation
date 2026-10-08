import type { FastifyInstance } from 'fastify';
import { registerSchema, loginSchema } from './auth.schemas.js';
import { registerUser, login, getMe } from './auth.service.js';
import { setAuthCookie, clearAuthCookie, authenticate, currentUser } from '../../common/auth.js';
import { audit } from '../../common/audit.js';
import { ValidationError } from '../../common/errors.js';
import { ZodError } from 'zod';

// Auth endpoints are public but strictly rate-limited (brute-force protection).
const AUTH_RATE_LIMIT = {
  config: { rateLimit: { max: 10, timeWindow: '1 minute' } },
};

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post('/register', AUTH_RATE_LIMIT, async (request, reply) => {
    const input = registerSchema.parse(request.body);
    const user = await registerUser(input);
    const token = signAuthTokenPublic(user);
    setAuthCookie(reply, token);
    await audit({ userId: user.id, action: 'auth.register', entity: 'User', entityId: user.id, ip: request.ip });
    return reply.code(201).send({ user, token });
  });

  app.post('/login', AUTH_RATE_LIMIT, async (request, reply) => {
    const input = loginSchema.parse(request.body);
    const { user, token } = await login(input);
    setAuthCookie(reply, token);
    await audit({ userId: user.id, action: 'auth.login', entity: 'User', entityId: user.id, ip: request.ip });
    return { user, token };
  });

  app.post('/logout', async (request, reply) => {
    clearAuthCookie(reply);
    if (request.user) await audit({ userId: request.user.id, action: 'auth.logout', ip: request.ip });
    return { ok: true };
  });

  app.get('/me', { preHandler: authenticate }, async (request) => {
    const me = await currentUser(request);
    return { user: me };
  });
}

// Local helper to avoid an import cycle with common/auth (signAuthToken is there).
function signAuthTokenPublic(user: { id: string; email: string; name: string; role: 'ADMIN' | 'EDITOR' | 'VIEWER' }): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { signAuthToken } = require('../../common/auth.js') as typeof import('../../common/auth.js');
  return signAuthToken(user);
}

export { ZodError };
