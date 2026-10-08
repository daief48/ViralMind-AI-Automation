// Seed reference data (regions, languages, niches) and the initial admin user.
// Run: npm run db:seed
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const REGIONS = [
  { code: 'BD', name: 'Bangladesh', timezone: 'Asia/Dhaka', defaultLanguages: ['bn'], currency: 'BDT' },
  { code: 'IN', name: 'India', timezone: 'Asia/Kolkata', defaultLanguages: ['en', 'hi'], currency: 'INR' },
  { code: 'PK', name: 'Pakistan', timezone: 'Asia/Karachi', defaultLanguages: ['ur', 'en'], currency: 'PKR' },
  { code: 'US', name: 'United States', timezone: 'America/New_York', defaultLanguages: ['en'], currency: 'USD' },
  { code: 'GB', name: 'United Kingdom', timezone: 'Europe/London', defaultLanguages: ['en'], currency: 'GBP' },
  { code: 'CA', name: 'Canada', timezone: 'America/Toronto', defaultLanguages: ['en'], currency: 'CAD' },
  { code: 'AU', name: 'Australia', timezone: 'Australia/Sydney', defaultLanguages: ['en'], currency: 'AUD' },
  { code: 'GLOBAL', name: 'Global', timezone: 'UTC', defaultLanguages: ['en'], currency: 'USD' },
];

const LANGUAGES = [
  { code: 'bn', name: 'Bangla' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ur', name: 'Urdu' },
];

const NICHES = [
  { slug: 'trading', name: 'Trading', keywords: ['trading', 'stocks', 'forex', 'technical analysis'] },
  { slug: 'crypto', name: 'Crypto', keywords: ['bitcoin', 'ethereum', 'crypto', 'blockchain'] },
  { slug: 'finance', name: 'Finance', keywords: ['investing', 'personal finance', 'markets'] },
  { slug: 'technology', name: 'Technology', keywords: ['ai', 'gadgets', 'software', 'startups'] },
  { slug: 'news', name: 'News', keywords: ['breaking', 'current events', 'politics'] },
  { slug: 'education', name: 'Education', keywords: ['learning', 'courses', 'tutorials'] },
  { slug: 'fitness', name: 'Fitness', keywords: ['workout', 'health', 'gym'] },
  { slug: 'food', name: 'Food', keywords: ['recipes', 'cooking', 'restaurant'] },
  { slug: 'fashion', name: 'Fashion', keywords: ['style', 'outfits', 'beauty'] },
  { slug: 'business', name: 'Business', keywords: ['entrepreneurship', 'marketing', 'growth'] },
  { slug: 'entertainment', name: 'Entertainment', keywords: ['movies', 'music', 'celebrities'] },
];

const DEFAULT_WEIGHTS = {
  searchTrend: 30,
  newsMomentum: 20,
  marketMovement: 20,
  regionalRelevance: 15,
  historicalPerformance: 10,
  competition: 5,
};

async function main() {
  for (const r of REGIONS) {
    await prisma.region.upsert({ where: { code: r.code }, update: { ...r }, create: r });
  }
  for (const l of LANGUAGES) {
    await prisma.language.upsert({ where: { code: l.code }, update: { ...l }, create: l });
  }
  for (const n of NICHES) {
    await prisma.niche.upsert({ where: { slug: n.slug }, update: { ...n }, create: n });
  }
  console.log(`Seeded ${REGIONS.length} regions, ${LANGUAGES.length} languages, ${NICHES.length} niches.`);

  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@viralmind.local';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe#2026!';
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.user.upsert({
    where: { email },
    update: { isActive: true },
    create: { email, passwordHash, name: 'ViralMind Admin', role: 'ADMIN' },
  });
  console.log(`Admin user ready: ${admin.email} (password from SEED_ADMIN_PASSWORD)`);
  console.log(`Default scoring weights: ${JSON.stringify(DEFAULT_WEIGHTS)}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
