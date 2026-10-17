import Hero from "../components/home/Hero";
import ValuesStrip from "../components/home/ValuesStrip";
import CollectionsSection from "../components/home/CollectionsSection";
import NewArrivals from "../components/home/NewArrivals";
import SeasonalEdit from "../components/home/SeasonalEdit";
import StorySection from "../components/home/StorySection";
import Testimonials from "../components/home/Testimonials";
import CustomCTA from "../components/home/CustomCTA";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ValuesStrip />
      <CollectionsSection />
      <NewArrivals />
      <SeasonalEdit />
      <StorySection />
      <Testimonials />
      <CustomCTA />
      <Newsletter />
    </>
  );
}