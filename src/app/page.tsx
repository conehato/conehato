import { Conehato } from "@/components/brand";
import CategoryLayout from "./[categoryId]/layout";

export default function Home() {
  return (
    <CategoryLayout>
      <div className="w-full">
        <Conehato.Banner />
      </div>
    </CategoryLayout>
  );
}
