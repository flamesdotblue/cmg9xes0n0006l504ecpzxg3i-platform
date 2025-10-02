import React from 'react';
import TopNav from './components/TopNav';
import HeroSection from './components/HeroSection';
import ModuleTabs from './components/ModuleTabs';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0d10] text-gray-200 font-inter overflow-x-hidden">
      <TopNav />
      <main className="relative">
        <HeroSection />
        <section className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8">
          <ModuleTabs />
        </section>
      </main>
      <Footer />
    </div>
  );
}
