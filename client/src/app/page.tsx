'use client';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FoodItemsSection from './components/FoodItemsSection';
import WeeklyPlanSection from './components/WeeklyPlanSection';
import HowItWorksSection from './components/HowItWorksSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <HeroSection />
        <FoodItemsSection />
        <WeeklyPlanSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
