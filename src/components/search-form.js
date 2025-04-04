"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  function handleSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("q");

    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-5 h-5 text-zinc-500" />

      <input
        name="q"
        defaultValue={query ?? ""}
        type="text"
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
    </form>
  );
}
