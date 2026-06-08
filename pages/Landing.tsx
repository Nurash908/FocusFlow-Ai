import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Problem } from '@/components/landing/Problem';
import { BrainRotMeter } from '@/components/landing/BrainRotMeter';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { Solution } from '@/components/landing/Solution';
import { Gamification } from '@/components/landing/Gamification';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export const Landing: React.FC = () => {
  return (
    <div className="bg-[#070B14] min-h-screen text-white">
        <Navbar />
        <main className="pt-24 space-y-20">
            <Hero />
            <Problem />
            <FeaturesSection />
            <section className="py-20 px-6 flex justify-center">
                <BrainRotMeter />
            </section>
            <Solution />
            <Gamification />
            <CTASection />
            <Footer />
        </main>
    </div>
  );
};
;