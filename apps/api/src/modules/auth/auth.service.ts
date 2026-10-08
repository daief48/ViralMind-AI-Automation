import bcrypt from 'bcryptjs';
import { prisma } from '../../infrastructure/database/prisma.js';
import { signAuthToken, type AuthUser } from '../../common/auth.js';
import { UnauthorizedError, ConflictError } from '../../common/errors.js';
import type { LoginInput, RegisterInput } from './auth.schemas.js';

const BCRYPT_ROUNDS = 12;

export async function registerUser(input: RegisterInput): Promise<AuthUser> {
  const existing = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (existing) throw new ConflictError('An account with this email already exists');
  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      passwordHash: await bcrypt.hash(input.password, BCRYPT_ROUNDS),
      name: input.name,
      role: 'ADMIN',
    },
  });
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export async function login(input: LoginInput): Promise<{ user: AuthUser; token: string }> {
  const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  // Same error for unknown email and wrong password — no account enumeration.
  if (!user || !user.isActive) throw new UnauthorizedError('Invalid email or password');
  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw new UnauthorizedError('Invalid email or password');

  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  const authUser: AuthUser = { id: user.id, email: user.email, name: user.name, role: user.role };
  return { user: authUser, token: signAuthToken(authUser) };
}

export async function getMe(userId: string): Promise<AuthUser> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.isActive) throw new UnauthorizedError('Account is disabled or no longer exists');
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}
