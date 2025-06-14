
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import DashboardSection from '@/components/sections/DashboardSection';
import RWASection from '@/components/sections/RWASection';
import PrivacySection from '@/components/sections/PrivacySection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DashboardSection />
      <RWASection />
      <PrivacySection />
    </div>
  );
};

export default Index;
