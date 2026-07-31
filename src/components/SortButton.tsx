"use client";

import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SortButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort");

  const toggle = () => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", current === "asc" ? "desc" : "asc");
    router.push(`${pathname}?${params}`);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={`Sort ${current === "asc" ? "descending" : "ascending"}`}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-accent hover:bg-accent/90 transition-colors"
    >
      <Image src="/sort.png" alt="sort" width={14} height={14} />
    </button>
  );
};

export default SortButton;
