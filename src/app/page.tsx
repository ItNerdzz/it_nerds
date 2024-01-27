import Header from '@/components/layout/header/header';
import Hero from '@/components/blocks/hero/hero';
import AboutUs from '@/components/blocks/about-us/about-us';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutUs />
      </main>
    </>
  );
}
