import { notFound } from "next/navigation"
import { ProductDetails } from "./ProductDetails"
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { getProductBySlug, getRelatedProducts } from "@/lib/queries"

interface PageProps {
  params: { slug: string }
}

export const revalidate = 3600

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bestexpresspeptides.com"
  const lowestPrice = product.variants.length > 0 ? product.variants[0].price : 0

  const breadcrumbItems = [
    { name: "Home", url: baseUrl },
    { name: "Peptides", url: `${baseUrl}/peptides` },
    { name: product.category.name, url: `${baseUrl}/peptides?category=${product.category.slug}` },
    { name: product.name, url: `${baseUrl}/peptides/${product.slug}` },
  ]

  return (
    <>
      <ProductJsonLd
        name={product.name}
        description={product.shortDescription || product.description.substring(0, 160)}
        image={product.images[0]}
        sku={product.sku}
        price={lowestPrice}
        category={product.category.name}
        url={`${baseUrl}/peptides/${product.slug}`}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.name} | Research Grade Peptide - BestExpressPeptides`,
    description: product.shortDescription || product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description.substring(0, 160),
      images: product.images.slice(0, 1),
      type: 'website',
    },
    keywords: `${product.name}, research peptide, laboratory grade`,
  }
}
