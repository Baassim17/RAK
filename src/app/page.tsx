import { Hero } from "@/components/sites/rak/Hero";
import { Manifesto } from "@/components/sites/rak/Manifesto";
import { Chapters } from "@/components/sites/rak/Chapters";
import { Commitment } from "@/components/sites/rak/Commitment";
import { Faq } from "@/components/sites/rak/Sections";
import { WhyChooseRak } from "@/components/sites/rak/WhyChooseRak";
import { Sectors } from "@/components/sites/rak/Sectors";
import { TrustedBy } from "@/components/sites/rak/TrustedBy";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <TrustedBy />
      <Chapters />
      <Sectors />
      <WhyChooseRak />
      <Commitment />
      <Faq />
    </>
  );
}
