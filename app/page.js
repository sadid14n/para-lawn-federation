import HeroBanner from "./components/home/HeroBanner";
import NewsTicker from "./components/home/NewsTicker";
import WelcomeSection from "./components/home/WelcomeSection";
import QuickLinks from "./components/home/QuickLinks";
import StackedFeatures from "./components/home/StackedFeatures";
import StatsSection from "./components/home/StatsSection";
import HotEvents from "./components/home/HotEvents";
import GovernmentLetters from "./components/home/GovernmentLetters";
import WhyUs from "./components/home/WhyUs";
import MembersAndCTA from "./components/home/MembersAndCTA";
import LatestNews from "./components/home/LatestNews";
import Hero from "./components/home/Hero";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. THE HOOK: Instantly show what the sport is */}
      {/* <HeroBanner /> */}
      <Hero/>
      <NewsTicker />

      {/* 2. THE INTRODUCTION: Short, bold statement of authority */}
      <WelcomeSection />

      {/* 3. EASY NAVIGATION: What are people looking for? */}
      <QuickLinks />

      {/* 4. THE SPORT EXPLAINED: How Para Bowls works (Adaptations, Classifications) */}
      <StackedFeatures />

      {/* 5. LEGITIMACY & SCALE: Show it's a real, growing organization */}
      <StatsSection />
      
      {/* 6. ACTION & EXCITEMENT: Show the tournaments */}
      <HotEvents />

      {/* 7. TRUST (CRITICAL FOR INDIA): Government and Official Approvals */}
      <GovernmentLetters />

      {/* 8. CORE VALUES: Why this matters */}
      <WhyUs />

      {/* 9. GLOBAL RECOGNITION & JOIN CTA: IBD Affiliation */}
      <MembersAndCTA />

      {/* 10. UPDATES: Keep the site looking active */}
      <LatestNews />
    </div>
  );
}