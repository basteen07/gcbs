import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function withPoolerParams(url?: string) {
  if (!url) return undefined

  try {
    const parsed = new URL(url)
    const isTransactionPooler =
      parsed.hostname.includes('pooler.supabase.com') || parsed.port === '6543'

    if (isTransactionPooler) {
      if (!parsed.searchParams.has('pgbouncer')) parsed.searchParams.set('pgbouncer', 'true')
      if (!parsed.searchParams.has('connection_limit')) parsed.searchParams.set('connection_limit', '1')
      if (!parsed.searchParams.has('pool_timeout')) parsed.searchParams.set('pool_timeout', '20')
    }

    return parsed.toString()
  } catch {
    return url
  }
}

const datasourceUrl = withPoolerParams(process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: datasourceUrl ? { db: { url: datasourceUrl } } : undefined,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

globalForPrisma.prisma = prisma

export default prisma
