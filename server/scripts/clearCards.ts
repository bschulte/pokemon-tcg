import { prisma } from '../src/client';

async function main() {
  await prisma.rule.deleteMany();
  await prisma.attack.deleteMany();
  await prisma.ability.deleteMany();
  await prisma.card.deleteMany();
  process.exit();
}

main();
