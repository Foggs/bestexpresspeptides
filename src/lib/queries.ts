import { cache } from 'react'
import { prisma } from './prisma'

export const getOrdersByUser = cache(async (userId: string) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: true,
    },
    orderBy: { createdAt: 'desc' },
  })
})
