import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact Us | BestExpressPeptides",
  description:
    "Get in touch with BestExpressPeptides. Send us a message about research peptide products, orders, or questions and our team will respond within one business day.",
  alternates: { canonical: "https://bestexpresspeptides.com/contact" },
  robots: "index, follow",
}

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-12">
      <div className="container-custom max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have a question about our research peptides or an order? Send us a message and we'll get back to you within 1 business day.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              Fields marked with <span className="text-red-500">*</span> are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Prefer email? Reach us directly at{" "}
            <a
              href="mailto:support@bestexpresspeptides.com"
              className="text-primary hover:underline font-medium"
            >
              support@bestexpresspeptides.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
