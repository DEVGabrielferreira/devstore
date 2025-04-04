import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function searchProducts(query) {
  const response = await fetch(
    `http://localhost:3000/api/products?q=${encodeURIComponent(query)}`
  );
  const products = await response.json();
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}

export default async function Search({ searchParams }) {
  const rawQuery = searchParams?.q || "";
  const query = rawQuery.trim();

  if (!query) redirect("/");

  const products = await searchProducts(query);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              width={480}
              height={480}
              quality={100}
              alt={product.title}
              className="group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-10 right-10 flex items-center justify-between min-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-2">
              <span className="text-sm truncate whitespace-nowrap">
                {product.title}
              </span>
              <span className="flex-shrink-0 bg-violet-500 rounded-full px-4 py-1 font-semibold ml-2 whitespace-nowrap">
                R${product.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
