import { Hero, AboutUs, HowWeWorks, Services } from '@/components/home';
import { CallToAction } from '@/components/common';
import { CasesSwiper } from '@/components/cases';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <HowWeWorks />
      <Services />
      <CasesSwiper />
      <CallToAction />
    </>
  );
}
