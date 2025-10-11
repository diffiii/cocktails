"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getCocktails } from "@/api/queries/cocktails";
import { CocktailsPagination } from "@/components/common/cocktails-pagination";
import { CocktailDisplay } from "./cocktail-display";

export function CocktailsList() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cocktails", currentPage],
    queryFn: () => getCocktails(currentPage),
  });

  if (isLoading) {
    return <div>Loading cocktails...</div>;
  }

  if (isError) {
    return <div>Error loading cocktails: {error.message}</div>;
  }

  if (!data?.meta) {
    return <div>No pagination data available</div>;
  }

  const { currentPage: current, lastPage, firstPage } = data.meta;

  return (
    <div>
      {/* <pre className="max-w-screen text-wrap text-justify">
        {JSON.stringify(data, null, 2)}
      </pre> */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.map((cocktail) => (
          <CocktailDisplay cocktail={cocktail} key={cocktail.id} />
        ))}
      </div>
      <CocktailsPagination
        currentPage={current}
        firstPage={firstPage}
        lastPage={lastPage}
      />
    </div>
  );
}
