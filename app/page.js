import Story from "./components/home/Story";
import TriBanner from "./components/home/triBanner";
import CategoriesSlider from "./components/home/CategoriesSlider";
export default function Home() {
  return (
    <div>
      <Story />
      <TriBanner />
      <CategoriesSlider />
    </div>
  );
}
