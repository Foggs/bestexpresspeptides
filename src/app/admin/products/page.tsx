"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, LogOut, Plus } from "lucide-react"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  active: boolean
  featured: boolean
  createdAt: string
}

interface AdminUser {
  id: string
  email: string
  name: string
}

export default function ProductsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [adminToken, setAdminToken] = useState<string | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const savedToken = localStorage.getItem("adminToken")
    const savedUser = localStorage.getItem("adminUser")
    if (savedToken && savedUser) {
      setAdminToken(savedToken)
      setAdminUser(JSON.parse(savedUser))
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    setAdminToken(null)
    setAdminUser(null)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!adminToken) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Please log in to access the admin dashboard.</p>
            <Button onClick={() => router.push("/admin/login")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Manage Products</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {adminUser?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Button onClick={() => router.push("/admin/products/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Product
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center py-8">
              Product management coming soon. Products can be created and edited here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
