import Image from "next/image";
import { LinkButton } from "@/components/ui/button";

const Header = () => (
  <header className="container mx-auto flex max-w-full items-center justify-between gap-2 px-4 py-2">
    <LinkButton
      href="/"
      variant="ghost"
      className="hidden px-0 font-display font-medium hover:bg-transparent sm:inline-flex"
    >
      <Image
        src="https://em-content.zobj.net/source/apple/391/foot_1f9b6.png"
        alt="Pied"
        height={20}
        width={20}
        className="inline-block h-4 w-auto shrink-0 sm:h-5"
      />{" "}
      Footprint
    </LinkButton>
    <div className="flex items-center gap-1 text-sm">
      <div className="hidden md:inline-block">un outil du</div>
      <LinkButton
        href="https://climatelab.fr"
        target="_blank"
        variant="ghost"
        className="px-0 hover:bg-transparent"
      >
        <Image
          src="https://em-content.zobj.net/thumbs/240/apple/285/alembic_2697-fe0f.png"
          alt="Alambic"
          width="27"
          height="27"
        />{" "}
        ClimateLab
      </LinkButton>
    </div>
  </header>
);

export default Header;
