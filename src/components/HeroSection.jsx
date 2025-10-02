import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative h-[52vh] min-h-[420px] w-full">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0d10]/30 to-[#0b0d10] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end px-4 sm:px-6 lg:px-8 pb-6">
        <div className="w-full">
          <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Visual to Verbal
          </h1>
          <p className="mt-3 max-w-3xl text-sm sm:text-base text-gray-300">
            Build, test, and deploy collaborative AI teams with a visual-first IDE that always reveals the language beneath.
          </p>
        </div>
      </div>
    </section>
  );
}
