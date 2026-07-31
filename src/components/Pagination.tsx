"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ITEM_PER_PAGE } from "@/lib/settings";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasPrev = page > 1;
  const hasNext = page * ITEM_PER_PAGE < count;
  const pageCount = Math.max(1, Math.ceil(count / ITEM_PER_PAGE));

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`${pathname}?${params}`);
  };

  return (
    <div className="p-4 flex items-center justify-between text-muted-foreground">
      <button
        disabled={!hasPrev}
        onClick={() => changePage(page - 1)}
        className="py-2 px-4 rounded-md bg-muted text-foreground text-xs font-semibold hover:bg-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => changePage(p)}
            className={`px-2 py-1 rounded-md transition-colors ${
              page === p ? "bg-accent text-accent-foreground" : "hover:bg-muted text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        disabled={!hasNext}
        onClick={() => changePage(page + 1)}
        className="py-2 px-4 rounded-md bg-muted text-foreground text-xs font-semibold hover:bg-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
