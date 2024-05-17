import CallToActionSection from "@/components/call-to-action-section";
import HeroSection from "@/components/hero-section";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-top p-24">

      <HeroSection />
      <CallToActionSection />

    </main>
  );
}
