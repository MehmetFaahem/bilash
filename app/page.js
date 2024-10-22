import Story from "./components/home/Story";
import TriBanner from "./components/home/triBanner";
import CategoriesSlider from "./components/home/CategoriesSlider";
import HeaderComponent from "./components/global/Header";
export default function Home() {
  return (
    <div className="px-4 pb-10 pt-5">
      <HeaderComponent />
      <Story />
      <TriBanner />
      <CategoriesSlider />
    </div>
  );
}
