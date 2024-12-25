import { Hero, AboutUs, HowWeWorks, Services, CallToAction } from '@/components/home';
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
