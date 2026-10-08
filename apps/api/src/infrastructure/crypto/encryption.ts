// AES-256-GCM encryption for secrets at rest (Facebook tokens, SPEC §32).
// Ciphertext format: "v1:<iv-b64>:<authTag-b64>:<cipher-b64>"
import crypto from 'node:crypto';
import { env } from '../../config/env.js';
import { ConfigurationError } from '../../common/errors.js';

const VERSION = 'v1';

function getKey(): Buffer {
  if (!env.ENCRYPTION_KEY) throw new ConfigurationError('ENCRYPTION_KEY is not configured — cannot encrypt secrets.');
  // Derive a stable 32-byte key from the configured passphrase.
  return crypto.createHash('sha256').update(env.ENCRYPTION_KEY, 'utf8').digest();
}

export function encryptSecret(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [VERSION, iv.toString('base64'), authTag.toString('base64'), encrypted.toString('base64')].join(':');
}

export function decryptSecret(payload: string): string {
  const [version, ivB64, tagB64, dataB64] = payload.split(':');
  if (version !== VERSION || !ivB64 || !tagB64 || !dataB64) {
    throw new ConfigurationError('Malformed encrypted payload — was it encrypted with a different key?');
  }
  const decipher = crypto.createDecipheriv('aes-256-gcm', getKey(), Buffer.from(ivB64, 'base64'));
  decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
  return Buffer.concat([decipher.update(Buffer.from(dataB64, 'base64')), decipher.final()]).toString('utf8');
}
