import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/app/providers"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Admin Dashboard - PeptideLabs",
  robots: "noindex, nofollow",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body>
        <Providers>
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Toaster />
          <GoogleAnalytics />
        </Providers>
      </body>
    </html>
  )
}
