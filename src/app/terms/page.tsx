import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - BestExpressPeptides",
  description: "BestExpressPeptides Terms of Service and conditions of use for research peptides.",
}

export default function TermsPage() {
  return (
    <div className="py-8">
      <div className="container-custom max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Use</CardTitle>
            <p className="text-muted-foreground">Last updated: November 2024</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-6">
            <div>
              <p>
                BestExpressPeptides, LLC (referred to as "BestExpressPeptides," "us," "our" or "we") provides the bestexpresspeptides.com website (the "Site"), related software products, and the services described in more detail below (together referred to as the "Services") subject to your compliance with all the terms, conditions, and notices contained or referenced herein (the "Terms of Use"), as well as any other written agreement between us.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="font-semibold text-red-900 mb-2">IMPORTANT NOTICE</p>
              <p className="text-red-800 text-sm">
                All products sold by BestExpressPeptides are intended for research and laboratory use only. These products are NOT intended for human consumption or medical use. Do not use these products for any purpose other than legitimate research. By using our Services, you agree that you understand and accept the research-only nature of these products.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="font-semibold text-yellow-900 mb-2">CONTENT DISCLAIMER</p>
              <p className="text-yellow-800 text-sm">
                The content on the Site is not a replacement for seeking professional research guidance or consultation with qualified professionals. Unless we agree otherwise in writing, BestExpressPeptides is not providing professional advice of any kind. Your reliance on any content available on or through the Site is at your own risk, and you assume all risk for such reliance.
              </p>
            </div>

            <div>
              <p className="font-semibold text-base">
                BY USING OUR WEBSITE, CONTACTING US, AND/OR USING THE SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS OF USE. IF YOU DO NOT WISH TO BE BOUND BY THESE TERMS OF USE, PLEASE EXIT THE WEBSITE NOW AND REFRAIN FROM USING THE SERVICES. YOUR AGREEMENT WITH US REGARDING COMPLIANCE WITH THESE TERMS OF USE BECOMES EFFECTIVE IMMEDIATELY UPON COMMENCEMENT OF YOUR USE OF THE SERVICES.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Services and Permissions</h2>
              <p>
                The Services we provide include the sale and delivery of research-grade peptides and related products. These products are intended exclusively for research and laboratory purposes. You understand and agree that these products are NOT for human or animal consumption.
              </p>
              <p className="mt-4">
                You understand that it is possible that we may refuse to sell to you, or that we may discontinue the Services at any time. We may refuse to provide Services if we determine that products are inappropriate for your use or if you violate these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Your Financial Responsibility</h2>
              <p>
                All sales are final and non-refundable. You agree to pay for all applicable charges at the prices then in effect for the Services provided to you. You authorize us to charge your chosen payment method for the Services provided. Payment is processed securely through Stripe and other trusted payment processors.
              </p>
              <p className="mt-4">
                We do not accept insurance, and no insurance claims should be submitted for these products. You are solely responsible for all payments.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Registration Data and Privacy</h2>
              <p>
                To access the Services, you may be required to create an account with registration information ("Registration Data"). You are responsible for maintaining the accuracy and confidentiality of your Registration Data and password. Your use of the Site is subject to our Privacy Policy, which is incorporated by reference into these Terms of Use.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Eligibility and Representations</h2>
              <p>
                By registering for the Services, you represent and warrant that: (i) you are at least eighteen (18) years of age, (ii) you have the legal authority to enter into these Terms with PeptideLabs, (iii) the information you have provided is accurate and complete, and (iv) you will comply with all applicable laws in your use of the Site and Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Use of the Services</h2>
              <p>
                Your use of the Services is subject to all applicable laws and regulations. You agree:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Not to use the Services for any unlawful purpose or in violation of any laws</li>
                <li>Not to harass, threaten, or abuse any individual or group</li>
                <li>Not to upload files containing viruses or malicious software</li>
                <li>Not to resell, redistribute, or use our products for commercial purposes other than as explicitly permitted</li>
                <li>To use products solely for legitimate research purposes as intended</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Product Information</h2>
              <p>
                We strive to provide accurate product descriptions and specifications. All products include a Certificate of Analysis (COA) verifying purity. However, we do not warrant that product descriptions are error-free. You are responsible for verifying product specifications before purchase.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Shipping and Delivery</h2>
              <p>
                We ship products within the United States. Shipping times are estimates and are not guaranteed. We are not responsible for delays caused by carriers, customs, weather, or other unforeseen circumstances.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability and Disclaimer of Warranties</h2>
              <p>
                The services are provided "AS IS" without warranty of any kind. PeptideLabs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our products or services. We assume no responsibility for errors, omissions, or interruptions in the Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless PeptideLabs and its affiliates from any claims, damages, or expenses (including attorney fees) arising from your use of our products, violation of these Terms, or misuse of our Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Force Majeure</h2>
              <p>
                PeptideLabs shall be excused from any delay or failure in performance if caused by circumstances beyond our reasonable control, including acts of God, war, epidemic, pandemic, fire, floods, earthquakes, or other acts of nature.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">11. Modification of Terms</h2>
              <p>
                We reserve the right to modify these Terms of Use at any time without notice. Your continued use of the Services after modifications constitutes your acceptance of the modified Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">12. Modification of Services</h2>
              <p>
                We reserve the right to modify or discontinue the Site or Services at any time with or without notice. Modifications may include changes in pricing, product offerings, or service features.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">13. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles. Any disputes arising from these Terms or your use of the Services shall be resolved through binding arbitration on an individual basis.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">14. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between us concerning these Services and supersede all prior agreements. These Terms may not be altered or amended except by written agreement signed by both parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">15. Research Use Acknowledgment</h2>
              <p className="font-semibold">
                YOU ACKNOWLEDGE AND AGREE THAT ALL BESTEXPRESSPEPTIDES PRODUCTS ARE FOR RESEARCH USE ONLY AND NOT FOR HUMAN OR ANIMAL CONSUMPTION. YOU ASSUME FULL RESPONSIBILITY FOR THE PROPER AND LAWFUL USE OF THESE PRODUCTS IN ACCORDANCE WITH ALL APPLICABLE LAWS AND REGULATIONS.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-8 mb-4">16. Contact Information</h2>
              <p>
                For questions about these Terms of Service or to report concerns, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Email: support@bestexpresspeptides.com</li>
                <li>Phone: 1-800-PEPTIDE</li>
                <li>Website: bestexpresspeptides.com</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
