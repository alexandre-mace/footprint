import { Brand } from "@/components/brand";
import { ClimateLabBadge } from "@/components/climatelab-badge";

const Header = () => (
  <header className="container mx-auto flex max-w-full items-center justify-between gap-2 px-4 py-2">
    <Brand
      name="Footprint"
      logo="https://em-content.zobj.net/source/apple/391/foot_1f9b6.png"
      className="hidden sm:inline-flex"
    />
    <ClimateLabBadge />
  </header>
);

export default Header;
