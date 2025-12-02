import { cache } from 'react'
import { prisma } from './prisma'

export const productListSelect = {
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  images: true,
  featured: true,
  active: true,
  category: {
    select: {
      name: true,
      slug: true,
    },
  },
  variants: {
    select: {
      id: true,
      name: true,
      price: true,
    },
  },
} as const

export const categoryWithCountSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  _count: {
    select: { products: true },
  },
} as const

export const getFeaturedProducts = cache(async () => {
  try {
    return await prisma.product.findMany({
      where: {
        featured: true,
        active: true,
      },
      select: productListSelect,
      take: 6,
    })
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
})

export const getCategoriesWithCount = cache(async () => {
  try {
    return await prisma.category.findMany({
      select: categoryWithCountSelect,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
})

export const getProducts = cache(async (options?: {
  category?: string
  search?: string
  sort?: string
}) => {
  try {
    const where: any = { active: true }
    
    if (options?.category) {
      where.category = { slug: options.category }
    }
    
    if (options?.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { shortDescription: { contains: options.search, mode: 'insensitive' } },
      ]
    }

    let orderBy: any = { createdAt: 'desc' }
    if (options?.sort === 'price-asc') {
      orderBy = { variants: { _min: { price: 'asc' } } }
    } else if (options?.sort === 'price-desc') {
      orderBy = { variants: { _max: { price: 'desc' } } }
    } else if (options?.sort === 'name') {
      orderBy = { name: 'asc' }
    }

    return await prisma.product.findMany({
      where,
      select: productListSelect,
      orderBy,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
})

export const getProductBySlug = cache(async (slug: string) => {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: {
          orderBy: { price: 'asc' },
        },
      },
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
})

export const getRelatedProducts = cache(async (categoryId: string, excludeProductId: string) => {
  try {
    return await prisma.product.findMany({
      where: {
        categoryId,
        id: { not: excludeProductId },
        active: true,
      },
      select: productListSelect,
      take: 4,
    })
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
})
