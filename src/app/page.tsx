import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Idea } from "@/components/sections/idea";
import { Features } from "@/components/sections/features";
import { WidgetsShowcase } from "@/components/sections/widgets-showcase";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Screenshots } from "@/components/sections/screenshots";
import { Capabilities } from "@/components/sections/capabilities";
import { WhyDotly } from "@/components/sections/why-dotly";
import { Philosophy } from "@/components/sections/philosophy";
import { Faq } from "@/components/sections/faq";
import { faqs } from "@/config/faqs";
import { Download } from "@/components/sections/download";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Android",
  description: site.description,
  url: site.url,
  downloadUrl: site.storeUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: site.parent,
    url: site.parentUrl,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Idea />
        <Features />
        <WidgetsShowcase />
        <HowItWorks />
        <Screenshots />
        <Capabilities />
        <WhyDotly />
        <Philosophy />
        <Faq />
        <Download />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
