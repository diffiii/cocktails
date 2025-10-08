import { Suspense } from "react";
import { CocktailsList } from "@/components/common/cocktails-list";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center py-8">
      <Suspense fallback={<span>Loading...</span>}>
        <CocktailsList />
      </Suspense>
    </div>
  );
}
