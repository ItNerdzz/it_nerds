import { PageLayout } from '@/components/layout';
import { Hero, AboutUs, HowWeWorks, Services, Cases, CallToAction } from '@/components/home';

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <AboutUs />
      <HowWeWorks />
      <Services />
      <Cases />
      <CallToAction />
    </PageLayout>
  );
}
