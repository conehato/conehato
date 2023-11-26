import Image from "next/image";

import conehatoBannerImage from "@/assets/brand/conehatoBannerImage.png";
import conehatoTitleImage from "@/assets/brand/conehatoTitleImage.png";

function ConehatoTitle() {
  return (
    <Image
      src={conehatoTitleImage}
      alt="匿名で様々な分野について話し合えるコミュニティサイト、Connecting Heartsコネハトです。"
      className="w-32"
      style={{ aspectRatio: 3791 / 1267 }}
    />
  );
}

function ConehatoBanner() {
  return (
    <Image
      src={conehatoBannerImage}
      alt="匿名で様々な分野について話し合えるコミュニティサイト、Connecting Heartsコネハトです。"
      style={{ aspectRatio: 5000 / 1918 }}
    />
  );
}

export const Conehato = {
  Title: ConehatoTitle,
  Banner: ConehatoBanner,
};
