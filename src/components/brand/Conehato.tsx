import Image from "next/image";

import conehatoTitleImage from "@/assets/brand/conehatoTitleImage.png";
import conehatoBannerImage from "@/assets/brand/conehatoBannerImage.png";

function ConehatoTitle() {
  return (
    <Image
      src={conehatoTitleImage}
      alt="conehato title"
      className="w-32"
      style={{ aspectRatio: 3791 / 1267 }}
    />
  );
}

function ConehatoBanner() {
  return (
    <Image
      src={conehatoBannerImage}
      alt="conehato banner"
      style={{ aspectRatio: 5000 / 1918 }}
    />
  );
}

export const Conehato = {
  Title: ConehatoTitle,
  Banner: ConehatoBanner,
};
