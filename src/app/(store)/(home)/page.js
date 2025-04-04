import { api } from "@/data/api";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProducts() {
  const response = await api("/products/featured", {
    next: {
      revalidate: 60 * 60,
    },
  });
  const products = await response.json();
  return products;
}

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const [highLightedProducts, ...otherProducts] = await getFeaturedProducts();

  return (
    <>
      <div className="grid max-h-[860px] grid-cols-9 gap-6">
        <Link
          href={`/product/${highLightedProducts.slug}`}
          className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            className="group-hover:scale-105 transition-transform duration-500"
            src={highLightedProducts.image}
            width={920}
            height={920}
            quality={100}
            alt="moletomPreto"
          />
          <div className="absolute bottom-28 right-28 flex items-center justify-between w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-2">
            <span className="text-sm truncate">
              {highLightedProducts.title}
            </span>
            <span className="flex items-center justify-center rounded-full bg-violet-500 px-4 py-1 font-semibold">
              {highLightedProducts.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>

        {otherProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              className="group-hover:scale-105 transition-transform duration-500"
              src={product.image}
              width={920}
              height={920}
              quality={100}
              alt="moletomJava"
            />
            <div className="absolute bottom-10 right-10 flex items-center justify-between w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-2">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex items-center justify-center rounded-full bg-violet-500 px-4 py-1 font-semibold">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
