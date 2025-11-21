import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="font-heading text-4xl font-bold text-primary mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-muted-foreground mb-6">Last updated: November 21, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Rental Application Process</h2>
            <p className="text-muted-foreground mb-4">
              Submitting an application through this website does not guarantee a rental. All applications are subject to review, background checks, and credit approval. Choice Properties reserves the right to accept or reject any application at its sole discretion.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Application fees are non-refundable.</li>
              <li>False information provided on applications will result in immediate disqualification.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              The Site and its original content, features, and functionality are owned by Choice Properties and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              In no event shall Choice Properties, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
