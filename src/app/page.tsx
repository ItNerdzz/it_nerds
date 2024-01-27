import Header from '@/components/layout/header/header';
import Hero from '@/components/blocks/hero/hero';
import AboutUs from '@/components/blocks/about-us/about-us';
import Footer from '@/components/layout/footer/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
