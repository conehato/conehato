import conehatoTitleImage from "@/assets/brand/conehatoTitleImage.jpeg";
import Image from "next/image";

export function Conehato() {
  return (
    <Image
      src={conehatoTitleImage}
      alt="conehato"
      className="w-32"
      style={{ aspectRatio: 3791 / 1267 }}
    />
  );
}
