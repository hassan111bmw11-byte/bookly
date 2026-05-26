import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const email = 'login-test@example.com';
const password = 'Password123!';
const normalizedEmail = email.toLowerCase();
const hashed = bcrypt.hashSync(password, 12);

async function main() {
  const user = await prisma.user.upsert({
    where: { email: normalizedEmail },
    update: {
      password: hashed,
      name: 'Login Test User',
      phoneNumber: '0000000000',
      parentPhoneNumber: null,
      role: 'STUDENT',
    },
    create: {
      email: normalizedEmail,
      name: 'Login Test User',
      phoneNumber: '0000000000',
      parentPhoneNumber: null,
      password: hashed,
      role: 'STUDENT',
    },
  });
  console.log('user created', user.id, user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
