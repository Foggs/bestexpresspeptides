"use client"

import { usePathname } from "next/navigation"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { AgeVerification } from "./AgeVerification"
import { DisclaimerBanner } from "./DisclaimerBanner"
import type React from "react"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith("/admin")

  return (
    <>
      {!isAdminPage && <AgeVerification />}
      {!isAdminPage && <DisclaimerBanner />}
      {!isAdminPage && <Header />}
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  )
}
