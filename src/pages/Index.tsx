import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Footer } from '../components/landing/Footer';
import { Hero } from '../components/landing/Hero';
import { Features, HowItWorks, Impact } from '../components/landing/Sections';
import { Testimonials, FAQ } from '../components/landing/Community';
import { CTA } from '../components/landing/CTA';

const Index = () => (
  <div className="min-h-screen flex flex-col bg-slate-950">
    <Navbar />
    <main className="flex-1">
      <Hero />
      <Features />
      <HowItWorks />
      <Impact />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
    <Footer />
  </div>
);

export default Index;
