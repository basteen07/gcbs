import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.stat.deleteMany({
    where: { label: 'Years of Experience' },
  })
  console.log('Removed "Years of Experience" stat')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
