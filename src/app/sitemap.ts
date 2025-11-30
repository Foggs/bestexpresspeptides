import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export async function generateSitemaps() {
  const productsCount = await prisma.product.count()
  return Array.from({ length: Math.ceil(productsCount / 50000) }, (_, i) => ({ id: i }))
}

export async function generateMetadata({ id }: { id: number }) {
  return {
    title: `Sitemap ${id + 1}`,
  }
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://peptidelabs.com'
  const skip = id * 50000
  const take = 50000

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/peptides`,
      changeFrequency: 'daily',
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'monthly',
      priority: 0.5,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.5,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/disclaimer`,
      changeFrequency: 'monthly',
      priority: 0.7,
      lastModified: new Date(),
    },
  ]

  if (id === 0) {
    // Get dynamic product routes
    const products = await prisma.product.findMany({
      where: { active: true },
      select: { slug: true, updatedAt: true },
      skip,
      take,
    })

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/peptides/${product.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      lastModified: product.updatedAt,
    }))

    return [...staticRoutes, ...productRoutes]
  }

  const products = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
    skip,
    take,
  })

  return products.map((product) => ({
    url: `${baseUrl}/peptides/${product.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: product.updatedAt,
  }))
}
