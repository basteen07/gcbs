import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating database...')

  // Update stats - remove old stats and add "100% Employment Rate"
  await prisma.stat.deleteMany({})
  await prisma.stat.createMany({
    data: [
      { label: 'Employment Rate', value: '100%', sortOrder: 1, isActive: true },
      { label: 'Industry Partners', value: '50+', sortOrder: 2, isActive: true },
      { label: 'Years of Experience', value: '15+', sortOrder: 3, isActive: true },
      { label: 'Student Satisfaction', value: '98%', sortOrder: 4, isActive: true },
    ],
  })
  console.log('Stats updated')

  // Update contact phone
  await prisma.siteSetting.upsert({
    where: { key: 'contact_phone' },
    update: { value: '9894843822' },
    create: { key: 'contact_phone', value: '9894843822', type: 'text', group: 'contact' },
  })
  console.log('Contact phone updated')

  // Add new partners
  await prisma.partner.createMany({
    data: [
      { name: "McDonald's", logoUrl: '/images/partners/mcd.png', type: 'INDUSTRY', sortOrder: 1, isActive: true },
      { name: "Domino's Pizza", logoUrl: '/images/partners/dominos.png', type: 'INDUSTRY', sortOrder: 2, isActive: true },
      { name: 'We Chai', logoUrl: '/images/partners/wechai.png', type: 'INDUSTRY', sortOrder: 3, isActive: true },
      { name: 'Chai Kings', logoUrl: '/images/partners/chaikings.png', type: 'INDUSTRY', sortOrder: 4, isActive: true },
    ],
    skipDuplicates: true,
  })
  console.log('Partners added')

  console.log('Done!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
