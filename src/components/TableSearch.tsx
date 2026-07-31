"use client";

import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const TableSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-1 ring-border px-3 bg-background focus-within:ring-2 focus-within:ring-ring"
    >
      <Image src="/search.png" alt="" width={14} height={14} className="dark:invert opacity-70" />
      <input
        type="text"
        name="search"
        placeholder="Search..."
        defaultValue={searchParams.get("search") ?? ""}
        className="w-[200px] p-2 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
      />
    </form>
  );
};

export default TableSearch;
