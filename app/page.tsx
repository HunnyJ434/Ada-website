
import Hero from "./components/Hero"
import Slogan from "./components/Slogan";
import BestSellers from "./components/BestSellers";
import HomeShop from "./components/HomeShop";
import AboutSection from "./components/About";
import LastSection from "./components/LastSection";
export default function Home() {
  return (
    <div className="bg-white">
        <Hero/>
        <Slogan/>
        <BestSellers/>
        <HomeShop/>
        <AboutSection/>
        <LastSection/>
    </div>
  );
}
