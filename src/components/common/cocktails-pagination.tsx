import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MAX_PAGES_WITHOUT_ELLIPSIS = 7;
const NEAR_START_THRESHOLD = 4;
const NEAR_END_OFFSET = 3;
const PAGES_TO_SHOW_AT_START = 5;
const PAGES_TO_SHOW_AT_END = 4;

function addStartPages(pages: (number | "ellipsis")[]) {
  for (let i = 2; i <= PAGES_TO_SHOW_AT_START; i++) {
    pages.push(i);
  }
  pages.push("ellipsis");
}

function addEndPages(pages: (number | "ellipsis")[], lastPage: number) {
  pages.push("ellipsis");
  for (let i = lastPage - PAGES_TO_SHOW_AT_END; i < lastPage; i++) {
    pages.push(i);
  }
}

function addMiddlePages(pages: (number | "ellipsis")[], current: number) {
  pages.push("ellipsis");
  pages.push(current - 1);
  pages.push(current);
  pages.push(current + 1);
  pages.push("ellipsis");
}

type CocktailsPaginationProps = {
  currentPage: number;
  lastPage: number;
  firstPage: number;
};

export function CocktailsPagination({
  currentPage: current,
  lastPage,
  firstPage,
}: CocktailsPaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsis = lastPage > MAX_PAGES_WITHOUT_ELLIPSIS;

    if (!showEllipsis) {
      for (let i = firstPage; i <= lastPage; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(firstPage);

    const isNearStart = current <= NEAR_START_THRESHOLD;
    const isNearEnd = current >= lastPage - NEAR_END_OFFSET;

    if (isNearStart) {
      addStartPages(pages);
    } else if (isNearEnd) {
      addEndPages(pages, lastPage);
    } else {
      addMiddlePages(pages, current);
    }

    pages.push(lastPage);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Generate unique keys for ellipsis based on position
  let ellipsisCount = 0;

  return (
    <Pagination className="pt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={current <= firstPage}
            href={current > firstPage ? `?page=${current - 1}` : "#"}
          />
        </PaginationItem>

        {pageNumbers.map((page) => {
          if (page === "ellipsis") {
            ellipsisCount += 1;
            return (
              <PaginationItem key={`ellipsis-${ellipsisCount}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={page === current}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            aria-disabled={current >= lastPage}
            href={current < lastPage ? `?page=${current + 1}` : "#"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
