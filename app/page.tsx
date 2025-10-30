import { HeroSection } from "@/frontend/components/home/hero-section";
import { HowItWorks } from "@/frontend/components/home/how-it-works";
import { ImpactSection } from "@/frontend/components/home/impact-section";
import { DistributionSection } from "@/frontend/components/home/distribution-section";
import { StoriesSection } from "@/frontend/components/home/stories-section";
import { BlogSection } from "@/frontend/components/home/blog-section";
import { GetInvolvedSection } from "@/frontend/components/home/get-involved-section";
import { StickyDonateButton } from "@/frontend/components/home/sticky-donate-button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <DistributionSection />
      <ImpactSection />
      <StoriesSection />
      <BlogSection />
      <GetInvolvedSection />
      <StickyDonateButton />
    </main>
  );
}