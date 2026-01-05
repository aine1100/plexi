import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DesignersSection from "@/components/DesignersSection";
import WorkflowSection from "@/components/WorkflowSection";
import CreatorsSection from "@/components/CreatorsSection";
import TestimonialSection from "@/components/TestimonialSection";
import ProfessionalTemplates from "@/components/ProfessionalTemplates";
import CTASection from "@/components/CTASection";
import TopCreators from "@/components/TopCreators";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <DesignersSection />
      <WorkflowSection/>
      <CreatorsSection />
      <TestimonialSection />
      <ProfessionalTemplates />
      <CTASection />
      <TopCreators />
      <FAQSection />
      <Footer />
    </main>
  );
}
